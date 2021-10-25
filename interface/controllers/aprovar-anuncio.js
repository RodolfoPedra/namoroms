import postData from '../services/aprovar-anuncio';
import autenticar from 'interface/services/autenticar';

export const postAprovarAnuncio = async (slug) => {
    const { data } = await autenticar({
        "username": process.env.LOGIN,
        "password": process.env.LOGIN_KEY
    });

    const result = await postData(slug, data.token);
    return result;
}
