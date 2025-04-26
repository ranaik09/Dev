import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import CustomerChat from './components/CustomerChat';
import DriverChat from './components/DriverChat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/customer" element={<CustomerChat />} />
        <Route path="/driver" element={<DriverChat />} />
      </Routes>
    </Router>
  );
}

export default App;
