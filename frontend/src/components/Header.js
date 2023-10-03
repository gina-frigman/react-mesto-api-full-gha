import React from 'react';
import headerLogo from './../images/logo.svg';
import { Link } from 'react-router-dom';

function Header(props) {
  /*const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 999;
  const navigate = useNavigate();

  React.useEffect(() => {
    function handleResizeWindow() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  function setMenu() {
    if (width > breakpoint) {
      returnLoggedInData();
    } else {
      return (
        <button className='header__menu' onClick={returnLoggedInData}></button>
      )
    }
  }

  function returnLoggedInData() {
    return (
      <div className='header__logged-in'>
        <p className='header__email'>{props.userData.email}</p>
        <button className='header__sign-out' onClick={handleSignOut}>Выйти</button>
      </div>
    )
  }*/
  
  function handleSignOut() {
    props.onSignOut();
  }

  return(
      <header className="header">
        <img className="header__logo" src={headerLogo} alt="логотип" />
        {props.isLoggedIn &&
          <div className='header__logged-in'>
            <p className='header__email'>{props.userData.email}</p>
            <button className='header__sign-out' onClick={handleSignOut}>Выйти</button>
          </div>
        }
        {props.name === 'login' && <Link to='/sign-up' className='header__auth'>Регистрация</Link>}
        {props.name === 'register' && <Link to='/sign-in' className='header__auth'>Войти</Link>}
      </header>
  )
};

export default Header;