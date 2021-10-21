const nomeDaChave = "dadosDoFormulario"

export const salvarDadosDoFormulario = (valores) => {
  const storage = sessionStorage.getItem(nomeDaChave)
  const dados = JSON.stringify(valores)

  if (!storage) {
    sessionStorage.setItem(nomeDaChave, dados)
  } else atualizarDadosDoFormulario(dados)
}

export const atualizarDadosDoFormulario = (valores) => {
  const dadosExistentes = obterDadosDoFormulario(nomeDaChave)
  const novosValores = JSON.parse(valores)
  const valoresAtualizados = { ...dadosExistentes, ...novosValores }

  sessionStorage.setItem(nomeDaChave, JSON.stringify(valoresAtualizados))
}

export const obterDadosDoFormulario = () => {
  const dados = JSON.parse(sessionStorage.getItem(nomeDaChave))
  return dados;
}