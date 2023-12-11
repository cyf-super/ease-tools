import './App.css';
import { Header } from './pages/header';
import { Transform } from './pages/transform';
import { Toaster } from 'sonner';

function App() {
  return (
    <>
      <Header />
      <Transform />
      <Toaster position="top-right" duration={1500} className="toaster" />
    </>
  );
}

export default App;
