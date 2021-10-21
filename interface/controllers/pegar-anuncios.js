import postData from '../services/pegar-anuncios';


export const getAnuncios = async (filtros) => {    
    const result = await postData(filtros);
    return result;
}
