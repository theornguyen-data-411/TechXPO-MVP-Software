import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';
import { colors, spacing } from '../theme/colors';
import { typography } from '../theme/typography';

interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

interface SimplePieChartProps {
  title?: string;
  data: DataPoint[];
  size?: number;
}

export const SimplePieChart: React.FC<SimplePieChartProps> = ({
  title,
  data,
  size = 200,
}) => {
  if (!data || data.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.noData}>Không có dữ liệu</Text>
      </View>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = size / 2 - 20;
  const centerX = size / 2;
  const centerY = size / 2;

  let currentAngle = 0;
  const segments = data.map((item, index) => {
    const percentage = total > 0 ? item.value / total : 0;
    const angle = percentage * 2 * Math.PI;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    
    // Calculate arc coordinates
    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);
    
    // Determine if arc is large
    const largeArcFlag = angle > Math.PI ? 1 : 0;
    
    // Create path for pie segment
    const pathData = [
      `M ${centerX} ${centerY}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      'Z'
    ].join(' ');

    currentAngle = endAngle;

    return {
      pathData,
      color: item.color || colors.accent,
      label: item.label,
      value: item.value,
      percentage: percentage * 100,
      centerAngle: startAngle + angle / 2,
    };
  });

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <Svg width={size} height={size}>
        {/* Pie segments */}
        {segments.map((segment, index) => (
          <Circle
            key={index}
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke={segment.color}
            strokeWidth={radius}
            strokeDasharray={`${segment.percentage * 2 * Math.PI * radius / 100} ${2 * Math.PI * radius}`}
            strokeDashoffset={index === 0 ? 0 : -segments.slice(0, index).reduce((sum, s) => sum + s.percentage * 2 * Math.PI * radius / 100, 0)}
            transform={`rotate(-90 ${centerX} ${centerY})`}
          />
        ))}

        {/* Center circle */}
        <Circle
          cx={centerX}
          cy={centerY}
          r={radius * 0.3}
          fill={colors.background}
        />

        {/* Center text */}
        <SvgText
          x={centerX}
          y={centerY + 5}
          textAnchor="middle"
          fontSize={14}
          fontWeight="bold"
          fill={colors.textPrimary}
        >
          {total}
        </SvgText>
      </Svg>

      {/* Legend */}
      <View style={styles.legend}>
        {segments.map((segment, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: segment.color }]} />
            <Text style={styles.legendText}>
              {segment.label}: {segment.value} ({segment.percentage.toFixed(1)}%)
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  noData: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  legend: {
    marginTop: spacing.md,
    alignItems: 'flex-start',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: spacing.sm,
  },
  legendText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
});
