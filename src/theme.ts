import { MantineThemeOverride, colorsTuple, createTheme } from '@mantine/core';

export const theme: MantineThemeOverride = createTheme({
  fontFamily: 'Inter, sans-serif',
  primaryColor: 'purple',
  primaryShade: 5,
  colors: {
    gray: [
      '#F5F5F6',
      '#F5F5F6',
      '#EAEBED',
      '#D5D6DC',
      '#ACADB9',
      '#ACADB9',
      '#7B7C88',
      '#7B7C88',
      '#7B7C88',
      '#7B7C88',
      '#7B7C88',
    ],
    purple: [
      '#F2EBF9',
      '#F2EBF9',
      '#E5D5FA',
      '#D1B4F8',
      '#BD93F7',
      '#9854F6',
      '#541F9D',
      '#541F9D',
      '#541F9D',
      '#541F9D',
      '#541F9D',
    ],
    yellow: colorsTuple('#FAB005'),
  },
});
