import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import User from './pages/User';
import Error404 from './pages/Error404';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/profile" element={<ProtectedRoute><User /></ProtectedRoute>} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;