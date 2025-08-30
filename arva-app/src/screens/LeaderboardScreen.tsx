import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { colors, spacing } from '../theme/colors';
import { typography } from '../theme/typography';
import { Avatar } from '../components/Avatar';
import { SegmentedControl } from '../components/SegmentedControl';
import leaderboardData from '../mock/leaderboard.json';

const timeOptions = ['Today', 'This month', 'This year'];

export const LeaderboardScreen: React.FC = () => {
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(0);
  const { leaderboard } = leaderboardData;

  const renderPodium = () => {
    const top3 = leaderboard.slice(0, 3);
    
    return (
      <View style={styles.podiumContainer}>
        {/* Second Place */}
        <View style={[styles.podiumItem, styles.secondPlace]}>
          <View style={styles.crownContainer}>
            <Feather name="award" size={20} color={colors.textSecondary} />
          </View>
          <Avatar source={top3[1]?.avatar} size={60} />
          <Text style={styles.podiumName}>{top3[1]?.name}</Text>
          <Text style={styles.podiumScore}>{top3[1]?.score}</Text>
        </View>

        {/* First Place */}
        <View style={[styles.podiumItem, styles.firstPlace]}>
          <View style={styles.crownContainer}>
            <Feather name="award" size={24} color="#FFD700" />
          </View>
          <Avatar source={top3[0]?.avatar} size={80} />
          <Text style={styles.podiumName}>{top3[0]?.name}</Text>
          <Text style={styles.podiumScore}>{top3[0]?.score}</Text>
        </View>

        {/* Third Place */}
        <View style={[styles.podiumItem, styles.thirdPlace]}>
          <View style={styles.crownContainer}>
            <Feather name="award" size={16} color="#CD7F32" />
          </View>
          <Avatar source={top3[2]?.avatar} size={50} />
          <Text style={styles.podiumName}>{top3[2]?.name}</Text>
          <Text style={styles.podiumScore}>{top3[2]?.score}</Text>
        </View>
      </View>
    );
  };

  const renderTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <Feather name="trending-up" size={16} color={colors.accent} />;
      case 'down':
        return <Feather name="trending-down" size={16} color={colors.error} />;
      default:
        return <Feather name="minus" size={16} color={colors.textSecondary} />;
    }
  };

  const renderUserList = () => {
    return leaderboard.slice(3).map((user, index) => (
      <View key={user.id} style={styles.userRow}>
        <View style={styles.userInfo}>
          <Text style={styles.userPosition}>{user.position}</Text>
          <Avatar source={user.avatar} size={40} style={styles.userAvatar} />
          <Text style={styles.userName}>{user.name}</Text>
        </View>
        <View style={styles.userScore}>
          {renderTrendIcon(user.trend)}
          <Text style={styles.scoreText}>{user.score}</Text>
        </View>
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Leaderboard</Text>
          <Text style={styles.subtitle}>Calories burnt</Text>
        </View>

        {/* Time Filter */}
        <SegmentedControl
          options={timeOptions}
          selectedIndex={selectedTimeIndex}
          onSelect={setSelectedTimeIndex}
        />

        {/* Podium */}
        {renderPodium()}

        {/* User List */}
        <View style={styles.userListContainer}>
          {renderUserList()}
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
    paddingHorizontal: spacing.lg,
  },
  header: {
    paddingVertical: spacing.lg,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
  podiumContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginVertical: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  podiumItem: {
    alignItems: 'center',
    marginHorizontal: spacing.sm,
  },
  firstPlace: {
    marginBottom: spacing.lg,
  },
  secondPlace: {
    marginBottom: spacing.md,
  },
  thirdPlace: {
    marginBottom: spacing.sm,
  },
  crownContainer: {
    marginBottom: spacing.sm,
  },
  podiumName: {
    ...typography.bodySmall,
    color: colors.textPrimary,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  podiumScore: {
    ...typography.h3,
    color: colors.accent,
    marginTop: spacing.xs,
  },
  userListContainer: {
    marginTop: spacing.lg,
  },
  userRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: spacing.sm,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userPosition: {
    ...typography.body,
    color: colors.textSecondary,
    width: 30,
    textAlign: 'center',
  },
  userAvatar: {
    marginHorizontal: spacing.md,
  },
  userName: {
    ...typography.body,
    color: colors.textPrimary,
    flex: 1,
  },
  userScore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  scoreText: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
  },
}); 