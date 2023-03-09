import axios from "axios";

async function saveProperties(user_id, parameters) {
    const prefix = 'https://api.propapp.dev' 
    //'http://127.0.0.1:5000'
    // 'https://api.propapp.dev' 
    try {
        let url = new URL(`${prefix}/saved-properties`)
        const body = { 
            user_id: user_id,
            selected_ids: parameters
        }
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        };
        const res = await axios.post(url, body, config);
        console.log("res:", res);
        return res;
    }
    catch (error) {
        console.log(error);
    }
};
export default saveProperties;