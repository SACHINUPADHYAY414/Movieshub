import './App.scss';
import 'swiper/css';
import './App.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { BrowserRouter } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import AllRoutes from './config/AllRoutes';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AllRoutes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
