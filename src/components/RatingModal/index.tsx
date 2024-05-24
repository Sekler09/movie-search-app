import { Button, Group, Modal, Rating, Text } from '@mantine/core';
import { FC, MouseEvent, useEffect, useState } from 'react';
import useManageRatedMovies from '@/hooks/useManageRatedMovies';

interface RatingModalProps {
  id: number;
  title: string;
  opened: boolean;
  onClose: () => void;
}

const RatingModal: FC<RatingModalProps> = ({ opened, id, title, onClose }) => {
  const { saveMovie, removeMovie, getMovieRating } = useManageRatedMovies();

  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (opened) setRating(getMovieRating(id) ?? 0);
  }, [opened]);

  const handleSaveRating = () => {
    saveMovie({ id, rating });
    onClose();
  };

  const handleRemoveRating = () => {
    removeMovie(id);
    setRating(0);
    onClose();
  };

  const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Your rating"
      onClick={handleModalClick}
    >
      <Rating
        value={rating}
        onChange={setRating}
        fractions={2}
        count={10}
        size={28}
      />
      <Text fw={700}>{title}</Text>
      <Group>
        <Button onClick={handleSaveRating}>Save</Button>
        <Button variant="transparent" onClick={handleRemoveRating}>
          Remove rating
        </Button>
      </Group>
    </Modal>
  );
};

export default RatingModal;
