import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AccountCard from '../components/AccountCard';

function User() {
  // On récupère l'utilisateur stocké dans le state Redux
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <Header />
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {user ? `${user.firstName} ${user.lastName} !` : `User !`}
          </h1>
          <button className="edit-button">Edit Name</button>
        </div>
        <h2 className="sr-only">Accounts</h2>

        <AccountCard
          title="Argent Bank Checking (x8349)"
          amount="$2,082.79"
          description="Available Balance"
        />
        <AccountCard
          title="Argent Bank Savings (x6712)"
          amount="$10,928.42"
          description="Available Balance"
        />
        <AccountCard
          title="Argent Bank Credit Card (x8349)"
          amount="$184.30"
          description="Current Balance"
        />
      </main>
      <Footer />
    </div>
  );
}

export default User;