import { FC, MouseEvent } from 'react';
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
import Info from './Info';

const IMAGES_URL = import.meta.env.VITE_IMAGES_URL;

interface MovieCardProps {
  movie: Movie | MovieDetails;
  isBig?: boolean;
  genres?: Genre[];
}

const MovieCard: FC<MovieCardProps> = ({ movie, isBig, genres }) => {
  const {
    id: movieId,
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

  const isMovieRated = getMovieRating(movieId)?.toString() ?? false;

  const hanldeOpenModal = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    open();
  };

  const handleCardClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    navigate(`/movies/${movieId}`);
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
      onClick={handleCardClick}
    >
      <Box w={isBig ? 250 : 120} h={isBig ? 350 : 170}>
        <Image
          src={`${IMAGES_URL}${poster}`}
          fallbackSrc={noPosterImage}
          w="100%"
          h="100%"
        />
      </Box>
      <Stack
        justify="space-between"
        gap={0}
        w={`calc(100% - 16px - ${isBig ? 250 : 120}px)`}
      >
        <Group justify="space-between" gap={16} wrap="nowrap">
          <Stack gap={8}>
            <Title order={3} fw={600} fz={20} c="purple.5">
              {title}
            </Title>
            <Text c="gray.6">
              {new Date(release).getFullYear() || 'No info'}
            </Text>
            <Group gap={8}>
              <Group gap={4}>
                <StarIcon color={theme.colors.yellow[0]} />
                <Text fw={600}>{Math.ceil(rating * 10) / 10}</Text>
              </Group>
              <Text c="gray.6">({Math.ceil(votesCount / 100) / 10}K)</Text>
            </Group>
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
              color={
                isMovieRated ? theme.colors.purple[5] : theme.colors.gray[3]
              }
            />
            <Text fw={700}>{getMovieRating(movieId)}</Text>
          </Group>
        </Group>
        <Info movie={movie} isBig={isBig} genres={genres} />
      </Stack>
      <RatingModal
        opened={isModalOpen}
        title={title}
        id={movieId}
        onClose={close}
      />
    </Group>
  );
};

export default MovieCard;
