import postData from '../services/deletar-anuncio';


export const deleteAnuncio = async (slug, token) => { 
    const result = await postData(slug, token);
    return result;
}
