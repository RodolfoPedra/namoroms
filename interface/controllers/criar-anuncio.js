import postData from '../services/criar-anuncio';


export const postAnuncio = async (data, token) => {    
    const result = await postData(data, token);
    return result;
}
