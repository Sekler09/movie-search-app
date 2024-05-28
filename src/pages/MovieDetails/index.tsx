import { useGetMovieDetails } from '@/api';
import MovieCard from '@/components/MovieCard';
import {
  Anchor,
  Avatar,
  Breadcrumbs,
  Divider,
  Group,
  Image,
  Skeleton,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import noAvatarIcon from '@assets/noprod.svg';
import classes from './index.module.css';

const IMG_URL = import.meta.env.VITE_IMAGES_URL;
const YT_EMBED_URL = 'https://www.youtube.com/embed';

const MovieDetailsPage = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const { data, isLoading, isSuccess, isError } = useGetMovieDetails(movieId!);

  const items = [
    { title: 'Movies', href: '/movies' },
    { title: data?.original_title, href: '#' },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  const trailer = data?.videos?.results?.find(({ site }) => site === 'YouTube');

  console.log(isError, isSuccess, isLoading);
  if (isError) navigate('/not-found');

  return (
    <Stack gap={20}>
      {isLoading && (
        <>
          <Skeleton visible height={20} />
          <Skeleton visible height={400} />
          <Skeleton visible height={800} />
        </>
      )}
      {isSuccess && (
        <>
          <Breadcrumbs>{items}</Breadcrumbs>
          <MovieCard movie={data} isBig />
          <Stack p={24} gap={20} style={{ borderRadius: '12px' }} bg="white">
            {trailer && (
              <>
                <Stack gap={16}>
                  <Title className={classes.title}>Trailer</Title>
                  <iframe
                    title={trailer.name}
                    src={`${YT_EMBED_URL}/${trailer.key}`}
                    className={classes.trailer}
                    allowFullScreen
                  />
                </Stack>
                <Divider color="gray.3" />
              </>
            )}
            {data.overview && (
              <>
                <Stack gap={16}>
                  <Title className={classes.title}>Description</Title>
                  <Text>{data.overview}</Text>
                </Stack>
                <Divider color="gray.3" />
              </>
            )}
            {data.production_companies?.length && (
              <>
                <Stack gap={16}>
                  <Title className={classes.title}>Production</Title>
                  <Stack gap={12}>
                    {data.production_companies.map(
                      ({ id, logo_path, name }) => (
                        <Group key={id} gap={8}>
                          <Avatar
                            src={`${IMG_URL}${logo_path}`}
                            size={40}
                            color="white"
                            styles={{
                              root: {
                                border: '1px solid #F1F1F1',
                              },
                              image: {
                                objectFit: 'contain',
                              },
                              placeholder: {
                                backgroundColor: 'white',
                              },
                            }}
                          >
                            <Image src={noAvatarIcon} />
                          </Avatar>
                          <Text fw={700}>{name}</Text>
                        </Group>
                      ),
                    )}
                  </Stack>
                </Stack>
              </>
            )}
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default MovieDetailsPage;
