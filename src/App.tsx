import './App.scss';
import { useEffect } from 'react';
import { Header } from './pages/header';
import { Toaster } from 'sonner';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import clsx from 'clsx';

function getUrl(src: string) {
  return new URL(src, import.meta.url).href;
}

const textHtmlUrl = new URL('/sider/textHtml.svg', import.meta.url).href;
const stringJsonUrl = new URL('/sider/stringJson.svg', import.meta.url).href;

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === '/') {
      navigate('/to-text-html');
    }
  }, [pathname, navigate]);

  return (
    <>
      <Header />
      <div id="sidebar" className="sidebar">
        <nav className="nav">
          <ul>
            <li>
              <Link
                to={`/to-text-html`}
                className={clsx(pathname === '/to-text-html' && 'active')}
              >
                <img className="nav-img" src={textHtmlUrl} alt="" />
                <span>To TextHtml</span>
              </Link>
            </li>
            <li>
              <Link
                to={getUrl(`/to-string-json`)}
                className={clsx(pathname === '/to-string-json' && 'active')}
              >
                <img className="nav-img" src={stringJsonUrl} />
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
