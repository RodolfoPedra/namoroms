import postData from '../services/pegar-anuncio';


export const getAnuncio = async (slug) => { 
    const result = await postData(slug);
    return result;
}
