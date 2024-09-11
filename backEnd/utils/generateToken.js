import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie = (userId,res) =>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'1h'})
    res.cookie('jwt',token,{
        httpOnly:true,
        sameSite : "strict",
    })
}
export default generateTokenAndSetCookie;

// import jwt from 'jsonwebtoken'

// const generateTokenAndSetCookie = (userId, res) => {
//     const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
//         expiresIn: '1m' // Set the token to expire in 30 minutes
//     })
//     res.cookie('jwt', token, {
//         httpOnly: true,
//         sameSite: "strict",
//     })
// }
// export default generateTokenAndSetCookie;