// import jwt from 'jsonwebtoken'
// import User from '../models/user.model.js'
// const protectRoute = async (req, res, next) => {
//     try {
//         const chatAppSeccretKey = "chatAppSeccretKey"
//         const token = req.cookies.jwt;
//         if (!token) {
//             res.status(401).json({ message: "Unauthorized : no token provided" })
//         }
//         const decoded = jwt.verify(token, chatAppSeccretKey)
//         if (!decoded) {
//             res.status(401).json({ message: "Unauthorized : invalid token provided" })
//         }
//         const user = await User.findById(decoded.userId)//.select("-password")
//         if (!user) {
//             res.status(404).json({ message: "user not found" })
//         }
//         req.user = user
//         next();

//     } catch (error) {
//         console.log("error in protectRoue", error.message)
//         res.status(500).json({ message: "internal server error in protectRoute" })
//     }
// }
// export default protectRoute

// =================
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;

		if (!token) {
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}

		const user = await User.findById(decoded.userId).select("-password");

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		req.user = user;

		next();
	} catch (error) {
		console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export default protectRoute;
