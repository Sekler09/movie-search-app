import { useLocalStorage } from '@mantine/hooks';

interface RatedMovie {
  id: number;
  rating: number;
}

const useManageRatedMovies = () => {
  const [ratedMovies, setRatedMovies] = useLocalStorage<RatedMovie[]>({
    key: 'movies',
    defaultValue: [],
  });

  const getMovieRating = (id: number) =>
    ratedMovies.find(movie => movie.id === id)?.rating ?? null;

  const saveMovie = (movie: RatedMovie) => {
    setRatedMovies(rated => [
      ...rated.filter(({ id }) => id !== movie.id),
      movie,
    ]);
  };

  const removeMovie = (id: number) => {
    setRatedMovies(rated => rated.filter(movie => movie.id !== id));
  };

  return { getMovieRating, saveMovie, removeMovie, ratedMovies };
};

export default useManageRatedMovies;
