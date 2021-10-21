import postData from '../services/subir-documentos';

export const postDocumentos = async (files, token) => {
    const result = await postData(files, token);
    return result;
}
