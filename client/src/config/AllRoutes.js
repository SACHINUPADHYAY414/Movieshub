import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Detail from '../pages/detail/Detail';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import FavoriteView from '../components/favorite/FavoriteView';

const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/register' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Home />} />
      <Route path='/:category' element={<Catalog />} />
      <Route path='/:category/:id' element={<Detail />} />
      <Route path='/:category/search/:keyword' element={<Catalog />} />
      <Route path='/favorites' element={<FavoriteView />} />
    </Routes>
  );
};

export default AllRoutes;
