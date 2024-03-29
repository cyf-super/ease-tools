import { createHashRouter } from 'react-router-dom';
import App from '../App';
import ErrorPage from '../error-page';
import { TextTransform } from '../pages/text-transform';
import { JsonTransform } from '../pages/json-transform';

const router = createHashRouter(
  [
    {
      path: '/:id?',
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: 'to-string-json',
          element: <JsonTransform />
        },
        {
          path: 'to-text-html',
          element: <TextTransform />
        }
      ]
    }
  ],
  {
    // basename: '/ease-tools'
  }
);

export { router };
