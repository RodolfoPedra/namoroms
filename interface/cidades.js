export async function obterCidades() {
  const res = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/MS/municipios`)
  const data = await res.json()

  if (!data) {
    return { notFound: true }
  }

  return data
}
