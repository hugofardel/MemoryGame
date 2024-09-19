import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu.tsx';
import './style/App.css';
import './style/menu.css';
import Simon from './views/Simon.tsx';
import NumberMemory from './views/NumberMemory.tsx';
import VerbalMemory from './views/VerbalMemory.tsx';

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<Simon />} />
        <Route path="/simon" element={<Simon />} />
        <Route path="/number-memory" element={<NumberMemory />} />
        <Route path="/verbal-memory" element={<VerbalMemory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;