import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { colors, spacing } from '../theme/colors';
import { typography } from '../theme/typography';
import { Avatar } from '../components/Avatar';
import { MenuItem } from '../components/MenuItem';
import { useAuthStore } from '../store/useAuthStore';
import { useI18n } from '../i18n/i18n';
import { LanguageSelector } from '../components/LanguageSelector';

export const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { t } = useI18n();
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  const menuItems = [
    { title: t('profile.personalInfo'), icon: 'user' as const },
    { title: t('profile.changePassword'), icon: 'lock' as const },
    { title: t('profile.language'), icon: 'globe' as const },
    { title: t('profile.walkingPerformance'), icon: 'activity' as const },
    { title: t('profile.cyclingPerformance'), icon: 'trending-up' as const },
    { title: t('profile.faq'), icon: 'help-circle' as const },
    { title: t('profile.contactUs'), icon: 'message-circle' as const },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: logout,
        },
      ]
    );
  };

  const handleMenuItemPress = (title: string) => {
    if (title === t('profile.language')) {
      setShowLanguageSelector(true);
    } else {
      // Handle other menu item press - for now just show an alert
      Alert.alert('Menu Item', `${title} pressed`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{t('profile.title')}</Text>
        </View>

        {/* User Info Card */}
        <View style={styles.userCard}>
          <Avatar source={user?.avatar} size={100} style={styles.userAvatar} />
          <Text style={styles.userName}>{user?.name || 'Kai Nguyen'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'khainguyen@lucen.vn'}</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              title={item.title}
              icon={item.icon}
              onPress={() => handleMenuItemPress(item.title)}
            />
          ))}
        </View>

        {/* Social/Share Icons */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton} accessibilityLabel="Email">
            <Feather name="mail" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} accessibilityLabel="Profile">
            <Feather name="user" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} accessibilityLabel="Share">
            <Feather name="share-2" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Floating Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
        accessibilityLabel="Logout"
      >
        <Feather name="log-out" size={24} color={colors.background} />
      </TouchableOpacity>

      {/* Language Selector Modal */}
      <LanguageSelector
        visible={showLanguageSelector}
        onClose={() => setShowLanguageSelector(false)}
      />
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
  },
  userCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.xl,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  userAvatar: {
    marginBottom: spacing.md,
  },
  userName: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  userEmail: {
    ...typography.body,
    color: colors.textSecondary,
  },
  menuContainer: {
    marginBottom: spacing.xl,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.lg,
    marginBottom: spacing.xl,
  },
  socialButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoutButton: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.lg,
    backgroundColor: colors.accent,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.accent,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
}); 