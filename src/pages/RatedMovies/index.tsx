import { ChangeEvent, FC, useEffect, useMemo, useRef, useState } from 'react';
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
import { useGetRatedMovies } from '@/api';
import MovieCard from '@/components/MovieCard';
import noRatedImg from '@assets/norated.svg';
import { useNavigate } from 'react-router-dom';

const RatedMoviesPage: FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  const { ratedMovies } = useManageRatedMovies();
  const { data, isLoading, isSuccess } = useGetRatedMovies(
    ratedMovies.map(({ id }) => id),
  );

  const filteredMovies = useMemo(
    () =>
      data?.filter(movie =>
        movie?.original_title.toLowerCase().includes(search.toLowerCase()),
      ),
    [data, search],
  );

  const currentPageMovies = useMemo(
    () => filteredMovies?.slice((page - 1) * 4, page * 4),
    [filteredMovies, page],
  );

  useEffect(() => {
    if (currentPageMovies.length === 0 && page !== 1) setPage(curr => curr - 1);
  }, [currentPageMovies, page]);

  const handleSearch = () => {
    setSearch(searchRef.current?.value ?? '');
    setPage(1);
  };

  const handleResetSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) setSearch('');
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
          ref={searchRef}
          onChange={handleResetSearch}
          rightSection={<Button onClick={handleSearch}>Search</Button>}
        />
      </Group>
      {isLoading && <Loader />}
      {isSuccess && (
        <SimpleGrid cols={2} spacing={16}>
          {currentPageMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </SimpleGrid>
      )}
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
    </Stack>
  );
};

export default RatedMoviesPage;
