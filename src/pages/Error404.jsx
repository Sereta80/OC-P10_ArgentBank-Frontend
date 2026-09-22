import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Error404() {
  return (
    <div>
      <Header />
      <main className='main bg-dark'>
        <section className="sign-in-content" style={{ margin: '3rem auto' }}>
          <h1>404</h1>
          <p>Oups ! La page que vous demandez n'existe pas.</p>
          <Link to="/" style={{ color: '#42b983', marginTop: '1rem', display: 'inline-block' }}>
            Retourner à la page d'accueil
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Error404;