import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme/colors';
import { typography } from '../theme/typography';

interface SegmentedControlProps {
  options: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  style?: any;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  selectedIndex,
  onSelect,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.option,
            selectedIndex === index && styles.selectedOption,
          ]}
          onPress={() => onSelect(index)}
          accessibilityLabel={`${option} option`}
          accessibilityRole="button"
          accessibilityState={{ selected: selectedIndex === index }}
        >
          <Text
            style={[
              styles.optionText,
              selectedIndex === index && styles.selectedOptionText,
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.border,
    borderRadius: 8,
    padding: 2,
    marginVertical: spacing.md,
  },
  option: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 6,
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: colors.accent,
  },
  optionText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  selectedOptionText: {
    color: colors.background,
    fontWeight: '600',
  },
}); 