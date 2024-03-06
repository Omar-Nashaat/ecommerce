import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import SecondProvider from './Context/second';
import TokenContextProvider from './Context/token';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { reduxStore } from './Components/Redux/Slices/ReduxStore';
import { Toaster } from 'react-hot-toast';
import WishProvider from './Context/wishlist';


const myClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(


    <QueryClientProvider client={myClient}>
        <Toaster />
        <Provider store={reduxStore}>
            <TokenContextProvider>
                <WishProvider>            {/*counter context */}
                    <SecondProvider>            {/*counter context */}
                        <App />
                    </SecondProvider>
                </WishProvider>
            </TokenContextProvider >
        </Provider>
    </QueryClientProvider>

);

reportWebVitals();
