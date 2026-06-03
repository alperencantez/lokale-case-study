export const primaryColor = '#1b7e7e';
export const primaryColorLight = '#e6f5f5';
export const primaryColorDark = '#0d4f4f';

export const lightTheme = {
  background: '#f5f5f7',
  card: '#ffffff',
  text: '#1c1c1e',
  textSecondary: '#8e8e93',
  textTertiary: '#aeaeb2',
  border: '#e5e5ea',
  searchBackground: '#e8e8ed',
  chipBackground: '#f2f2f7',
  chipActiveBackground: primaryColor,
  chipText: '#636366',
  chipActiveText: '#ffffff',
  starColor: '#f5a623',
  primary: primaryColor,
  primaryLight: primaryColorLight,
  separator: '#c6c6c8',
  placeholderText: '#8e8e93',
  avatarBorder: primaryColor,
};

export const darkTheme = {
  background: '#000000',
  card: '#1c1c1e',
  text: '#f5f5f7',
  textSecondary: '#8e8e93',
  textTertiary: '#636366',
  border: '#38383a',
  searchBackground: '#1c1c1e',
  chipBackground: '#2c2c2e',
  chipActiveBackground: primaryColor,
  chipText: '#aeaeb2',
  chipActiveText: '#ffffff',
  starColor: '#f5a623',
  primary: '#24a3a3',
  primaryLight: '#1a3d3d',
  separator: '#38383a',
  placeholderText: '#636366',
  avatarBorder: '#24a3a3',
};

export type ThemeColors = typeof lightTheme;
