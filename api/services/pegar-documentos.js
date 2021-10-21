import axios from "axios";
// axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_WEBAPP_PORT}/wp-json/api`;

const getData = async (email) => {
    const data = await axios.get(`${process.env.NEXT_PUBLIC_WEBAPI_PORT}/wp-json/api/documentos/`, {
        params: {
            email: email
        }
    })
    return data;
}

export default getData;