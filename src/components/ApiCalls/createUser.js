import axios from "axios";

async function createUser(parameters) {
    console.log(parameters)
    const prefix = 'https://api.propapp.dev'
    //'http://127.0.0.1:5000'
    //'https://api.propapp.dev' // 'http://127.0.0.1:80'
    try {
        let url = new URL(`${prefix}/create-user`)
        const params = {
            email: parameters.email,
            name: parameters.name,
            password: parameters.createPassword,
        };
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        };
        for (const [key, value] of Object.entries(params)) {
            url.searchParams.append(key, value);
        }
        const res = await axios.get(url, config);
        console.log("RESULT of USER:", res);
        return res;
    }
    catch (error) {
        console.log(error);
    }
};
export default createUser;