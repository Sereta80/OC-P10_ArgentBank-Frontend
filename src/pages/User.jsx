import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile } from '../redux/authSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AccountCard from '../components/AccountCard';

function User() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState('');

  // Pre-fills the field as soon as 'user' is available or modified.
  useEffect(() => {
    if (user) {
      setUserName(user.userName || user.firstName || '');
    }
  }, [user]);

  const handleSave = (e) => {
    e.preventDefault();
    if (userName.trim()) {
      dispatch(updateUserProfile(userName));
      setIsEditing(false);
    }
  };

  return (
    <div>
      <Header />
      <main className="main bg-dark">
        <div className="header">
          {isEditing ? (
            <div>
              <h1>Edit user info</h1>
              <form onSubmit={handleSave} className="edit-user-form">
                <div className="input-wrapper">
                  <label htmlFor="username">User name:</label>
                  <input
                    type="text"
                    id="username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                </div>
                <div className="input-wrapper">
                  <label htmlFor="firstname">First name:</label>
                  <input
                    type="text"
                    id="firstname"
                    value={user?.firstName || ''}
                    disabled
                  />
                </div>
                <div className="input-wrapper">
                  <label htmlFor="lastname">Last name:</label>
                  <input
                    type="text"
                    id="lastname"
                    value={user?.lastName || ''}
                    disabled
                  />
                </div>
                <div className="edit-buttons-wrapper">
                  <button type="submit" className="edit-button">
                    Save
                  </button>
                  <button
                    type="button"
                    className="edit-button"
                    onClick={() => {
                      setUserName(user?.userName || user?.firstName || '');
                      setIsEditing(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <h1>
                Welcome back
                <br />
                {user ? `${user.userName || user.firstName} !` : 'User !'}
              </h1>
              <button className="edit-button" onClick={() => setIsEditing(true)}>
                Edit Name
              </button>
            </div>
          )}
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