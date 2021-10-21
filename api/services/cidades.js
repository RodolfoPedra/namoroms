import axios from "axios";
// axios.defaults.baseURL = 'http://localhost:10004/wp-json/api';

const postData = async () => {

    const data = await axios.get(`${process.env.NEXT_PUBLIC_WEBAPI_PORT}/wp-json/api/cidades`)
    return data;
} 

export default postData;