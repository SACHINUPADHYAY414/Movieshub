import React, { useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './header.scss';
import logo from '../../assets/main-logo.png';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const headerNav = [  {    display: 'Home',    path: '/',  },  {    display: 'Movies',    path: '/movie',  },  {    display: 'Shows',    path: '/tv',  },];

if (localStorage.getItem("loggeduser") !== null) {
  headerNav.splice(1, 0, {
    display: 'Favorites',
    path: '/favorites',
  });
}

const Header = () => {
  const navigate = useNavigate()

  const { pathname } = useLocation();
  const headerRef = useRef(null);
  const [token, setToken] = useState(localStorage.getItem("jwt"));
  const [loggeduseremail] = useState(localStorage.getItem("loggeduser"))
  const [loggeduser,setLogedduser] = useState()
  const active = headerNav.findIndex((e) => e.path === pathname);
  const logoutHandler = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("loggeduser")
    localStorage.removeItem("userid")
    window.location.reload()
    setIsOpen(false);
  }
  const loginHandler = () => {
    navigate('/login')
  }
  useEffect(() => {
    axios.get(`http://localhost:8000/api/users/loggeduser?email=${loggeduseremail}`).then(res=>{setLogedduser(res.data.user)})
    console.log(localStorage.getItem("loggeduser"))
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add('shrink');
      } else {
        headerRef.current.classList.remove('shrink');
      }
    };
    window.addEventListener('scroll', shrinkHeader);
    return () => {
      window.removeEventListener('scroll', shrinkHeader);
    };
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  
  return (
    <div ref={headerRef} className='header'>
      <div className='header__wrap container'>
        <div className='logo'>
          <img src={logo} alt='MyMovies' />
          <Link to='/Home'>MoviesHub</Link>
        </div>
        <ul className='header__nav'>
          {headerNav.map((e, i) => (
            <li key={i} className={`${i === active ? 'active' : ''}`}>
              <Link to={e.path}>{e.display}</Link>
            </li>
          ))}
        </ul>
        <div className='header__nav'>
          {token == null ? (
            <li className='login' onClick={loginHandler}>
              <i class="bi bi-box-arrow-in-left"></i> Login 
            </li>
          ) : (
            <div class="dropdown">
              <div class="dropdown__toggle" onClick={handleToggle}>
                <i class="bi bi-person-circle"></i><l1>Hi, {loggeduser?.name}</l1>
              </div>
              {isOpen && (
                <div class="dropdown__menu">
                  <li className="signout" onClick={logoutHandler}>
                    Logout <i class="bi bi-box-arrow-right"></i>
                  </li>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
};

export default Header;