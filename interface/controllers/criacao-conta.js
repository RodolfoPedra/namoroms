import postData from '../services/criacao-conta';
import autenticar from 'interface/services/autenticar';

export const postUsuario = async (dataUser) => {
    const { data } = await autenticar({
        "username": process.env.NEXT_PUBLIC_LOGIN,
        "password": process.env.NEXT_PUBLIC_LOGIN_KEY
    });

    const result = await postData(dataUser, data.token);
    return result;
}
