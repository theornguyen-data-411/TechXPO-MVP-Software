import { Dimensions, Platform, StatusBar } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Device type detection
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

// Screen dimensions
export const screen = {
  width: screenWidth,
  height: screenHeight,
};

// Status bar height
export const statusBarHeight = StatusBar.currentHeight || 0;

// Device size breakpoints
export const deviceSize = {
  small: screenWidth < 375, // iPhone SE, small Android
  medium: screenWidth >= 375 && screenWidth < 414, // iPhone 12, 13, 14
  large: screenWidth >= 414 && screenWidth < 768, // iPhone 12/13/14 Pro Max, large Android
  tablet: screenWidth >= 768, // iPad, Android tablets
};

// Responsive scaling
export const scale = (size: number) => {
  const baseWidth = 375; // iPhone 12/13/14 base width
  const scaleFactor = screenWidth / baseWidth;
  return Math.round(size * scaleFactor);
};

// Responsive font sizes
export const responsiveFontSize = (size: number) => {
  if (deviceSize.small) return size * 0.9;
  if (deviceSize.medium) return size;
  if (deviceSize.large) return size * 1.1;
  if (deviceSize.tablet) return size * 1.2;
  return size;
};

// Responsive spacing
export const responsiveSpacing = (size: number) => {
  if (deviceSize.small) return size * 0.8;
  if (deviceSize.medium) return size;
  if (deviceSize.large) return size * 1.1;
  if (deviceSize.tablet) return size * 1.3;
  return size;
};

// Chart dimensions based on screen size
export const getChartDimensions = () => {
  const baseWidth = screenWidth - 32 - 32; // Account for padding
  const baseHeight = 200;

  if (deviceSize.small) {
    return {
      width: baseWidth * 0.9,
      height: baseHeight * 0.8,
    };
  }
  if (deviceSize.medium) {
    return {
      width: baseWidth,
      height: baseHeight,
    };
  }
  if (deviceSize.large) {
    return {
      width: baseWidth * 1.05,
      height: baseHeight * 1.1,
    };
  }
  if (deviceSize.tablet) {
    return {
      width: baseWidth * 1.2,
      height: baseHeight * 1.3,
    };
  }

  return {
    width: baseWidth,
    height: baseHeight,
  };
};

// Safe area adjustments
export const getSafeAreaPadding = () => {
  if (deviceSize.tablet) {
    return {
      horizontal: 48,
      vertical: 24,
    };
  }
  return {
    horizontal: 24,
    vertical: 16,
  };
};

// Component specific responsive values
export const responsiveValues = {
  // Header
  headerHeight: deviceSize.tablet ? 80 : 60,
  headerPadding: deviceSize.tablet ? 24 : 16,
  
  // Cards
  cardPadding: deviceSize.tablet ? 24 : 16,
  cardBorderRadius: deviceSize.tablet ? 16 : 12,
  
  // Buttons
  buttonHeight: deviceSize.tablet ? 56 : 48,
  buttonPadding: deviceSize.tablet ? 20 : 16,
  
  // Inputs
  inputHeight: deviceSize.tablet ? 56 : 48,
  inputPadding: deviceSize.tablet ? 16 : 12,
  
  // Icons
  iconSize: {
    small: deviceSize.tablet ? 20 : 16,
    medium: deviceSize.tablet ? 24 : 20,
    large: deviceSize.tablet ? 32 : 24,
  },
  
  // Avatar
  avatarSize: {
    small: deviceSize.tablet ? 40 : 32,
    medium: deviceSize.tablet ? 56 : 48,
    large: deviceSize.tablet ? 80 : 64,
  },
};
