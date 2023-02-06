import { resolveComponentProps } from "@mui/base";
import axios from "axios";

async function localListings(parameters) {
    console.log(parameters)
    try {
        let url = new URL('http://18.191.147.136/get-listings')
        const params = {
            searchTerm: parameters.area,
            minPrice: parameters.min,
            maxPrice:parameters.max,
            downPaymentPercent: parameters.downpayment,
            interestRate: parameters.interest,
        };
        for (const [key, value] of Object.entries(params)) {
            url.searchParams.append(key, value);
        }
        const res = await axios.get(url);
        console.log("res:", res);
        return res;
    }
    catch (error) {
        console.log(error);
    }
};
export default localListings;