import { useGetMovieDetails } from '@/api';
import MovieCard from '@/components/MovieCard';
import { Anchor, Breadcrumbs, Loader, Stack } from '@mantine/core';
import { useParams } from 'react-router-dom';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { data, isLoading, isSuccess } = useGetMovieDetails(+movieId!);

  const items = [
    { title: 'Movies', href: '/movies' },
    { title: data?.original_title, href: '#' },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  if (isLoading) return <Loader />;

  return (
    <Stack gap={20}>
      <Breadcrumbs>{items}</Breadcrumbs>
      {isSuccess && <MovieCard movie={data} type="big" />}
    </Stack>
  );
};

export default MovieDetailsPage;
