import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { responsiveValues } from '../theme/responsive';

interface AvatarProps {
  size?: 'small' | 'medium' | 'large' | number;
  source?: string;
  style?: any;
}

const getAvatarSize = (size: 'small' | 'medium' | 'large' | number): number => {
  if (typeof size === 'number') return size;
  return responsiveValues.avatarSize[size];
};

export const Avatar: React.FC<AvatarProps> = ({ 
  size = 'medium', 
  source, 
  style 
}) => {
  const avatarSize = getAvatarSize(size);
  
  return (
    <View style={[styles.container, { width: avatarSize, height: avatarSize }, style]}>
      {source ? (
        <Image 
          source={{ uri: source }} 
          style={[styles.image, { width: avatarSize, height: avatarSize }]}
          accessibilityLabel="User avatar"
        />
      ) : (
        <View style={[styles.placeholder, { width: avatarSize, height: avatarSize }]} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    overflow: 'hidden',
  },
  image: {
    borderRadius: 50,
  },
  placeholder: {
    backgroundColor: colors.border,
    borderRadius: 50,
  },
}); 