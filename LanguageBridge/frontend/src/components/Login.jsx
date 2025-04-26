import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    if (role === 'customer') navigate('/customer');
    else navigate('/driver');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Language Bridge</h1>
      <button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => handleLogin('customer')}>
        Customer Login
      </button>
      <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={() => handleLogin('driver')}>
        Driver Login
      </button>
    </div>
  );
}

export default Login;
