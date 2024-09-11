import User from "../models/user.model.js"
  const getUsersForSideBar = async (req,res)=>{
    try {
        const logedInUserId = req.user._id

        const filterdUsers =  await User.find({_id:{$ne:logedInUserId}}).select("-password")
        res.status(200).json(filterdUsers)

    } catch (error) {
        console.log("error in user controller ", error.message)
        res.status(500).json({ error: "internal server error" })
    }
}
export default getUsersForSideBar