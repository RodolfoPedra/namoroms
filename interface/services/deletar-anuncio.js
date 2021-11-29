import axios from "axios";
// axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_WEBAPP_PORT}/wp-json/api`;

const postData = async (slug, token) => {

    const config = {
        headers: {"Authorization": `Bearer ${token}`}
    };

    const data = await axios.delete(`${process.env.NEXT_PUBLIC_WEBAPI_PORT}/wp-json/api/anuncio/${slug}`, config)
    return data;
} 

export default postData;