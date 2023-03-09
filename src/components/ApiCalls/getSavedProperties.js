import axios from "axios";

async function getSavedProperties(parameters) {
    console.log("Saved parameters", parameters)
    const prefix = 'https://api.propapp.dev'
   // 'http://127.0.0.1:5000'
   // 'https://api.propapp.dev' 
    try {
        let url = new URL(`${prefix}/get-saved-properties`)
        const params = {
            user_id: parameters
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
        console.log("res:", res);
        return res;
    }
    catch (error) {
        console.log(error);
    }
};
export default getSavedProperties;