import axios from "axios";
// axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_WEBAPP_PORT}/wp-json/api`;

const postData = async (usuario_id, token) => {

    const data = await axios.get(`${process.env.NEXT_PUBLIC_WEBAPI_PORT}/wp-json/api/usuario/anuncios`, {
        params: {
            usuario_id
        },headers: {"Authorization": `Bearer ${token}`}
    })
    return data;
} 

export default postData;