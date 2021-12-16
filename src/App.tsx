import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import DLLPush from './components/DLLPush';
import DLLInsert from './components/DLLInsert';
import DLLUnshift from './components/DLLUnshift';
import DLLPop from './components/DLLPop';
import './styles/tailwind.css';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/push" element={<DLLPush />} />
        <Route path="/insert" element={<DLLInsert />} />
        <Route path="/unshift" element={<DLLUnshift />} />
        <Route path="/pop" element={<DLLPop />} />
      </Routes>
    </div>
  );
}

export default App;
