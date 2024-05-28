import { Button, Center, Group, Image, Stack, Text } from '@mantine/core';
import { FC } from 'react';
import logo from '@assets/logo.svg';
import notFound from '@assets/404.svg';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: FC = () => {
  const navigate = useNavigate();

  return (
    <Center h="100vh" pos="relative" bg="gray.1">
      <Group gap={12} pos="absolute" top={24} left={24}>
        <Image src={logo} />
        <Text fz={24} fw={600} c="purple.5" ff="Poppins">
          ArrowFlicks
        </Text>
      </Group>
      <Stack align="center" gap={48}>
        <Image src={notFound} />
        <Stack align="center">
          <Text fz={20} fw={600}>
            We can&apos;t find the page you are looking for
          </Text>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </Stack>
      </Stack>
    </Center>
  );
};

export default NotFoundPage;
