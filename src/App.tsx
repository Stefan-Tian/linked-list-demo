import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import DLLPush from './components/DLLPush';
import DLLInsert from './components/DLLInsert';
import DLLUnshift from './components/DLLUnshift';
import './styles/tailwind.css';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/push" element={<DLLPush />} />
        <Route path="/insert" element={<DLLInsert />} />
        <Route path="/unshift" element={<DLLUnshift />} />
      </Routes>
    </div>
  );
}

export default App;
