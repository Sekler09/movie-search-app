import { GetMoviesParams } from '@/types';

export const buildParams = (params: GetMoviesParams) => {
  const { max, min, releaseYear, sortBy, genre, page } = params;

  const searchParams = new URLSearchParams();
  searchParams.append('sort_by', sortBy);
  searchParams.append('page', page.toString());
  if (min) searchParams.append('vote_average.gte', min.toString());
  if (max) searchParams.append('vote_average.lte', max.toString());
  if (releaseYear) searchParams.append('primary_release_year', releaseYear);
  if (genre?.length) searchParams.append('with_genres', genre.join(','));

  return searchParams.toString();
};

export const formatMovieDuration = (duration: number): string => {
  if (!duration) return '';
  const hours = Math.floor(duration / 60);
  const minutes = duration - hours * 60;
  return `${hours}h ${minutes < 10 ? 0 : ''}${minutes}m`;
};

export const formatMovieReleaseDate = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('en-US', options);
};

export const formatCurrency = (value: number) =>
  `$${value.toLocaleString('en-Us')}`;
