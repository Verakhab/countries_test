import config from '@/assets/config';

import axios from 'axios';

export async function getCountries(params) {
    const url = `${config.production.hostname}/countries`;
    let res = await axios.get(url, {
        params
    });

    return res.data;
}

export default {
    getCountries
}