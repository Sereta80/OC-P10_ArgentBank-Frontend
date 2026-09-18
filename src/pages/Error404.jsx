import Header from '../components/Header';
import Footer from '../components/Footer';

function Error404() {
  return (
    <div>
      <Header />
      <main className="main bg-dark">
        <section className="hero-content" style={{ margin: '50px auto', textAlign: 'center' }}>
          <h2>404 - Page non trouvée</h2>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Error404;