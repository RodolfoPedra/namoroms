import postData from '../services/usuario-anuncios';


export const getAnunciosUsuario = async (dataUser, token) => {    
    const result = await postData(dataUser, token);
    return result;
}
