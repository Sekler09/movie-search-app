import { FC, useCallback, useState } from 'react';
import { Loader, Pagination, SimpleGrid, Stack, Title } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { useGetGenres, useGetMovies } from '@/api';
import Filters from '@/components/Filters';

import MovieCard from '@/components/MovieCard';
import { GetMoviesParams, Sorting } from '@/types';

const MoviesPage: FC = () => {
  const [page, setPage] = useState<number>(1);
  const [params, setParams] = useState<GetMoviesParams>({
    page: 1,
    releaseYear: null,
    max: '',
    min: '',
    genre: [],
    sortBy: Sorting.PopularityDesc,
  });

  const { data: genresData, isSuccess: isGenresSuccess } = useGetGenres();
  const { data, isLoading, isSuccess, isError } = useGetMovies(params);

  const [, scrollTo] = useWindowScroll();

  const handleChangePage = (value: number) => {
    scrollTo({ y: 0 });
    setPage(value);
    setParams(prev => ({
      ...prev,
      page: value,
    }));
  };

  const handleUpdateFilters = useCallback(
    (newParams: GetMoviesParams) => {
      setParams(newParams);
      setPage(1);
    },
    [setPage, setParams],
  );

  return (
    <Stack>
      <Title order={1}>Movies page</Title>
      {isGenresSuccess && (
        <>
          <Filters onUpdate={handleUpdateFilters} genres={genresData?.genres} />
          {isLoading && <Loader />}
          {isError && <Title order={2}>Error</Title>}
          {isSuccess &&
            (!isLoading && data?.results?.length ? (
              <SimpleGrid cols={2} spacing={16}>
                {data.results.map(movie => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    genres={genresData?.genres}
                  />
                ))}
              </SimpleGrid>
            ) : (
              'No results'
            ))}
          {data && data.total_pages > 1 && (
            <Pagination
              onChange={handleChangePage}
              value={page}
              total={Math.min(data.total_pages, 500)}
              boundaries={-1}
              styles={{
                root: { alignSelf: 'flex-end' },
                dots: { display: 'none' },
              }}
            />
          )}
        </>
      )}
    </Stack>
  );
};

export default MoviesPage;
