import postData from '../services/criacao-conta';
import autenticar from 'interface/services/autenticar';

export const postUsuario = async (dataUser) => {
    const { data } = await autenticar({
        "username": process.env.LOGIN,
        "password": process.env.LOGIN_KEY
    });

    const result = await postData(dataUser, data.token);
    return result;
}
