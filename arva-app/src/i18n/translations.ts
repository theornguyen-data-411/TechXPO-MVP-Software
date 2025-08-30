export interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

export const translations: Translations = {
  vi: {
    // Navigation
    'nav.community': 'Cộng đồng',
    'nav.battery': 'Pin của tôi',
    'nav.reports': 'Báo cáo',
    'nav.profile': 'Hồ sơ',

    // Battery Screen
    'battery.title': 'Sức khỏe pin',
    'battery.lifeRemaining': 'Thời gian pin còn lại',
    'battery.currentPower': 'Công suất hiện tại',
    'battery.smartphone': 'Điện thoại',
    'battery.smartwatch': 'Đồng hồ thông minh',
    'battery.hours': 'giờ',
    'battery.days': 'ngày',
    'battery.last30Days': '30 ngày qua',
    'battery.noData': 'Không có dữ liệu',
    'battery.noDataSubtext': 'Lịch sử pin sẽ xuất hiện ở đây',
    'battery.loading': 'Đang tải dữ liệu pin...',
    'battery.retry': 'Thử lại',

    // Report Screen
    'report.title': 'Báo cáo chi tiết',
    'report.monthlySummary': 'Báo cáo tổng hợp theo tháng',
    'report.dailyEnergy': 'Lịch sử sạc - Năng lượng mỗi ngày',
    'report.powerTime': 'Phiên sạc: Công suất theo thời gian',
    'report.summary': 'Tóm tắt',
    'report.totalEnergy': 'Tổng năng lượng tháng',
    'report.avgPower': 'Công suất trung bình',
    'report.chartPlaceholder': 'Biểu đồ sẽ được hiển thị ở đây',

    // Profile Screen
    'profile.title': 'Hồ sơ của tôi',
    'profile.personalInfo': 'Thông tin cá nhân',
    'profile.changePassword': 'Đổi mật khẩu',
    'profile.language': 'Ngôn ngữ',
    'profile.walkingPerformance': 'Hiệu suất đi bộ',
    'profile.cyclingPerformance': 'Hiệu suất đạp xe',
    'profile.faq': 'Câu hỏi thường gặp',
    'profile.contactUs': 'Liên hệ chúng tôi',
    'profile.name': 'Tên',
    'profile.email': 'Email',
    'profile.phone': 'Số điện thoại',
    'profile.address': 'Địa chỉ',
    'profile.edit': 'Chỉnh sửa',
    'profile.save': 'Lưu',
    'profile.cancel': 'Hủy',

    // Login Screen
    'login.title': 'Đăng nhập',
    'login.email': 'Email',
    'login.password': 'Mật khẩu',
    'login.keepLoggedIn': 'Giữ đăng nhập',
    'login.signIn': 'Đăng nhập',
    'login.forgotPassword': 'Quên mật khẩu?',

    // Common
    'common.loading': 'Đang tải...',
    'common.error': 'Có lỗi xảy ra',
    'common.retry': 'Thử lại',
    'common.cancel': 'Hủy',
    'common.save': 'Lưu',
    'common.edit': 'Chỉnh sửa',
    'common.delete': 'Xóa',
    'common.confirm': 'Xác nhận',
    'common.yes': 'Có',
    'common.no': 'Không',

    // Language
    'language.title': 'Ngôn ngữ',
    'language.vietnamese': 'Tiếng Việt',
    'language.english': 'English',
  },
  en: {
    // Navigation
    'nav.community': 'Community',
    'nav.battery': 'My Battery',
    'nav.reports': 'Reports',
    'nav.profile': 'My Profile',

    // Battery Screen
    'battery.title': 'Battery Health',
    'battery.lifeRemaining': 'Battery life remaining',
    'battery.currentPower': 'Current power',
    'battery.smartphone': 'Smartphone',
    'battery.smartwatch': 'Smartwatch',
    'battery.hours': 'hours',
    'battery.days': 'days',
    'battery.last30Days': 'Last 30 days',
    'battery.noData': 'No data available',
    'battery.noDataSubtext': 'Battery history will appear here',
    'battery.loading': 'Loading battery data...',
    'battery.retry': 'Retry',

    // Report Screen
    'report.title': 'Detailed Reports',
    'report.monthlySummary': 'Monthly Summary Report',
    'report.dailyEnergy': 'Charging History - Daily Energy',
    'report.powerTime': 'Charging Session - Power over Time',
    'report.summary': 'Summary',
    'report.totalEnergy': 'Total Monthly Energy',
    'report.avgPower': 'Average Power',
    'report.chartPlaceholder': 'Chart will be displayed here',

    // Profile Screen
    'profile.title': 'My Profile',
    'profile.personalInfo': 'Personal Information',
    'profile.changePassword': 'Change Password',
    'profile.language': 'Language',
    'profile.walkingPerformance': 'Walking Performance',
    'profile.cyclingPerformance': 'Cycling Performance',
    'profile.faq': 'FAQ',
    'profile.contactUs': 'Contact Us',
    'profile.name': 'Name',
    'profile.email': 'Email',
    'profile.phone': 'Phone',
    'profile.address': 'Address',
    'profile.edit': 'Edit',
    'profile.save': 'Save',
    'profile.cancel': 'Cancel',

    // Login Screen
    'login.title': 'Login',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.keepLoggedIn': 'Keep me logged in',
    'login.signIn': 'Sign In',
    'login.forgotPassword': 'Forgot Password?',

    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.retry': 'Retry',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.confirm': 'Confirm',
    'common.yes': 'Yes',
    'common.no': 'No',

    // Language
    'language.title': 'Language',
    'language.vietnamese': 'Tiếng Việt',
    'language.english': 'English',
  },
};
