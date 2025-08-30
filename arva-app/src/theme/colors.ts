export const colors = {
  background: '#0F1222',
  card: '#1C2236',
  textPrimary: '#FFFFFF',
  textSecondary: '#9AA2B1',
  accent: '#35E08B',
  border: '#2C3550',
  error: '#FF6B6B',
  success: '#4ECDC4',
  warning: '#FFE66D',
  transparent: 'transparent',
} as const;

import { responsiveSpacing } from './responsive';

export const spacing = {
  xs: responsiveSpacing(4),
  sm: responsiveSpacing(8),
  md: responsiveSpacing(16),
  lg: responsiveSpacing(24),
  xl: responsiveSpacing(32),
  xxl: responsiveSpacing(48),
} as const;

export type ColorKey = keyof typeof colors;
export type SpacingKey = keyof typeof spacing; 