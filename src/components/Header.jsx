import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import logo from '../assets/img/argentBankLogo.png';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // On lit l'état d'authentification et les infos utilisateur dans Redux
  const { isConnected, user } = useSelector((state) => state.auth);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout()); // Vide le Store Redux
    navigate('/');      // Redirige vers la page d'accueil
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {isConnected ? (
          <div className="main-nav-item-wrapper">
            <Link className="main-nav-item" to="/user">
              <i className="fa fa-user-circle"></i>
              {user ? user.firstName : 'User'}
            </Link>
            <a className="main-nav-item" href="#" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </a>
          </div>
        ) : (
          <Link className="main-nav-item" to="/signin">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Header;