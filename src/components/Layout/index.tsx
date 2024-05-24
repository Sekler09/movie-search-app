import { FC } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { AppShell, Group, Stack, Text } from '@mantine/core';
import clsx from 'clsx';

import logo from '@assets/logo.svg';

import classes from './index.module.css';
import { NavTabType } from './types';

const navTabs: NavTabType[] = [
  {
    label: 'Movies',
    path: '/movies',
  },
  {
    label: 'Rated movies',
    path: '/rated',
  },
];

const Layout: FC = () => {
  return (
    <AppShell
      navbar={{
        width: 280,
        breakpoint: 'xs',
      }}
    >
      <AppShell.Navbar withBorder={false} className={classes.nav}>
        <Group gap={12}>
          <img src={logo} />
          <Text fz={24} fw={600} c="purple.5" ff="Poppins">
            ArrowFlicks
          </Text>
        </Group>
        <Stack gap={16}>
          {navTabs.map(({ label, path }) => (
            <NavLink
              to={path}
              key={label}
              className={({ isActive }) =>
                clsx(classes.navlink, isActive && classes.active)
              }
            >
              {label}
            </NavLink>
          ))}
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>
        <Stack px={90} py={40} mih="100vh" bg="gray.1">
          <Outlet />
        </Stack>
      </AppShell.Main>
    </AppShell>
  );
};

export default Layout;
