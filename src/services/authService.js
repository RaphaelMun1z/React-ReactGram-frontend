import { api, requestConfig } from '../utils/config'

// Register an user
const register = async (data) => {
    const config = requestConfig("POST", data)

    try {
        const res = await fetch(api + "/users/register", config)
            .then((res) => res.json())
            .catch((err) => err)

        if (res._id) {
            localStorage.setItem("user", JSON.stringify(res))
        }

        return res
    } catch (error) {
        console.log(error)
    }
}

// Logout an user
const logout = () => {
    localStorage.removeItem("user")
}

// Sign in an user
const login = async (data) => {
    const config = requestConfig("POST", data)

    try {
        const res = await fetch(api + "/users/login", config)
            .then((res) => res.json())
            .catch((err) => err)

        if (res._id && /^[0-9a-fA-F]{24}$/.test(res._id)) {
            localStorage.setItem("user", JSON.stringify(res))
        } else {
            return { errors: ["Houve um problema interno, por favor tente novamente mais tarde!"] };
        }

        return res
    } catch (error) {
        console.log(error)
    }
}

// Solicite Follow Result
const soliciteFollowResult = async (responseData, token) => {
    const config = requestConfig("PUT", responseData, token)

    try {
        const res = await fetch(api + "/users/followresponse", config)
            .then((res) => res.json())
            .catch((err) => err)

        return res
    } catch (error) {
        console.log(error)
    }
}

const authService = {
    register,
    logout,
    login,
    soliciteFollowResult,
}

export default authService