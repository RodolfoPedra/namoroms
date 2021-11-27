import postData from '../services/deletar-anuncio';


export const deleteAnuncio = async (slug) => { 
    const result = await postData(slug);
    return result;
}
