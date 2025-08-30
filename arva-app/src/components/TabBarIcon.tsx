import React from 'react';
import { Feather } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { responsiveValues } from '../theme/responsive';

interface TabBarIconProps {
  name: keyof typeof Feather.glyphMap;
  focused: boolean;
  size?: 'small' | 'medium' | 'large';
}

const getIconSize = (size: 'small' | 'medium' | 'large'): number => {
  return responsiveValues.iconSize[size];
};

export const TabBarIcon: React.FC<TabBarIconProps> = ({
  name,
  focused,
  size = 'medium',
}) => {
  const iconSize = getIconSize(size);
  
  return (
    <Feather
      name={name}
      size={iconSize}
      color={focused ? colors.accent : colors.textSecondary}
    />
  );
}; 