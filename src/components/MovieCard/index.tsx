import { FC, useMemo, MouseEvent } from 'react';
import {
  Box,
  Group,
  Image,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { Genre, Movie, MovieDetails } from '@/types';
import StarIcon from '@components/StarIcon';
import { useDisclosure } from '@mantine/hooks';
import RatingModal from '@components/RatingModal';
import useManageRatedMovies from '@/hooks/useManageRatedMovies';
import { useNavigate } from 'react-router-dom';
import noPosterImage from '@assets/noposter.svg';

const IMAGES_URL = import.meta.env.VITE_IMAGES_URL;

interface MovieCardProps {
  movie: Movie | MovieDetails;
  type: 'big' | 'small';
  genres?: Genre[];
}

const MovieCard: FC<MovieCardProps> = ({ movie, type, genres }) => {
  const {
    vote_average: rating,
    vote_count: votesCount,
    release_date: release,
    poster_path: poster,
    original_title: title,
  } = movie;
  const navigate = useNavigate();
  const theme = useMantineTheme();

  const [isModalOpen, { close, open }] = useDisclosure();

  const { getMovieRating } = useManageRatedMovies();

  const isMovieRated = getMovieRating(movie.id)?.toString() ?? false;

  const isSmall = type === 'small';

  const genresList = useMemo(() => {
    if (genres) {
      const list = genres
        ?.filter(({ id }) => (movie as Movie)?.genre_ids?.includes(id))
        .map(({ name }) => name);
      return list?.join(', ');
    }
    return (movie as MovieDetails).genres.map(({ name }) => name).join(', ');
  }, [genres, movie]);

  const hanldeOpenModal = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    open();
  };

  const handleCardClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    navigate(`/movies/${movie.id}`);
  };

  return (
    <Group
      gap={16}
      p={24}
      style={{ borderRadius: '12px', cursor: 'pointer' }}
      bg="white"
      align="stretch"
      wrap="nowrap"
      justify="space-between"
      maw="100%"
      miw={0}
      onClick={handleCardClick}
    >
      <Box w={isSmall ? 120 : 250} h={isSmall ? 170 : 350}>
        <Image
          src={`${IMAGES_URL}${poster}`}
          fallbackSrc={noPosterImage}
          w={isSmall ? 120 : 250}
          h={isSmall ? 170 : 350}
        />
      </Box>
      <Stack gap={8} justify="space-between" style={{ flexGrow: 1 }}>
        <Stack>
          <Title order={3} fw={600} fz={20} c="purple.5">
            {title}
          </Title>
          <Text c="gray.6">{new Date(release).getFullYear() || 'No info'}</Text>
          <Group gap={8}>
            <Group gap={4}>
              <StarIcon color={theme.colors.yellow[0]} />
              <Text fw={600}>{Math.ceil(rating * 10) / 10}</Text>
            </Group>
            <Text c="gray.6">({votesCount}K)</Text>
          </Group>
        </Stack>
        <Stack>
          <Group gap={8} wrap="nowrap">
            <Text>Genres</Text>
            <Text>{genresList}</Text>
          </Group>
        </Stack>
      </Stack>
      <Group
        gap={4}
        onClick={hanldeOpenModal}
        style={{
          gap: 4,
          alignSelf: 'flex-start',
          flexWrap: 'nowrap',
        }}
      >
        <StarIcon
          color={isMovieRated ? theme.colors.purple[5] : theme.colors.gray[3]}
        />
        <Text fw={700}>{getMovieRating(movie.id)}</Text>
      </Group>
      <RatingModal
        opened={isModalOpen}
        title={title}
        id={movie.id}
        onClose={close}
      />
    </Group>
  );
};

export default MovieCard;
