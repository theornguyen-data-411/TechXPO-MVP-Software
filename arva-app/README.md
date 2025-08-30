# ARVA APP

A React Native Expo application for battery health monitoring and community fitness tracking.

## 📱 App Overview / Tổng quan ứng dụng

ARVA APP is a mobile application that helps users monitor their device battery health and participate in fitness challenges with the community. The app features a dark theme design with green accents, providing an intuitive and modern user experience.

ARVA APP là ứng dụng di động giúp người dùng theo dõi sức khỏe pin thiết bị và tham gia các thử thách thể dục với cộng đồng. Ứng dụng có thiết kế giao diện tối với điểm nhấn màu xanh lá, mang lại trải nghiệm người dùng trực quan và hiện đại.

## 🚀 Getting Started / Bắt đầu

### Prerequisites / Yêu cầu hệ thống

- Node.js (v16 or higher / v16 trở lên)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development) or Android Emulator

### Installation / Cài đặt

1. **Clone the repository / Sao chép repository**
   ```bash
   git clone <repository-url>
   cd arva-app
   ```

2. **Install dependencies / Cài đặt các gói phụ thuộc**
   ```bash
   npm install
   ```

3. **Start the development server / Khởi động máy chủ phát triển**
   ```bash
   npx expo start
   ```

4. **Run on device / Chạy trên thiết bị**
   - Scan the QR code with Expo Go app
   - Or press 'i' for iOS simulator / 'a' for Android emulator

## 📁 Project Structure / Cấu trúc dự án

```
arva-app/
├── src/
│   ├── app.tsx                 # Main app entry point
│   ├── navigation/
│   │   └── RootNavigator.tsx   # Navigation configuration
│   ├── screens/
│   │   ├── LoginScreen.tsx     # Authentication screen
│   │   ├── BatteryScreen.tsx   # Battery health monitoring
│   │   ├── LeaderboardScreen.tsx # Community leaderboard
│   │   └── ProfileScreen.tsx   # User profile management
│   ├── components/
│   │   ├── Avatar.tsx          # User avatar component
│   │   ├── ProgressBar.tsx     # Animated progress bars
│   │   ├── StatCard.tsx        # Statistics display cards
│   │   ├── MenuItem.tsx        # Menu item component
│   │   ├── SegmentedControl.tsx # Time filter controls
│   │   └── TabBarIcon.tsx      # Tab navigation icons
│   ├── store/
│   │   ├── useAuthStore.ts     # Authentication state management
│   │   └── useBatteryStore.ts  # Battery data state management
│   ├── services/
│   │   ├── api.ts              # API configuration
│   │   └── auth.ts             # Authentication services
│   ├── theme/
│   │   ├── colors.ts           # Color palette and spacing
│   │   └── typography.ts       # Typography definitions
│   ├── mock/
│   │   ├── leaderboard.json    # Mock leaderboard data
│   │   └── batteryHistory.json # Mock battery data
│   └── types/
│       └── index.ts            # TypeScript type definitions
├── __tests__/                  # Test files
├── .eslintrc.js               # ESLint configuration
├── .prettierrc                # Prettier configuration
└── README.md                  # This file
```

## 🎨 Design System / Hệ thống thiết kế

### Colors / Màu sắc
- **Background**: `#0F1222` (Dark blue)
- **Card**: `#1C2236` (Medium dark blue)
- **Text Primary**: `#FFFFFF` (White)
- **Text Secondary**: `#9AA2B1` (Light gray)
- **Accent**: `#35E08B` (Green)
- **Border**: `#2C3550` (Medium gray)

### Typography / Typography
- **H1**: 32px, Bold
- **H2**: 24px, Bold
- **H3**: 20px, Semi-bold
- **Body**: 16px, Regular
- **Body Small**: 14px, Regular
- **Caption**: 12px, Regular

## 🔧 Features / Tính năng

### Authentication / Xác thực
- Login with email and password
- Form validation using Zod
- "Keep me logged in" functionality
- Secure password visibility toggle

### Battery Health / Sức khỏe pin
- Real-time battery percentage display
- Battery life indicators for smartphone and smartwatch
- 30-day battery history chart
- Animated progress bars

### Community / Cộng đồng
- Leaderboard with top performers
- Time-based filtering (Today, This month, This year)
- User rankings with trend indicators
- Podium display for top 3 users

### Profile Management / Quản lý hồ sơ
- User information display
- Menu items for various settings
- Social sharing options
- Logout functionality

## 🛠️ Technology Stack / Stack công nghệ

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation v6
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **Charts**: Victory Native
- **Icons**: Expo Vector Icons (Feather)
- **Styling**: React Native StyleSheet
- **Networking**: Axios
- **Linting**: ESLint + Prettier

## 🔄 API Integration / Tích hợp API

The app currently uses mock data but is structured to easily switch to real API endpoints. To connect to a real API:

Ứng dụng hiện tại sử dụng dữ liệu giả nhưng được cấu trúc để dễ dàng chuyển đổi sang các endpoint API thực. Để kết nối với API thực:

1. **Update environment variables / Cập nhật biến môi trường**
   ```bash
   EXPO_PUBLIC_API_URL=https://your-api-url.com
   ```

2. **Modify services / Chỉnh sửa services**
   - Uncomment real API functions in `src/services/auth.ts`
   - Update API endpoints in `src/services/api.ts`

3. **Replace mock data / Thay thế dữ liệu giả**
   - Update stores to use real API calls
   - Remove mock data imports

## 🧪 Testing / Kiểm thử

```bash
# Run tests / Chạy kiểm thử
npm test

# Run tests with coverage / Chạy kiểm thử với độ bao phủ
npm test -- --coverage
```

## 📱 Platform Support / Hỗ trợ nền tảng

- **iOS**: iPhone 13/14 optimized, iOS 13+
- **Android**: Android 8+ (API level 26+)
- **Development**: Expo Go app for testing

## 🚀 Deployment / Triển khai

### Building for Production / Build cho production

```bash
# iOS
npx expo build:ios

# Android
npx expo build:android
```

### Publishing Updates / Xuất bản cập nhật

```bash
npx expo publish
```

## 🤝 Contributing / Đóng góp

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License / Giấy phép

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support / Hỗ trợ

For support, email support@arvaapp.vn or create an issue in this repository.

---

**Note**: This app is designed for iPhone 13/14 first, with Android compatibility. The dark theme and green accent colors create a modern, professional appearance that matches the Figma design specifications.

**Lưu ý**: Ứng dụng này được thiết kế cho iPhone 13/14 trước, với khả năng tương thích Android. Giao diện tối và màu nhấn xanh lá tạo ra vẻ ngoài hiện đại, chuyên nghiệp phù hợp với thông số kỹ thuật thiết kế Figma. 