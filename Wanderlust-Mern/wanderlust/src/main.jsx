import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux";
import App from './App.jsx'
import './index.css'
import { store } from './app/index.js'
// import { UserProvider } from './app/UserContext.jsx';
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
    <Provider store={store}>
      {/* <UserProvider> */}
         <Header />
         <App />
         <Footer />  
      {/* </UserProvider> */}
    </Provider>
   </React.StrictMode>
)
