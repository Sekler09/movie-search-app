import { FC, useEffect, useMemo, useState } from 'react';
import {
  Button,
  Center,
  Group,
  Image,
  Loader,
  Pagination,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import useManageRatedMovies from '@/hooks/useManageRatedMovies';
import { useGetGenres, useGetRatedMovies } from '@/api';
import MovieCard from '@/components/MovieCard';
import noRatedImg from '@assets/norated.svg';
import { useNavigate } from 'react-router-dom';

const RatedMoviesPage: FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [debouncedsearch, setDebouncedSearch] = useState('');

  const { ratedMovies } = useManageRatedMovies();
  const genres = useGetGenres();
  const { data, isLoading, isSuccess } = useGetRatedMovies(
    ratedMovies.map(({ id }) => id),
  );

  const filteredMovies = useMemo(
    () =>
      data?.filter(el =>
        el?.original_title
          .toLowerCase()
          .includes(debouncedsearch.toLowerCase()),
      ),
    [data, debouncedsearch],
  );

  const currentPageMovies = useMemo(
    () => filteredMovies?.slice((page - 1) * 4, page * 4),
    [filteredMovies, page],
  );

  useEffect(() => {
    if (currentPageMovies.length === 0 && page !== 1) setPage(curr => curr - 1);
  }, [currentPageMovies, page]);

  const [search, setSearch] = useState('');

  const handleSearch = () => {
    setDebouncedSearch(search);
    setPage(1);
  };

  if (!ratedMovies?.length)
    return (
      <Center h="calc(100vh - 80px)">
        <Stack align="center">
          <Image src={noRatedImg} />
          <Text fz={20} fw={600}>
            You haven&apos;t rated any films yet
          </Text>
          <Button onClick={() => navigate('/')}>Find movies</Button>
        </Stack>
      </Center>
    );

  return (
    <Stack>
      <Group>
        <Title order={1}>Rated movies</Title>
        <TextInput
          value={search}
          onChange={e => setSearch(e.currentTarget.value)}
          rightSection={<Button onClick={handleSearch}>Search</Button>}
        />
      </Group>
      {genres.isSuccess && (
        <>
          {isLoading && <Loader />}
          {isSuccess &&
            !isLoading &&
            (currentPageMovies?.length ? (
              <SimpleGrid cols={2} spacing={16}>
                {currentPageMovies.map(movie => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </SimpleGrid>
            ) : (
              'No results'
            ))}
          {!!data?.length && filteredMovies.length > 4 && (
            <Pagination
              onChange={setPage}
              value={page}
              total={Math.min(Math.ceil(filteredMovies.length / 4), 500)}
              boundaries={-1}
              styles={{
                root: { alignSelf: 'center' },
                dots: { display: 'none' },
              }}
            />
          )}
        </>
      )}
    </Stack>
  );
};

export default RatedMoviesPage;
