import { Genre, GetMoviesParams, Movie, MovieDetails } from '@/types';
import { buildParams } from '@/utils';
import { useQueries, useQuery } from '@tanstack/react-query';

const API_URL = import.meta.env.VITE_API_URL;

export const useGetGenres = () => {
  const url = `${API_URL}/genre/movie/list?language=en`;

  const getGenres = () => fetch(url).then(r => r.json());
  interface GetGenresResponse {
    genres: Genre[];
  }

  return useQuery<GetGenresResponse>({
    queryKey: ['genres'],
    queryFn: getGenres,
  });
};

export const useGetMovies = (params: GetMoviesParams) => {
  const url = `${API_URL}/discover/movie?language=en-US`;

  const getMovies = () =>
    fetch(`${url}&${buildParams(params)}`).then(res => res.json());
  interface GetMoviesResponse {
    results: Movie[];
    total_pages: number;
  }
  return useQuery<GetMoviesResponse>({
    queryKey: ['movies', params],
    queryFn: getMovies,
  });
};

const getMovieDetails = async (movieId: number | string) => {
  const url = `${API_URL}/movie/{id}?append_to_response=videos`;
  const res = await fetch(url.replace('{id}', `${movieId}`));
  if (!res?.ok) throw new Error(`Error ${res.status}`);
  return (await res.json()) as MovieDetails;
};

export const useGetMovieDetails = (movieId: number | string) => {
  type GetMovieResponse = MovieDetails;
  return useQuery<GetMovieResponse>({
    queryKey: ['movie', movieId],
    queryFn: () => getMovieDetails(movieId),
  });
};

export const useGetRatedMovies = (ids: number[]) => {
  return useQueries({
    queries: ids.map(id => {
      return {
        queryKey: ['movie', id],
        queryFn: () => getMovieDetails(id),
      };
    }),
    combine: results => {
      return {
        data: results.map(result => result.data!),
        isLoading: results.some(result => result.isLoading),
        isError: results.some(result => result.isError),
        isSuccess: results.every(result => result.isSuccess),
      };
    },
  });
};
