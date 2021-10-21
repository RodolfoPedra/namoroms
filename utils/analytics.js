export const eventoGA = ({ action, params }) => {
  window.gtag('event', action, params)
}

export const visualizarPagina = (url) => {
  window.gtag('config', process.env.ID_GA, {
    page_path: url,
  })
}