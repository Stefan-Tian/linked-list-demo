import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import DLLPush from './components/DLLPush';
import DLLInsert from './components/DLLInsert';
import DLLUnshift from './components/DLLUnshift';
import DLLPop from './components/DLLPop';
import DLLShift from './components/DLLShift';
import DLLDelete from './components/DLLDelete';
import LFUCache from './components/LFUCache';
import './styles/tailwind.css';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/push');
    }
  }, [navigate, location]);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/push" element={<DLLPush />} />
        <Route path="/insert" element={<DLLInsert />} />
        <Route path="/unshift" element={<DLLUnshift />} />
        <Route path="/pop" element={<DLLPop />} />
        <Route path="/shift" element={<DLLShift />} />
        <Route path="/delete" element={<DLLDelete />} />
        <Route path="/lfu-cache" element={<LFUCache />} />
      </Routes>
    </div>
  );
}

export default App;
