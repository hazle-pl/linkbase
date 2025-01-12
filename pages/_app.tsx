import { AppProps } from 'next/app';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/main.scss';
import { ToastContainer } from 'react-toastify';

const MyApp = ({ Component, pageProps }: AppProps) => {

  return (
    <>
        <Component {...pageProps} />
        <ToastContainer />
    </>
  );
};

export default MyApp;
