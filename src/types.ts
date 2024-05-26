export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: null | string;
  name: string;
  origin_country: string;
}

export interface Video {
  key: string;
  site: string;
  name: string;
}

export interface Movie {
  id: number;
  original_title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
}

export interface MovieDetails extends Omit<Movie, 'genre_ids'> {
  runtime: number;
  budget: number;
  revenue: number;
  genres: Genre[];
  overview: string;
  production_companies: ProductionCompany[];
  videos: { results: Video[] };
}

export enum Sorting {
  PopularityDesc = 'popularity.desc',
  PopularityAsc = 'popularity.asc',
  VoteAverageDesc = 'vote_average.desc',
  VoteAverageAsc = 'vote_average.asc',
  VoteCountDesc = 'vote_count.desc',
  VoteCountAsc = 'vote_count.asc',
  OriginalTitleAsc = 'original_title.asc',
  OriginalTitleDesc = 'original_title.desc',
  RevenueDesc = 'revenue.desc',
  RevenueAsc = 'revenue.asc',
}

export interface GetMoviesParams {
  min: string | number;
  max: string | number;
  genre: string[];
  page: number;
  releaseYear: string | null;
  sortBy: Sorting;
}
