import postData from '../services/pegar-anuncio-moderacao';


export const getAnunciosModeracao = async () => {    
    const result = await postData();
    return result;
}
