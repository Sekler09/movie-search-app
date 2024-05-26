import { Genre, Movie, MovieDetails } from '@/types';
import {
  formatCurrency,
  formatMovieDuration,
  formatMovieReleaseDate,
} from '@/utils';
import { Group, Stack, Text } from '@mantine/core';
import { FC } from 'react';
import { Detail } from './types';

interface InfoProps {
  movie: Movie | MovieDetails;
  isBig?: boolean;
  genres?: Genre[];
}

const Info: FC<InfoProps> = ({ movie, isBig, genres }) => {
  const isDetailed = 'genres' in movie;
  const details: Detail[] = [
    isDetailed &&
      isBig && {
        label: 'Duration',
        value: formatMovieDuration(movie.runtime),
      },
    isDetailed &&
      isBig && {
        label: 'Premiere',
        value: formatMovieReleaseDate(movie.release_date),
      },
    isDetailed &&
      isBig && {
        label: 'Budget',
        value: formatCurrency(movie.budget),
      },
    isDetailed &&
      isBig && {
        label: 'Gross worldwide',
        value: formatCurrency(movie.revenue),
      },
    {
      label: 'Genres',
      value: isDetailed
        ? movie.genres.map(({ name }) => name).join(', ')
        : genres
            ?.filter(({ id }) => movie?.genre_ids?.includes(id))
            .map(({ name }) => name)
            .join(', '),
    },
  ].filter((detail): detail is Detail => Boolean(detail));

  return (
    <Group gap={16} wrap="nowrap">
      <Stack gap={12} c="gray.6">
        {details.map(({ label }) => (
          <Text key={label}>{label}</Text>
        ))}
      </Stack>
      <Stack gap={12} maw={`calc(100% - 16px - ${isBig ? 140 : 60}px)`}>
        {details.map(({ value }) => (
          <Text
            key={value}
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {value}
          </Text>
        ))}
      </Stack>
    </Group>
  );
};

export default Info;
