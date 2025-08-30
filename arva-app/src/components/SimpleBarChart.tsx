import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme/colors';
import { typography } from '../theme/typography';

interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

interface SimpleBarChartProps {
  title?: string;
  data: DataPoint[];
  height?: number;
  width?: number;
  xAxisLabel?: string;
  yAxisLabel?: string;
}

export const SimpleBarChart: React.FC<SimpleBarChartProps> = ({
  title,
  data,
  height = 200,
  width = 300,
  xAxisLabel,
  yAxisLabel,
}) => {
  // Error handling
  if (!data || data.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.noData}>Không có dữ liệu</Text>
      </View>
    );
  }

  try {
    const maxValue = Math.max(...data.map(d => d.value));
    const barWidth = Math.max(15, (width - 80) / data.length);
    const chartHeight = height - 100;
    const barSpacing = Math.max(5, (width - 80 - barWidth * data.length) / (data.length - 1));

    return (
      <View style={styles.container}>
        {title && <Text style={styles.title}>{title}</Text>}
        
        {/* Chart Container */}
        <View style={[styles.chartContainer, { width, height }]}>
          {/* Y-axis labels */}
          <View style={styles.yAxisContainer}>
            {[1, 0.75, 0.5, 0.25, 0].map((ratio, index) => {
              const value = ratio * maxValue;
              return (
                <Text
                  key={`y-label-${index}`}
                  style={styles.yAxisLabel}
                >
                  {value.toFixed(0)}
                </Text>
              );
            })}
          </View>

          {/* Chart Area */}
          <View style={styles.chartArea}>
            {/* Grid Lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
              const y = chartHeight - ratio * chartHeight;
              return (
                <View
                  key={`grid-${index}`}
                  style={[
                    styles.gridLine,
                    { top: y }
                  ]}
                />
              );
            })}

            {/* Bars */}
            <View style={styles.barsContainer}>
              {data.map((item, index) => {
                const barHeight = maxValue > 0 ? (item.value / maxValue) * chartHeight : 0;
                const barColor = item.color || '#FF9500';

                return (
                  <View key={index} style={styles.barWrapper}>
                    {/* Value Label */}
                    <Text style={styles.valueLabel}>
                      {item.value.toLocaleString()}
                    </Text>
                    
                    {/* Bar */}
                    <View
                      style={[
                        styles.bar,
                        {
                          width: barWidth,
                          height: barHeight,
                          backgroundColor: barColor,
                        },
                      ]}
                    />
                    
                    {/* X-axis Label */}
                    <Text style={styles.xAxisLabel}>
                      {item.label}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>

        {/* Axis Labels */}
        {xAxisLabel && (
          <Text style={styles.axisTitle}>{xAxisLabel}</Text>
        )}
        {yAxisLabel && (
          <Text style={[styles.axisTitle, styles.yAxisTitle]}>{yAxisLabel}</Text>
        )}
      </View>
    );
  } catch (error) {
    console.error('SimpleBarChart error:', error);
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.noData}>Không thể hiển thị biểu đồ</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
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
  chartContainer: {
    flexDirection: 'row',
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  yAxisContainer: {
    width: 40,
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  yAxisLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    fontSize: 9,
    textAlign: 'right',
    paddingRight: 5,
  },
  chartArea: {
    flex: 1,
    position: 'relative',
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: colors.border,
    opacity: 0.3,
  },
  barsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: '100%',
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  barWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  bar: {
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 2,
  },
  valueLabel: {
    ...typography.bodySmall,
    color: colors.textPrimary,
    fontSize: 10,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 5,
  },
  xAxisLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    fontSize: 10,
    textAlign: 'center',
    marginTop: 5,
  },
  axisTitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  yAxisTitle: {
    position: 'absolute',
    left: -40,
    top: '50%',
    transform: [{ rotate: '-90deg' }],
  },
});
