import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { colors, spacing } from '../theme/colors';
import { typography } from '../theme/typography';
import { getSafeAreaPadding, responsiveValues } from '../theme/responsive';
import { useI18n } from '../i18n/i18n';
import { 
  reportSummary, 
  weeklyData, 
  deviceData, 
  costAnalysis,
  reportData,
  chargingSessions,
  weeklyChargingData,
  monthlyChargingData
} from '../mock/reportData';
import { SimpleBarChart } from '../components/SimpleBarChart';
import { SimpleLineChart } from '../components/SimpleLineChart';
// import { SimplePieChart } from '../components/SimplePieChart';

const { width: screenWidth } = Dimensions.get('window');

// Safe Chart Wrapper Component
const SafeChartWrapper: React.FC<{
  children: React.ReactNode;
  fallback?: React.ReactNode;
}> = ({ children, fallback }) => {
  try {
    return <>{children}</>;
  } catch (error) {
    console.error('Chart error:', error);
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {fallback || 'Không thể hiển thị biểu đồ'}
        </Text>
      </View>
    );
  }
};

export const ReportScreen: React.FC = () => {
  const { t } = useI18n();
  const [viewMode, setViewMode] = useState<'chart' | 'text'>('text'); // Mặc định hiển thị text
  const [showMenu, setShowMenu] = useState(false);
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('day');
  const [hasError, setHasError] = useState(false);
  const menuRef = useRef<View>(null);

  // Error boundary
  if (hasError) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Có lỗi xảy ra khi tải trang báo cáo</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => setHasError(false)}
          >
            <Text style={styles.retryButtonText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('vi-VN').format(num);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'chart' ? 'text' : 'chart');
    setShowMenu(false);
  };

  const getChargingData = () => {
    switch (timeRange) {
      case 'day':
        return chargingSessions.map(item => ({
          label: item.date.split('-')[2], // Lấy ngày
          value: item.sessions,
          color: '#4CAF50'
        }));
      case 'week':
        return weeklyChargingData.map(item => ({
          label: item.week,
          value: item.sessions,
          color: '#2196F3'
        }));
      case 'month':
        return monthlyChargingData.map(item => ({
          label: item.month,
          value: item.sessions,
          color: '#FF9800'
        }));
      default:
        return [];
    }
  };

  const getChargingDataText = () => {
    switch (timeRange) {
      case 'day':
        return chargingSessions;
      case 'week':
        return weeklyChargingData;
      case 'month':
        return monthlyChargingData;
      default:
        return [];
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowMenu(false);
    };

    if (showMenu) {
      const timer = setTimeout(handleClickOutside, 3000); // Auto close after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [showMenu]);

    try {
      return (
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{t('report.title')}</Text>
          <View style={styles.menuContainer} ref={menuRef}>
            <TouchableOpacity 
              style={styles.menuButton} 
              onPress={() => setShowMenu(!showMenu)}
              accessibilityLabel="Menu"
            >
              <Feather name="more-vertical" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
            {showMenu && (
              <View style={styles.menuDropdown}>
                <TouchableOpacity style={styles.menuItem} onPress={toggleViewMode}>
                  <Feather 
                    name={viewMode === 'chart' ? 'list' : 'bar-chart-2'} 
                    size={16} 
                    color={colors.textPrimary} 
                  />
                  <Text style={styles.menuItemText}>
                    {viewMode === 'chart' ? 'Xem thông số' : 'Xem biểu đồ'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Summary Cards */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('report.summary')}</Text>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Tổng năng lượng tháng</Text>
              <Text style={styles.summaryValue}>{formatNumber(reportSummary.totalEnergy)} mAh</Text>
              <Text style={styles.summaryChange}>+12.5%</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Công suất trung bình</Text>
              <Text style={styles.summaryValue}>{reportSummary.avgPower} mA</Text>
              <Text style={styles.summaryChange}>+2.1%</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Tổng phiên sạc</Text>
              <Text style={styles.summaryValue}>{reportSummary.totalSessions}</Text>
              <Text style={styles.summaryChange}>+8.3%</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Hiệu suất</Text>
              <Text style={styles.summaryValue}>{reportSummary.efficiency}%</Text>
              <Text style={styles.summaryChange}>+1.2%</Text>
            </View>
          </View>
        </View>

        {/* Total Energy Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tổng năng lượng theo tháng</Text>
          <View style={styles.chartContainer}>
            {viewMode === 'chart' ? (
              <SafeChartWrapper>
                <SimpleBarChart
                  data={reportData.monthlyReport.totalEnergy.map(item => ({
                    label: item.label,
                    value: item.value,
                    color: '#FF9500'
                  }))}
                  width={Math.min(screenWidth - 80, 350)}
                  height={220}
                  xAxisLabel="Tháng"
                  yAxisLabel="Năng lượng (mAh)"
                />
              </SafeChartWrapper>
            ) : (
              <View style={styles.textView}>
                {reportData.monthlyReport.totalEnergy.map((item, index) => (
                  <View key={index} style={styles.textRow}>
                    <Text style={styles.textLabel}>{item.label}:</Text>
                    <Text style={styles.textValue}>{formatNumber(item.value)} mAh</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Cost Analysis Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Phân tích chi phí theo tháng</Text>
          <View style={styles.chartContainer}>
            {viewMode === 'chart' ? (
              <SafeChartWrapper>
                <SimpleBarChart
                  data={costAnalysis.map(item => ({
                    label: item.month,
                    value: item.totalCost,
                    color: '#FF9500'
                  }))}
                  width={Math.min(screenWidth - 80, 350)}
                  height={220}
                  xAxisLabel="Tháng"
                  yAxisLabel="Chi phí (VND)"
                />
              </SafeChartWrapper>
            ) : (
              <View style={styles.textView}>
                {costAnalysis.map((item, index) => (
                  <View key={index} style={styles.textRow}>
                    <Text style={styles.textLabel}>{item.month}:</Text>
                    <Text style={styles.textValue}>{formatCurrency(item.totalCost)}</Text>
                    <Text style={styles.textSavings}>(Tiết kiệm: {formatCurrency(item.savings)})</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Weekly Analysis */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Phân tích theo tuần</Text>
          <View style={styles.weeklyContainer}>
            {weeklyData.map((week, index) => (
              <View key={index} style={styles.weeklyCard}>
                <Text style={styles.weeklyTitle}>{week.week}</Text>
                <View style={styles.weeklyStats}>
                  <View style={styles.weeklyStat}>
                    <Text style={styles.weeklyStatLabel}>Năng lượng</Text>
                    <Text style={styles.weeklyStatValue}>{week.energy} kWh</Text>
                  </View>
                  <View style={styles.weeklyStat}>
                    <Text style={styles.weeklyStatLabel}>Phiên sạc</Text>
                    <Text style={styles.weeklyStatValue}>{week.sessions}</Text>
                  </View>
                  <View style={styles.weeklyStat}>
                    <Text style={styles.weeklyStatLabel}>Hiệu suất</Text>
                    <Text style={styles.weeklyStatValue}>{week.efficiency}%</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Device Analysis */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Phân tích theo thiết bị</Text>
          <View style={styles.deviceContainer}>
            {deviceData.map((device, index) => (
              <View key={index} style={styles.deviceCard}>
                <Text style={styles.deviceName}>{device.device}</Text>
                <View style={styles.deviceStats}>
                  <View style={styles.deviceStat}>
                    <Text style={styles.deviceStatLabel}>Năng lượng</Text>
                    <Text style={styles.deviceStatValue}>{device.energy} mAh</Text>
                  </View>
                  <View style={styles.deviceStat}>
                    <Text style={styles.deviceStatLabel}>Phiên sạc</Text>
                    <Text style={styles.deviceStatValue}>{device.sessions}</Text>
                  </View>
                  <View style={styles.deviceStat}>
                    <Text style={styles.deviceStatLabel}>Công suất TB</Text>
                    <Text style={styles.deviceStatValue}>{device.avgPower} mA</Text>
                  </View>
                  <View style={styles.deviceStat}>
                    <Text style={styles.deviceStatLabel}>Hiệu suất</Text>
                    <Text style={styles.deviceStatValue}>{device.efficiency}%</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Monthly Summary Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Báo cáo tổng hợp theo tháng</Text>
          <View style={styles.chartContainer}>
                         {viewMode === 'chart' ? (
               <SafeChartWrapper>
                 <SimpleLineChart
                   data={reportData.monthlyReport.averagePower}
                   color={colors.accent}
                   width={Math.min(screenWidth - 80, 350)}
                   height={220}
                   xAxisLabel="Tháng"
                   yAxisLabel="Công suất (mA)"
                 />
               </SafeChartWrapper>
            ) : (
              <View style={styles.textView}>
                <Text style={styles.textSubtitle}>Công suất trung bình theo tháng:</Text>
                {reportData.monthlyReport.averagePower.map((item, index) => (
                  <View key={index} style={styles.textRow}>
                    <Text style={styles.textLabel}>{item.label}:</Text>
                    <Text style={styles.textValue}>{item.value} mA</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Charging Sessions Chart */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Phiên sạc theo thời gian</Text>
            <Text style={styles.sectionSubtitle}>Tháng 5</Text>
            <View style={styles.timeRangeSelector}>
              <TouchableOpacity 
                style={[styles.timeRangeButton, timeRange === 'day' && styles.timeRangeButtonActive]}
                onPress={() => setTimeRange('day')}
              >
                <Text style={[styles.timeRangeText, timeRange === 'day' && styles.timeRangeTextActive]}>Ngày</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.timeRangeButton, timeRange === 'week' && styles.timeRangeButtonActive]}
                onPress={() => setTimeRange('week')}
              >
                <Text style={[styles.timeRangeText, timeRange === 'week' && styles.timeRangeTextActive]}>Tuần</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.timeRangeButton, timeRange === 'month' && styles.timeRangeButtonActive]}
                onPress={() => setTimeRange('month')}
              >
                <Text style={[styles.timeRangeText, timeRange === 'month' && styles.timeRangeTextActive]}>Tháng</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.chartContainer}>
            {viewMode === 'chart' ? (
              <View style={styles.chartWrapper}>
                <SafeChartWrapper>
                  <SimpleBarChart
                    data={getChargingData()}
                    width={Math.min(screenWidth - 80, 350)}
                    height={220}
                    xAxisLabel={timeRange === 'day' ? 'Ngày' : timeRange === 'week' ? 'Tuần' : 'Tháng'}
                    yAxisLabel="Số phiên sạc"
                  />
                </SafeChartWrapper>
                <View style={styles.chartInfo}>
                  <Text style={styles.chartInfoText}>
                    {timeRange === 'day' ? 'Số phiên sạc theo ngày' : 
                     timeRange === 'week' ? 'Số phiên sạc theo tuần' : 'Số phiên sạc theo tháng'}
                  </Text>
                  <Text style={styles.chartInfoText}>
                    Tổng: {getChargingData().reduce((sum, item) => sum + item.value, 0)} phiên
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.textView}>
                <Text style={styles.textSubtitle}>
                  {timeRange === 'day' ? 'Chi tiết phiên sạc theo ngày:' : 
                   timeRange === 'week' ? 'Chi tiết phiên sạc theo tuần:' : 'Chi tiết phiên sạc theo tháng:'}
                </Text>
                {getChargingDataText().map((item, index) => (
                  <View key={index} style={styles.textRow}>
                    <Text style={styles.textLabel}>
                      {timeRange === 'day' ? `Ngày ${(item as any).date?.split('-')[2] || ''}` : 
                       timeRange === 'week' ? (item as any).week : (item as any).month}:
                    </Text>
                    <Text style={styles.textValue}>{item.sessions} phiên</Text>
                    <Text style={styles.textDetail}>
                      ({item.totalEnergy} mAh, {item.avgPower} mA)
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Daily Energy Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Năng lượng tiêu thụ hàng ngày</Text>
          <View style={styles.chartContainer}>
            {viewMode === 'chart' ? (
              <View style={styles.chartWrapper}>
                <SafeChartWrapper>
                  <SimpleBarChart
                    data={reportData.dailyEnergy.map(item => ({
                      label: item.date.split('-')[2], // Lấy ngày từ date
                      value: item.energy,
                      color: '#4CAF50'
                    }))}
                    width={Math.min(screenWidth - 80, 350)}
                    height={220}
                    xAxisLabel="Ngày"
                    yAxisLabel="Năng lượng (mAh)"
                  />
                </SafeChartWrapper>
                <View style={styles.chartInfo}>
                  <Text style={styles.chartInfoText}>Năng lượng tiêu thụ hàng ngày</Text>
                  <Text style={styles.chartInfoText}>
                    Tổng: {reportData.dailyEnergy.reduce((sum, item) => sum + item.energy, 0).toFixed(1)} mAh
                  </Text>
                  <Text style={styles.chartInfoText}>
                    Trung bình: {(reportData.dailyEnergy.reduce((sum, item) => sum + item.energy, 0) / reportData.dailyEnergy.length).toFixed(1)} mAh/ngày
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.textView}>
                <Text style={styles.textSubtitle}>Năng lượng tiêu thụ hàng ngày:</Text>
                <View style={styles.textSummary}>
                  <Text style={styles.textSummaryLabel}>Tổng năng lượng:</Text>
                  <Text style={styles.textSummaryValue}>
                    {reportData.dailyEnergy.reduce((sum, item) => sum + item.energy, 0).toFixed(1)} mAh
                  </Text>
                </View>
                <View style={styles.textSummary}>
                  <Text style={styles.textSummaryLabel}>Trung bình/ngày:</Text>
                  <Text style={styles.textSummaryValue}>
                    {(reportData.dailyEnergy.reduce((sum, item) => sum + item.energy, 0) / reportData.dailyEnergy.length).toFixed(1)} mAh
                  </Text>
                </View>
                <View style={styles.textSummary}>
                  <Text style={styles.textSummaryLabel}>Ngày cao nhất:</Text>
                  <Text style={styles.textSummaryValue}>
                    {Math.max(...reportData.dailyEnergy.map(item => item.energy)).toFixed(1)} mAh
                  </Text>
                </View>
                <View style={styles.textSummary}>
                  <Text style={styles.textSummaryLabel}>Ngày thấp nhất:</Text>
                  <Text style={styles.textSummaryValue}>
                    {Math.min(...reportData.dailyEnergy.map(item => item.energy)).toFixed(1)} mAh
                  </Text>
                </View>
                <Text style={styles.textSubtitle}>Chi tiết từng ngày:</Text>
                {reportData.dailyEnergy.map((item, index) => (
                  <View key={index} style={styles.textRow}>
                    <Text style={styles.textLabel}>Ngày {item.date.split('-')[2]}:</Text>
                    <Text style={styles.textValue}>{item.energy} mAh</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Power Time Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Phiên sạc: Công suất theo thời gian</Text>
          <View style={styles.chartContainer}>
            {viewMode === 'chart' ? (
              <View style={styles.chartWrapper}>
                <SafeChartWrapper>
                  <SimpleLineChart
                    data={reportData.powerTime.map(item => ({
                      label: `${item.time}min`,
                      value: item.power
                    }))}
                    color="#FF5722"
                    width={Math.min(screenWidth - 80, 350)}
                    height={220}
                    xAxisLabel="Thời gian (phút)"
                    yAxisLabel="Công suất (mA)"
                  />
                </SafeChartWrapper>
                <View style={styles.chartInfo}>
                  <Text style={styles.chartInfoText}>
                    Thời gian sạc: 0-60 phút
                  </Text>
                  <Text style={styles.chartInfoText}>
                    Công suất giảm dần từ {reportData.powerTime[0]?.power} mA xuống {reportData.powerTime[reportData.powerTime.length - 1]?.power} mA
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.textView}>
                <Text style={styles.textSubtitle}>Công suất theo thời gian:</Text>
                <View style={styles.textSummary}>
                  <Text style={styles.textSummaryLabel}>Tổng thời gian:</Text>
                  <Text style={styles.textSummaryValue}>60 phút</Text>
                </View>
                <View style={styles.textSummary}>
                  <Text style={styles.textSummaryLabel}>Công suất ban đầu:</Text>
                  <Text style={styles.textSummaryValue}>{reportData.powerTime[0]?.power} mA</Text>
                </View>
                <View style={styles.textSummary}>
                  <Text style={styles.textSummaryLabel}>Công suất cuối:</Text>
                  <Text style={styles.textSummaryValue}>{reportData.powerTime[reportData.powerTime.length - 1]?.power} mA</Text>
                </View>
                <View style={styles.textSummary}>
                  <Text style={styles.textSummaryLabel}>Công suất trung bình:</Text>
                  <Text style={styles.textSummaryValue}>
                    {(reportData.powerTime.reduce((sum, item) => sum + item.power, 0) / reportData.powerTime.length).toFixed(1)} mA
                  </Text>
                </View>
                <Text style={styles.textSubtitle}>Chi tiết từng phút:</Text>
                {reportData.powerTime.map((item, index) => (
                  <View key={index} style={styles.textRow}>
                    <Text style={styles.textLabel}>{item.time} phút:</Text>
                    <Text style={styles.textValue}>{item.power} mA</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
  } catch (error) {
    console.error('ReportScreen error:', error);
    setHasError(true);
    return null;
  }
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
  sectionSubtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  summaryCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.card,
    borderRadius: responsiveValues.cardBorderRadius,
    padding: responsiveValues.cardPadding,
    alignItems: 'center',
  },
  summaryLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  summaryValue: {
    ...typography.h2,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  summaryChange: {
    ...typography.bodySmall,
    color: colors.accent,
    textAlign: 'center',
  },

  weeklyContainer: {
    gap: spacing.md,
  },
  weeklyCard: {
    backgroundColor: colors.card,
    borderRadius: responsiveValues.cardBorderRadius,
    padding: responsiveValues.cardPadding,
  },
  weeklyTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  weeklyStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weeklyStat: {
    alignItems: 'center',
  },
  weeklyStatLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  weeklyStatValue: {
    ...typography.body,
    color: colors.textPrimary,
  },
  deviceContainer: {
    gap: spacing.md,
  },
  deviceCard: {
    backgroundColor: colors.card,
    borderRadius: responsiveValues.cardBorderRadius,
    padding: responsiveValues.cardPadding,
  },
  deviceName: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  deviceStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  deviceStat: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
  },
  deviceStatLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  deviceStatValue: {
    ...typography.body,
    color: colors.textPrimary,
  },
  chartContainer: {
    backgroundColor: colors.card,
    borderRadius: responsiveValues.cardBorderRadius,
    padding: responsiveValues.cardPadding,
    alignItems: 'center',
    minHeight: 280,
    justifyContent: 'center',
  },
  menuContainer: {
    position: 'relative',
  },
  menuDropdown: {
    position: 'absolute',
    top: 40,
    right: 0,
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  menuItemText: {
    ...typography.body,
    color: colors.textPrimary,
    marginLeft: spacing.sm,
  },
  textView: {
    width: '100%',
    paddingHorizontal: spacing.md,
    minHeight: 200,
  },
  textSubtitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  textLabel: {
    ...typography.body,
    color: colors.textSecondary,
    flex: 1,
  },
  textValue: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  textSavings: {
    ...typography.bodySmall,
    color: colors.accent,
    marginLeft: spacing.sm,
  },
  chartWrapper: {
    alignItems: 'center',
    width: '100%',
    minHeight: 250,
  },
  chartInfo: {
    marginTop: spacing.md,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: spacing.sm,
  },
  chartInfoText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  textSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  textSummaryLabel: {
    ...typography.body,
    color: colors.textSecondary,
    flex: 1,
  },
  textSummaryValue: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  timeRangeSelector: {
    flexDirection: 'row',
    backgroundColor: colors.border,
    borderRadius: 8,
    padding: 2,
  },
  timeRangeButton: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
  },
  timeRangeButtonActive: {
    backgroundColor: colors.accent,
  },
  timeRangeText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  timeRangeTextActive: {
    color: colors.background,
    fontWeight: '600',
  },
     textDetail: {
     ...typography.bodySmall,
     color: colors.accent,
     marginLeft: spacing.sm,
   },
   errorContainer: {
     padding: spacing.md,
     alignItems: 'center',
     justifyContent: 'center',
     minHeight: 100,
   },
       errorText: {
      ...typography.body,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    retryButton: {
      backgroundColor: colors.accent,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      borderRadius: 8,
      marginTop: spacing.md,
    },
    retryButtonText: {
      ...typography.body,
      color: colors.background,
      fontWeight: '600',
      textAlign: 'center',
    },
});
