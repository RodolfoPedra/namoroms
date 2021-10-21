import postData from '../services/pagamento_cartao_aprovado';


export const putAprovarCartao = async (slug) => { 
    const result = await postData(slug);
    return result;
}
