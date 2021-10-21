import getData from '../services/pegar-documentos';


export const getDocumentos = async (id) => {
    const result = await getData(id);
    return result;
}
