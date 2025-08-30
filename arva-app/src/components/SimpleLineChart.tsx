import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme/colors';
import { typography } from '../theme/typography';

interface DataPoint {
  label: string;
  value: number;
}

interface SimpleLineChartProps {
  title?: string;
  data: DataPoint[];
  color?: string;
  height?: number;
  width?: number;
  xAxisLabel?: string;
  yAxisLabel?: string;
}

export const SimpleLineChart: React.FC<SimpleLineChartProps> = ({
  title,
  data,
  color = '#4CAF50',
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
    const minValue = Math.min(...data.map(d => d.value));
    const chartHeight = height - 100;
    const chartWidth = width - 80;

    // Tính toán vị trí các điểm
    const points = data.map((item, index) => {
      const valueRatio = maxValue > minValue ? (item.value - minValue) / (maxValue - minValue) : 0.5;
      const y = chartHeight - valueRatio * chartHeight;
      const x = (index / (data.length - 1)) * chartWidth;
      return { x, y, value: item.value, label: item.label };
    });

    return (
      <View style={styles.container}>
        {title && <Text style={styles.title}>{title}</Text>}
        
        {/* Chart Container */}
        <View style={[styles.chartContainer, { width, height }]}>
          {/* Y-axis labels */}
          <View style={styles.yAxisContainer}>
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
              const value = minValue + ratio * (maxValue - minValue);
              return (
                <Text
                  key={`y-label-${index}`}
                  style={styles.yAxisLabel}
                >
                  {value.toFixed(1)}
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

            {/* Line Chart */}
            <View style={styles.lineContainer}>
              {/* Draw connecting lines */}
              {points.map((point, index) => {
                if (index < points.length - 1) {
                  const nextPoint = points[index + 1];
                  const deltaX = nextPoint.x - point.x;
                  const deltaY = nextPoint.y - point.y;
                  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                  const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;

                  return (
                    <View
                      key={`line-${index}`}
                      style={[
                        styles.connectingLine,
                        {
                          backgroundColor: color,
                          width: distance,
                          height: 2,
                          position: 'absolute',
                          left: point.x,
                          top: point.y,
                          transform: [
                            { rotate: `${angle}deg` },
                            { translateY: -1 }
                          ],
                        },
                      ]}
                    />
                  );
                }
                return null;
              })}

              {/* Draw data points and labels */}
              {points.map((point, index) => (
                <View key={index} style={styles.pointContainer}>
                  {/* Data Point */}
                  <View
                    style={[
                      styles.dataPoint,
                      {
                        backgroundColor: color,
                        position: 'absolute',
                        left: point.x - 4,
                        top: point.y - 4,
                      },
                    ]}
                  />
                  
                  {/* Value Label - positioned below the point */}
                  <Text style={[styles.valueLabel, { 
                    top: point.y + 15,
                    left: point.x - 15,
                    width: 30,
                    textAlign: 'center'
                  }]}>
                    {point.value}
                  </Text>
                  
                  {/* X-axis Label */}
                  <Text style={[styles.xAxisLabel, { 
                    top: chartHeight + 35,
                    left: point.x - 15,
                    width: 30,
                    textAlign: 'center'
                  }]}>
                    {point.label}
                  </Text>
                </View>
              ))}
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
    console.error('SimpleLineChart error:', error);
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
  lineContainer: {
    position: 'relative',
    height: '100%',
    paddingHorizontal: 10,
    paddingBottom: 50, // Tăng padding bottom để có chỗ cho labels
  },
  pointContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  dataPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  connectingLine: {
    transformOrigin: 'left center',
  },
  valueLabel: {
    ...typography.bodySmall,
    color: colors.textPrimary,
    fontSize: 9,
    fontWeight: '600',
    position: 'absolute',
  },
  xAxisLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    fontSize: 9,
    position: 'absolute',
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
