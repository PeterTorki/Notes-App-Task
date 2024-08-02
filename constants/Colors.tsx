export const colors = {
  primary: '#e9a4a4',
  secondary: {
    light: '#ff94c2',
    main: '#f50057',
    dark: '#bb002f',
  },
  grey: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  // Additional colors
  success: '#4caf50',
  warning: '#ff9800',
  error: '#f44336',
  info: '#2196f3',
  background: '#ffffff',
  text: '#000000',
  white: '#fff',
  black: '#000',
};
export const hexToRgba = (hex: any, opacity = 1) => {
  hex = hex.replace(/^#/, '');
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Return the rgba color
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
