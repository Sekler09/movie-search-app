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
