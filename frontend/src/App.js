import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import ProductForm from './components/ProductForm';
import Loginpage from './components/Loginpage';
import Registration from './components/Registration';
import Home from './components/Home';
import QrScannerPage from './components/QrScannerPage';
import "./css/main.css";
import Background from './components/background/Background';

function App() {

  return (
    <div className='app main-container'>
      <Router>
        <Routes>
          <Route path="/" element={<Loginpage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/productform" element={<ProductForm />} />
          <Route path="/qrscanner" element={<QrScannerPage />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/test" element={<Background />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
