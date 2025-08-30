import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { colors, spacing } from '../theme/colors';
import { typography } from '../theme/typography';
import { ProgressBar } from '../components/ProgressBar';
import { AnimatedBarChart } from '../components/AnimatedBarChart';
import { CircularProgressChart } from '../components/CircularProgressChart';
import { useBatteryStore } from '../store/useBatteryStore';
import { getSafeAreaPadding, responsiveValues } from '../theme/responsive';
import { useI18n } from '../i18n/i18n';

export const BatteryScreen: React.FC = () => {
  const { data, isLoading, error, fetchBatteryData } = useBatteryStore();
  const { t } = useI18n();

  useEffect(() => {
    fetchBatteryData();
  }, [fetchBatteryData]);

  const renderBatteryIndicators = () => {
    const indicators = [];
    const totalIndicators = 4;
    const filledIndicators = Math.ceil((data?.currentPercentage || 0) / 25);

    for (let i = 0; i < totalIndicators; i++) {
      indicators.push(
        <View
          key={i}
          style={[
            styles.batteryIndicator,
            i < filledIndicators && styles.batteryIndicatorFilled,
          ]}
        />
      );
    }

    return <View style={styles.batteryIndicatorsContainer}>{indicators}</View>;
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.accent} />
          <Text style={styles.loadingText}>{t('battery.loading')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchBatteryData}>
            <Text style={styles.retryButtonText}>{t('battery.retry')}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{t('battery.title')}</Text>
          <TouchableOpacity style={styles.menuButton} accessibilityLabel="Menu">
            <Feather name="more-vertical" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Battery Life Remaining */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('battery.lifeRemaining')}</Text>
          {renderBatteryIndicators()}
        </View>

        {/* Current Power */}
        <View style={styles.section}>
          <CircularProgressChart 
            percentage={data?.currentPercentage || 0}
            title={t('battery.currentPower')}
          />
        </View>

        {/* Device Battery Life */}
        <View style={styles.section}>
          <View style={styles.deviceRow}>
            <Text style={styles.deviceLabel}>{t('battery.smartphone')}</Text>
            <Text style={styles.deviceValue}>{data?.smartphoneHours || 0} {t('battery.hours')}</Text>
          </View>
          <ProgressBar
            progress={Math.min((data?.smartphoneHours || 0) * 10, 100)}
            style={styles.progressBar}
          />

          <View style={styles.deviceRow}>
            <Text style={styles.deviceLabel}>{t('battery.smartwatch')}</Text>
            <Text style={styles.deviceValue}>{data?.smartwatchDays || 0} {t('battery.days')}</Text>
          </View>
          <ProgressBar
            progress={Math.min((data?.smartwatchDays || 0) * 25, 100)}
            style={styles.progressBar}
          />
        </View>



        {/* Last 30 Days Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('battery.last30Days')}</Text>
          <View style={styles.chartContainer}>
            {data?.history && data.history.length > 0 ? (
              <AnimatedBarChart data={data.history} />
            ) : (
              <View style={styles.chartPlaceholder}>
                <Text style={styles.chartPlaceholderText}>{t('battery.noData')}</Text>
                <Text style={styles.chartPlaceholderSubtext}>
                  {t('battery.noDataSubtext')}
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: getSafeAreaPadding().horizontal,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  errorText: {
    ...typography.body,
    color: colors.error,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  retryButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  retryButtonText: {
    ...typography.button,
    color: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: responsiveValues.headerPadding,
    minHeight: responsiveValues.headerHeight,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
  },
  menuButton: {
    padding: spacing.sm,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  batteryIndicatorsContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  batteryIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.border,
  },
  batteryIndicatorFilled: {
    backgroundColor: colors.accent,
  },
  currentPowerTitle: {
    ...typography.h1,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  currentPowerSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  deviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  deviceLabel: {
    ...typography.body,
    color: colors.textPrimary,
  },
  deviceValue: {
    ...typography.body,
    color: colors.accent,
  },
  progressBar: {
    marginBottom: spacing.md,
  },
  chartContainer: {
    backgroundColor: colors.card,
    borderRadius: responsiveValues.cardBorderRadius,
    padding: responsiveValues.cardPadding,
    alignItems: 'center',
  },
  chartPlaceholder: {
    width: 350,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartPlaceholderText: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  chartPlaceholderSubtext: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
}); 