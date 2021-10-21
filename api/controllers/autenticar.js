import postData from '../services/autenticar';


export const autenticar = async (data) => {    
    const result = await postData(data);
    return result;
}
