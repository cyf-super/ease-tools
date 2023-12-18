import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ErrorPage from '../error-page';
import { TextTransform } from '../pages/text-transform';
import { JsonTransform } from '../pages/json-transform';

const router = createBrowserRouter([
  {
    path: '/:id?',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'to-text-html',
        element: <TextTransform />
      },
      {
        path: 'to-string-json',
        element: <JsonTransform />
      }
    ]
  }
]);

export { router };
