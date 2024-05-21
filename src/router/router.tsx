import { Navigate, createBrowserRouter } from 'react-router-dom';
import Layout from '@components/Layout';
import MoviesPage from '@pages/Movies';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/movies" replace />,
      },
      {
        path: '/movies',
        element: <MoviesPage />,
      },
      {
        path: '/rated',
        element: <h1>Rated movies</h1>,
      },
    ],
  },
]);
