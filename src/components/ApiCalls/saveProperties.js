import axios from "axios";

async function saveProperties(parameters) {
    const prefix = 'http://18.191.147.136' // 'http://127.0.0.1:80'
    try {
        let url = new URL(`${prefix}/saved-properties`)
        const body = { selected_ids: parameters }
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