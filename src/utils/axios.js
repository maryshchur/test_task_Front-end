import Axios from 'axios';

const axios = Axios.create({
    baseURL: "http://localhost:8090",
    crossdomain: true,
});

export default axios;