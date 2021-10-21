import axios from "axios";
// axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_WEBAPP_PORT}:10004/wp-json/api`;

const postData = async (dataUser, token) => {

    const bodyParam = dataUser;

    const config = {
        headers: {"Authorization": `Bearer ${token}`}
    };

    const data = await axios.post(`${process.env.NEXT_PUBLIC_WEBAPI_PORT}/wp-json/api/usuario`, bodyParam, config)
    return data;
} 

export default postData;