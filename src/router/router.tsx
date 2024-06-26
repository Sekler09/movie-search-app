import { Navigate, createBrowserRouter } from 'react-router-dom';
import Layout from '@components/Layout';
import MoviesPage from '@pages/Movies';
import RatedMoviesPage from '@pages/RatedMovies';
import MovieDetailsPage from '@/pages/MovieDetails';
import NotFoundPage from '@/pages/NotFound';

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
        path: '/movies/:movieId',
        element: <MovieDetailsPage />,
      },
      {
        path: '/rated',
        element: <RatedMoviesPage />,
      },
      {
        path: '*',
        element: <Navigate to="/not-found" replace />,
      },
    ],
  },
  {
    path: '/not-found',
    element: <NotFoundPage />,
  },
]);
