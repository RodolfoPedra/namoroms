import axios from "axios";

const postData = async (files, token) => {

    const bodyParam = files

    const config = {
        headers: { "Authorization": `Bearer ${token}` }
    };

    const data = await axios.post(`${process.env.NEXT_PUBLIC_WEBAPI_PORT}/wp-json/api/documentos`, bodyParam, config)
    return data;
}

export default postData;