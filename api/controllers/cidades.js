import postData from '../services/cidades';

export const getCidades = async () => {    
    const result = await postData();
    const newResult = [...new Set(result.data)];
    return newResult;
}
