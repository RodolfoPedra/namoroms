import 'styles/globals.css'
import { ThemeProvider } from '@material-ui/styles'
import configuracaoDoTema from 'components/tema'
import Layout from "components/layout"
import { useEffect } from 'react'
import { visualizarPagina } from 'utils/analytics'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux';
import { useStore } from 'store/configureStore';

function MyApp({ Component, pageProps }) {

  const store = useStore(pageProps.initialReduxState);

  const router = useRouter()

  useEffect(() => {
    const mudarRota = (url) => {
      visualizarPagina(url)
    }

    router.events.on('routeChangeComplete', mudarRota)

    return () => {
      router.events.off('routeChangeComplete', mudarRota)
    }
  }, [router.events])

  return (
    <ThemeProvider theme={configuracaoDoTema}>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
    </ThemeProvider>
  )
}

export default MyApp
