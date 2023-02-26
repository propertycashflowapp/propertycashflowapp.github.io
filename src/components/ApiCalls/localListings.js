import { resolveComponentProps } from "@mui/base";
import axios from "axios";

async function localListings(parameters) {
    console.log(parameters)
    const prefix = 'https://api.propapp.dev' // 'http://127.0.0.1:80'
    try {
        let url = new URL(`${prefix}/get-listings`)
        const params = {
            searchTerm: parameters.area,
            minPrice: parameters.min,
            maxPrice:parameters.max,
            downPaymentPercent: parameters.downpayment,
            interestRate: parameters.interest,
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
export default localListings;