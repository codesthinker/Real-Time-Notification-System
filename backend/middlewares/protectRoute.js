const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");

const protectRoute = async (req, res, next) => {
	try {
		const token = req.cookies.jwt || req.headers.authorization;
		console.log({token})
		if (!token) return res.status(401).json({ message: "Unauthorized" });

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		const user = await User.findById(decoded.userId).select("-password");
		console.log({ usertoken: user });

		req.user = user;

		next();
	} catch (err) {
		res.status(500).json({ message: err.message });
		console.log("Error in signupUser: ", err.message);
	}
};

module.exports = protectRoute;
