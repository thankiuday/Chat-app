import React, {  useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../Context/AuthContext'

//handle input function
const useSignUp = () => {
    const [loading, setLoading] = useState(false)
    const {setAuthUser} = useAuthContext()
    const signup = async ({ fullName, userName, password, confirmPassword, gender }) => {
        // validation
        const success = handleInputError({ fullName, userName, password, confirmPassword, gender })

        if (!success) return
        setLoading(true)
        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fullName, userName, password, confirmPassword, gender })
            })
            const data = await res.json()
            if (data.error) {
                throw new Error(data.error)
            }
            console.log(data)
            // setting user log in info to the local strorage
            localStorage.setItem("chat-user", JSON.stringify(data))
            //context
            setAuthUser(data)

        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    return { loading, signup }
}
export default useSignUp
// validation function
function handleInputError({ fullName, userName, password, confirmPassword, gender }) {
    if (!fullName || !userName || !password || !confirmPassword || !gender) {
        toast.error("Please Fill All The Field!")
        return false
    }
    if (password.lenth < 6) {
        toast.error("Password Must Be At Least 6 Characters!")
        return false
    }
    return true
}