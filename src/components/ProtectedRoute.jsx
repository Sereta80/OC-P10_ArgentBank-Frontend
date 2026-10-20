import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ children }) {
  const { isConnected } = useSelector((state) => state.auth);
  return isConnected ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;