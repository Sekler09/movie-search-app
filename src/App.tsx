import { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

import { router } from '@router/router';
import { theme } from './theme';

const App: FC = () => {
  return (
    <MantineProvider theme={theme}>
      <RouterProvider router={router}></RouterProvider>;
    </MantineProvider>
  );
};

export default App;
