import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, fetchUserProfile } from '../redux/authSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // On extrait les états utiles depuis notre Store Redux
  const { isConnected, token, status, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      // 1. On lance le Thunk de connexion
      dispatch(loginUser({ email, password }));
    }
  };

  // Dès qu'on obtient un token, on va chercher le profil puis on redirige
  useEffect(() => {
    if (token) {
      // 1. On va chercher le profil
      dispatch(fetchUserProfile(token));
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (isConnected) {
      // 2. On redirige dès qu'on est connecté
      navigate('/user');
    }
  }, [isConnected, navigate]);

  return (
    <div>
      <Header />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>

            {/* Affichage du message d'erreur en cas de mauvais identifiants */}
            {status === 'failed' && (
              <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>
            )}

            <button
              type="submit"
              className="sign-in-button"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Loading...' : 'Sign In'}
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default SignIn;