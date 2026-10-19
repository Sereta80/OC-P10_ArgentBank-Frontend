import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import User from './pages/User';
import Error404 from './pages/Error404';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    // useTransitions={false}: route changes are applied synchronously, in the same
    // render as Redux updates (e.g. on logout, avoids ProtectedRoute redirecting first)
    <Router useTransitions={false}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/user" element={<ProtectedRoute><User /></ProtectedRoute>} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;