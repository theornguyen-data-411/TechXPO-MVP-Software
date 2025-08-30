import { Platform } from 'react-native';
import { responsiveFontSize } from './responsive';

export const typography = {
  h1: {
    fontSize: responsiveFontSize(32),
    fontWeight: 'bold' as const,
    lineHeight: responsiveFontSize(40),
  },
  h2: {
    fontSize: responsiveFontSize(24),
    fontWeight: 'bold' as const,
    lineHeight: responsiveFontSize(32),
  },
  h3: {
    fontSize: responsiveFontSize(20),
    fontWeight: '600' as const,
    lineHeight: responsiveFontSize(28),
  },
  body: {
    fontSize: responsiveFontSize(16),
    fontWeight: 'normal' as const,
    lineHeight: responsiveFontSize(24),
  },
  bodySmall: {
    fontSize: responsiveFontSize(14),
    fontWeight: 'normal' as const,
    lineHeight: responsiveFontSize(20),
  },
  caption: {
    fontSize: responsiveFontSize(12),
    fontWeight: 'normal' as const,
    lineHeight: responsiveFontSize(16),
  },
  button: {
    fontSize: responsiveFontSize(16),
    fontWeight: '600' as const,
    lineHeight: responsiveFontSize(24),
  },
} as const;

export type TypographyKey = keyof typeof typography; 