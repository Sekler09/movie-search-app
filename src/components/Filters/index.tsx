import { Button, Group, MultiSelect, NumberInput, Select } from '@mantine/core';
import { FC, useEffect, useState, memo } from 'react';
import classes from './index.module.css';
import { Genre, GetMoviesParams, Sorting } from '@/types';

interface FiltersProps {
  onUpdate: (params: GetMoviesParams) => void;
  genres?: Genre[];
}

const sortings = [
  {
    value: Sorting.PopularityDesc,
    label: 'Most Popular',
  },
  {
    value: Sorting.PopularityAsc,
    label: 'Least Popular',
  },
  {
    value: Sorting.VoteAverageDesc,
    label: 'Most Rated',
  },
  {
    value: Sorting.VoteAverageAsc,
    label: 'Least Rated',
  },
  {
    value: Sorting.VoteCountDesc,
    label: 'Most Voted',
  },
  {
    value: Sorting.VoteCountAsc,
    label: 'Least Voted',
  },
  {
    value: Sorting.OriginalTitleAsc,
    label: 'Title (A-Z)',
  },
  {
    value: Sorting.OriginalTitleDesc,
    label: 'Title (Z-A)',
  },
  {
    value: Sorting.RevenueDesc,
    label: 'Most Profitable',
  },
  {
    value: Sorting.RevenueAsc,
    label: 'Least Profitable',
  },
];

const Filters: FC<FiltersProps> = ({ onUpdate, genres }) => {
  const [genre, setGenre] = useState([] as string[]);
  const [releaseYear, setReleaseYear] = useState<string | null>(null);
  const [min, setMin] = useState<string | number>('');
  const [max, setMax] = useState<string | number>('');
  const [sortBy, setSortBy] = useState<Sorting>(Sorting.PopularityDesc);

  useEffect(() => {
    onUpdate({ page: 1, genre, releaseYear, min, max, sortBy });
  }, [genre, releaseYear, min, max, sortBy, onUpdate]);

  const handleResetFilters = () => {
    setGenre([]);
    setReleaseYear(null);
    setMin('');
    setMax('');
    setSortBy(Sorting.PopularityDesc);
  };
  return (
    <>
      <Group align="flex-end" gap={16}>
        <MultiSelect
          label="Genres"
          placeholder="Select genre"
          data={genres?.map(({ id, name }) => ({
            value: id.toString(),
            label: name,
          }))}
          w={280}
          classNames={{
            input: classes.genresInput,
            label: classes.genresLabel,
          }}
          value={genre}
          onChange={setGenre}
        />
        <Select
          label="Release year"
          placeholder="Select release year"
          data={new Array(100).fill(0).map((_, i) => (2024 - i).toString())}
          w={280}
          value={releaseYear}
          onChange={setReleaseYear}
        />
        <Group align="flex-end" gap={8}>
          <NumberInput
            label="ratings"
            placeholder="From"
            w={137}
            min={0}
            max={10}
            value={min}
            onChange={setMin}
            clampBehavior="strict"
          />
          <NumberInput
            placeholder="To"
            w={137}
            min={0}
            max={10}
            value={max}
            onChange={setMax}
            clampBehavior="strict"
          />
        </Group>
        <Button variant="subtle" onClick={handleResetFilters} p={0}>
          Reset filters
        </Button>
      </Group>
      <Select
        value={sortBy}
        onChange={v => setSortBy(v as Sorting)}
        data={sortings}
        allowDeselect={false}
        style={{
          alignSelf: 'flex-end',
        }}
      />
    </>
  );
};

export default memo(Filters);
