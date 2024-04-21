import config from '@/assets/config';

import axios from 'axios';

export async function getCountry(params) {
    const url = `${config.production.hostname}/country`;
    let res = await axios.get(url, {
        params
    });

    return res.data;
}

export async function getCountries() {
    const url = `${config.production.hostname}/countries`;
    let res = await axios.get(url);

    return res.data;
}

export default {
    getCountry,
    getCountries
}