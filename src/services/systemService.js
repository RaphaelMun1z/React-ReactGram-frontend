import { api, requestConfig } from '../utils/config'

// Report an user
const reportUser = async (data, token) => {
    const config = requestConfig("POST", data, token)

    try {
        const res = await fetch(api + "/system/report", config)
            .then((res) => res.json())
            .catch((err) => err)

        return res
    } catch (error) {
        console.log(error)
    }
}

const systemService = {
    reportUser,
}

export default systemService