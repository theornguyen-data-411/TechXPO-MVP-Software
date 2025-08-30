# ARVA App 📱⚡

[![React Native](https://img.shields.io/badge/React%20Native-0.72+-blue.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Expo](https://img.shields.io/badge/Expo-SDK%2049+-blue.svg)](https://expo.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🇻🇳 Tiếng Việt

### Mô tả
ARVA App là ứng dụng di động được phát triển bằng React Native để quản lý và theo dõi hiệu suất sạc pin của các thiết bị di động. Ứng dụng cung cấp các tính năng phân tích chi tiết về năng lượng tiêu thụ, hiệu suất sạc và báo cáo thống kê.

### ✨ Tính năng chính
- 📊 **Báo cáo chi tiết**: Theo dõi năng lượng tiêu thụ theo ngày, tuần, tháng
- 📈 **Biểu đồ trực quan**: Hiển thị dữ liệu qua các biểu đồ bar chart và line chart
- 🔋 **Quản lý phiên sạc**: Theo dõi số lượng và hiệu suất các phiên sạc
- 💰 **Phân tích chi phí**: Tính toán và so sánh chi phí điện năng
- 📱 **Giao diện đa ngôn ngữ**: Hỗ trợ tiếng Việt và tiếng Anh
- 🎨 **Thiết kế responsive**: Tối ưu cho mọi kích thước màn hình

### 🛠️ Công nghệ sử dụng
- **React Native** - Framework phát triển ứng dụng di động
- **TypeScript** - Ngôn ngữ lập trình type-safe
- **Expo** - Platform phát triển và build ứng dụng
- **React Navigation** - Quản lý navigation
- **React Native Safe Area Context** - Xử lý safe area
- **Expo Vector Icons** - Thư viện icon

### 📦 Cài đặt

#### Yêu cầu hệ thống
- Node.js 18+ 
- npm hoặc yarn
- Expo CLI
- Android Studio (cho Android) hoặc Xcode (cho iOS)

#### Các bước cài đặt

1. **Clone repository**
```bash
git clone <repository-url>
cd arva-app
```

2. **Cài đặt dependencies**
```bash
npm install
# hoặc
yarn install
```

3. **Chạy ứng dụng**
```bash
# Khởi động Expo development server
npx expo start

# Chạy trên Android
npx expo run:android

# Chạy trên iOS
npx expo run:ios
```

### 🏗️ Cấu trúc dự án
```
arva-app/
├── src/
│   ├── components/          # React components
│   │   ├── SimpleBarChart.tsx
│   │   ├── SimpleLineChart.tsx
│   │   └── ...
│   ├── screens/            # Màn hình ứng dụng
│   │   ├── ReportScreen.tsx
│   │   ├── BatteryScreen.tsx
│   │   └── ...
│   ├── navigation/         # Cấu hình navigation
│   ├── theme/             # Theme và styling
│   ├── i18n/              # Internationalization
│   ├── services/          # API services
│   ├── store/             # State management
│   ├── types/             # TypeScript types
│   └── mock/              # Mock data
├── assets/                # Tài nguyên tĩnh
├── app.json              # Cấu hình Expo
└── package.json          # Dependencies
```

### 🎯 Tính năng chi tiết

#### 📊 Báo cáo năng lượng
- Tổng năng lượng tiêu thụ theo tháng (mAh)
- Công suất trung bình (mA)
- Phân tích theo thiết bị
- So sánh hiệu suất

#### 📈 Biểu đồ thống kê
- Bar chart cho dữ liệu năng lượng
- Line chart cho công suất theo thời gian
- Responsive design cho mobile
- Tương tác touch-friendly

#### 🔧 Tùy chỉnh giao diện
- Chế độ xem biểu đồ và text
- Bộ lọc theo thời gian (ngày/tuần/tháng)
- Theme tối/sáng
- Đa ngôn ngữ

### 🚀 Build và Deploy

#### Build cho production
```bash
# Build cho Android
npx expo build:android

# Build cho iOS
npx expo build:ios

# Build cho web
npx expo build:web
```

#### Publish lên Expo
```bash
npx expo publish
```

### 🤝 Đóng góp
Chúng tôi hoan nghênh mọi đóng góp! Vui lòng:

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit thay đổi (`git commit -m 'Add some AmazingFeature'`)
4. Push lên branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

### 📄 License
Dự án này được phân phối dưới giấy phép MIT. Xem file `LICENSE` để biết thêm chi tiết.

---

## 🇺🇸 English

### Description
ARVA App is a mobile application developed with React Native for managing and monitoring mobile device charging performance. The app provides detailed analysis of energy consumption, charging efficiency, and statistical reports.

### ✨ Key Features
- 📊 **Detailed Reports**: Track energy consumption by day, week, month
- 📈 **Visual Charts**: Display data through bar charts and line charts
- 🔋 **Charging Session Management**: Monitor session count and efficiency
- 💰 **Cost Analysis**: Calculate and compare electricity costs
- 📱 **Multi-language Interface**: Support Vietnamese and English
- 🎨 **Responsive Design**: Optimized for all screen sizes

### 🛠️ Technologies Used
- **React Native** - Mobile app development framework
- **TypeScript** - Type-safe programming language
- **Expo** - Development and build platform
- **React Navigation** - Navigation management
- **React Native Safe Area Context** - Safe area handling
- **Expo Vector Icons** - Icon library

### 📦 Installation

#### System Requirements
- Node.js 18+
- npm or yarn
- Expo CLI
- Android Studio (for Android) or Xcode (for iOS)

#### Setup Steps

1. **Clone repository**
```bash
git clone <repository-url>
cd arva-app
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Run application**
```bash
# Start Expo development server
npx expo start

# Run on Android
npx expo run:android

# Run on iOS
npx expo run:ios
```

### 🏗️ Project Structure
```
arva-app/
├── src/
│   ├── components/          # React components
│   │   ├── SimpleBarChart.tsx
│   │   ├── SimpleLineChart.tsx
│   │   └── ...
│   ├── screens/            # Application screens
│   │   ├── ReportScreen.tsx
│   │   ├── BatteryScreen.tsx
│   │   └── ...
│   ├── navigation/         # Navigation configuration
│   ├── theme/             # Theme and styling
│   ├── i18n/              # Internationalization
│   ├── services/          # API services
│   ├── store/             # State management
│   ├── types/             # TypeScript types
│   └── mock/              # Mock data
├── assets/                # Static resources
├── app.json              # Expo configuration
└── package.json          # Dependencies
```

### 🎯 Detailed Features

#### 📊 Energy Reports
- Total monthly energy consumption (mAh)
- Average power consumption (mA)
- Device-specific analysis
- Performance comparison

#### 📈 Statistical Charts
- Bar charts for energy data
- Line charts for power over time
- Mobile responsive design
- Touch-friendly interactions

#### 🔧 Interface Customization
- Chart and text view modes
- Time-based filters (day/week/month)
- Dark/light theme
- Multi-language support

### 🚀 Build and Deploy

#### Production Build
```bash
# Build for Android
npx expo build:android

# Build for iOS
npx expo build:ios

# Build for web
npx expo build:web
```

#### Publish to Expo
```bash
npx expo publish
```

### 🤝 Contributing
We welcome all contributions! Please:

1. Fork the project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Create Pull Request

### 📄 License
This project is distributed under the MIT License. See the `LICENSE` file for details.

---

## 📞 Contact
- **Email**: [your-email@example.com]
- **GitHub**: [your-github-username]
- **LinkedIn**: [your-linkedin-profile]

## 🙏 Acknowledgments
- React Native community
- Expo team
- All contributors and supporters

---

*Made with ❤️ by ARVA Team* 