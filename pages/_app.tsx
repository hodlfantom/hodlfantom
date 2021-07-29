import { GlobalStyles } from 'twin.macro'
import { HodlProvider } from '../context/HodlContext'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <HodlProvider>
        <Component {...pageProps} />
      </HodlProvider>
    </>)
}

export default MyApp
