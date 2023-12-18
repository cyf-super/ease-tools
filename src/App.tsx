import './App.scss';
import { Header } from './pages/header';
import { Toaster } from 'sonner';
import { Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <div id="sidebar" className="sidebar">
        <nav className="nav">
          <ul>
            <li>
              <Link to={`/to-text-html`}>
                <img
                  className="nav-img"
                  src="/public/sider/textHtml.svg"
                  alt=""
                />
                <span>To TextHtml</span>
              </Link>
            </li>
            <li>
              <Link to={`/to-string-json`}>
                <img className="nav-img" src="/public/sider/stringJson.svg" />
                <span>To StringJson</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="sidebar-detail">
          <Outlet />
        </div>
      </div>

      <Toaster position="top-right" duration={1500} className="toaster" />
    </>
  );
}

export default App;
