import postData from '../services/aprovar-anuncio';
import autenticar from 'api/services/autenticar';

export const postAprovarAnuncio = async (slug) => {
    const { data } = await autenticar({
        "username": process.env.NEXT_PUBLIC_LOGIN,
        "password": process.env.NEXT_PUBLIC_LOGIN_KEY
    });

    const result = await postData(slug, data.data.token);
    return result;
}
