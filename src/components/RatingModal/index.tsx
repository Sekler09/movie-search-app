import { Button, Group, Modal, Rating, Stack, Text } from '@mantine/core';
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
    <Modal.Root
      opened={opened}
      centered
      onClose={onClose}
      onClick={handleModalClick}
    >
      <Modal.Overlay />
      <Modal.Content radius={8} maw={380}>
        <Modal.Header p={16} style={{ borderBottom: '1px solid #EAEBED' }}>
          <Modal.Title>Your rating</Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body p={16}>
          <Stack gap={16}>
            <Text fw={700}>{title}</Text>
            <Rating
              value={rating}
              onChange={setRating}
              fractions={2}
              count={10}
              size={28}
              styles={{
                root: {
                  width: '100%',
                  justifyContent: 'space-between',
                },
              }}
            />
            <Group>
              <Button onClick={handleSaveRating}>Save</Button>
              <Button variant="transparent" onClick={handleRemoveRating}>
                Remove rating
              </Button>
            </Group>
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default RatingModal;
