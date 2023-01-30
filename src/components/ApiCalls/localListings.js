
async function localListings(parameters) {
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
    const res = await fetch(url, {
        mode: 'no-cors',
        headers: 'Content-Type'
    })
        .then((res) => res.json())
        .then((data) => {
           console.log("inside data:", data);
        })
        .catch((err) => {
           console.log(err.message);
        })
    return res;
};
export default localListings;