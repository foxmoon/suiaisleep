import './styles/globals.css';
import 'jquery/dist/jquery.min.js';
import {WalletProvider} from '@suiet/wallet-kit';

function MyApp({ Component, pageProps }) {
  //return <Component {...pageProps} />;
  return (

    <WalletProvider>
      <Component {...pageProps} />
    </WalletProvider>

  )
}

export default MyApp;
