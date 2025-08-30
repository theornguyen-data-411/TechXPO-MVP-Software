import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Line, Text as SvgText } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { colors, spacing } from '../theme/colors';
import { typography } from '../theme/typography';
import { BatteryPoint } from '../types';
import { getChartDimensions, responsiveSpacing } from '../theme/responsive';

interface AnimatedBarChartProps {
  data: BatteryPoint[];
  width?: number;
  height?: number;
}

const chartDimensions = getChartDimensions();
const CHART_WIDTH = chartDimensions.width;
const CHART_HEIGHT = chartDimensions.height;
const BAR_WIDTH = (CHART_WIDTH - 60) / 30;
const BAR_SPACING = responsiveSpacing(2);

export const AnimatedBarChart: React.FC<AnimatedBarChartProps> = ({
  data,
  width = CHART_WIDTH,
  height = CHART_HEIGHT,
}) => {
  const maxValue = Math.max(...data.map(point => point.percentage), 100);
  const minValue = 0;
  const valueRange = maxValue - minValue;

  // Animation values for each bar
  const barAnimations = data.map(() => ({
    height: useSharedValue(0),
    opacity: useSharedValue(0),
  }));

  useEffect(() => {
    // Animate bars with staggered delay
    data.forEach((point, index) => {
      const targetHeight = ((point.percentage - minValue) / valueRange) * (height - 60);
      
      barAnimations[index].height.value = withDelay(
        index * 50, // 50ms delay between each bar
        withTiming(targetHeight, {
          duration: 800,
          easing: Easing.out(Easing.cubic),
        })
      );

      barAnimations[index].opacity.value = withDelay(
        index * 50,
        withTiming(1, {
          duration: 400,
          easing: Easing.out(Easing.cubic),
        })
      );
    });
  }, [data]);

  const renderAnimatedBars = () => {
    return data.map((point, index) => {
      const animatedStyle = useAnimatedStyle(() => {
        return {
          height: barAnimations[index].height.value,
          opacity: barAnimations[index].opacity.value,
        };
      });

      return (
        <Animated.View
          key={index}
          style={[
            styles.bar,
            {
              width: BAR_WIDTH,
              marginRight: BAR_SPACING,
            },
            animatedStyle,
          ]}
        />
      );
    });
  };

  const renderXAxisLabels = () => {
    // Show every 5th day label to avoid overcrowding
    const labels = data.filter((_, index) => index % 5 === 0 || index === data.length - 1);
    return labels.map((point) => {
      const index = data.findIndex(p => p.day === point.day);
      return (
        <Text
          key={point.day}
          style={[
            styles.xAxisLabel,
            {
              left: index * (BAR_WIDTH + BAR_SPACING) + BAR_WIDTH / 2 - 10,
            },
          ]}
        >
          {point.day}
        </Text>
      );
    });
  };

  const renderYAxisLabels = () => {
    const labels = [0, 25, 50, 75, 100];
    return labels.map((value) => {
      const y = height - 60 - ((value - minValue) / valueRange) * (height - 60);
      return (
        <Text
          key={value}
          style={[
            styles.yAxisLabel,
            {
              top: y - 8,
            },
          ]}
        >
          {value}
        </Text>
      );
    });
  };

  const renderGridLines = () => {
    const lines = [25, 50, 75];
    return lines.map((value) => {
      const y = height - 60 - ((value - minValue) / valueRange) * (height - 60);
      return (
        <View
          key={value}
          style={[
            styles.gridLine,
            {
              top: y,
            },
          ]}
        />
      );
    });
  };

  return (
    <View style={styles.container}>
      {/* Grid lines */}
      {renderGridLines()}
      
      {/* Y-axis labels */}
      {renderYAxisLabels()}
      
      {/* Bars container */}
      <View style={[styles.barsContainer, { height: height - 60 }]}>
        {renderAnimatedBars()}
      </View>
      
      {/* X-axis labels */}
      <View style={styles.xAxisContainer}>
        {renderXAxisLabels()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CHART_WIDTH,
    height: CHART_HEIGHT,
    position: 'relative',
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    paddingLeft: 30,
    paddingRight: 10,
  },
  bar: {
    backgroundColor: colors.accent,
    borderRadius: 2,
  },
  gridLine: {
    position: 'absolute',
    left: 30,
    right: 10,
    height: 1,
    backgroundColor: colors.border,
    opacity: 0.3,
  },
  xAxisContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 20,
  },
  xAxisLabel: {
    position: 'absolute',
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    width: 20,
  },
  yAxisContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 60,
    width: 30,
  },
  yAxisLabel: {
    position: 'absolute',
    fontSize: 12,
    color: colors.textSecondary,
    left: 10,
    width: 20,
    textAlign: 'left',
  },
});
