# Responsive Design Guide - ARVA APP

## 📱 **Device Support**

### **iOS Devices:**
- ✅ iPhone SE (375px width)
- ✅ iPhone 12/13/14 (390px width)
- ✅ iPhone 12/13/14 Pro (390px width)
- ✅ iPhone 12/13/14 Pro Max (428px width)
- ✅ iPad (768px+ width)

### **Android Devices:**
- ✅ Small phones (320-375px width)
- ✅ Medium phones (375-414px width)
- ✅ Large phones (414-768px width)
- ✅ Tablets (768px+ width)

## 🎯 **Breakpoints**

```typescript
deviceSize = {
  small: screenWidth < 375,      // iPhone SE, small Android
  medium: screenWidth >= 375 && screenWidth < 414,  // iPhone 12/13/14
  large: screenWidth >= 414 && screenWidth < 768,   // iPhone Pro Max, large Android
  tablet: screenWidth >= 768,    // iPad, Android tablets
}
```

## 📐 **Responsive Scaling**

### **Font Sizes:**
- Small devices: 90% of base size
- Medium devices: 100% of base size
- Large devices: 110% of base size
- Tablets: 120% of base size

### **Spacing:**
- Small devices: 80% of base spacing
- Medium devices: 100% of base spacing
- Large devices: 110% of base spacing
- Tablets: 130% of base spacing

## 🧩 **Component Responsive Values**

### **Headers:**
```typescript
headerHeight: tablet ? 80 : 60
headerPadding: tablet ? 24 : 16
```

### **Cards:**
```typescript
cardPadding: tablet ? 24 : 16
cardBorderRadius: tablet ? 16 : 12
```

### **Buttons:**
```typescript
buttonHeight: tablet ? 56 : 48
buttonPadding: tablet ? 20 : 16
```

### **Icons:**
```typescript
iconSize: {
  small: tablet ? 20 : 16,
  medium: tablet ? 24 : 20,
  large: tablet ? 32 : 24,
}
```

### **Avatars:**
```typescript
avatarSize: {
  small: tablet ? 40 : 32,
  medium: tablet ? 56 : 48,
  large: tablet ? 80 : 64,
}
```

## 📊 **Chart Responsive**

### **Chart Dimensions:**
- Small: 90% width, 80% height
- Medium: 100% width, 100% height
- Large: 105% width, 110% height
- Tablet: 120% width, 130% height

## 🛠 **Usage Examples**

### **Using Responsive Font Sizes:**
```typescript
import { responsiveFontSize } from '../theme/responsive';

const styles = StyleSheet.create({
  title: {
    fontSize: responsiveFontSize(32),
    lineHeight: responsiveFontSize(40),
  },
});
```

### **Using Responsive Spacing:**
```typescript
import { responsiveSpacing } from '../theme/responsive';

const styles = StyleSheet.create({
  container: {
    padding: responsiveSpacing(16),
    marginBottom: responsiveSpacing(24),
  },
});
```

### **Using Responsive Values:**
```typescript
import { responsiveValues } from '../theme/responsive';

const styles = StyleSheet.create({
  card: {
    padding: responsiveValues.cardPadding,
    borderRadius: responsiveValues.cardBorderRadius,
  },
});
```

### **Using Safe Area Padding:**
```typescript
import { getSafeAreaPadding } from '../theme/responsive';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: getSafeAreaPadding().horizontal,
    paddingVertical: getSafeAreaPadding().vertical,
  },
});
```

## 🎨 **Theme Integration**

### **Typography:**
All typography styles automatically use responsive font sizes.

### **Spacing:**
All spacing values automatically scale based on device size.

### **Colors:**
Colors remain consistent across all devices.

## 📱 **Testing**

### **iOS Simulator:**
- iPhone SE (375px)
- iPhone 14 (390px)
- iPhone 14 Pro Max (428px)
- iPad (768px+)

### **Android Emulator:**
- Small phone (320px)
- Medium phone (375px)
- Large phone (414px)
- Tablet (768px+)

### **Web Browser:**
- Resize browser window to test different breakpoints
- Use Chrome DevTools device simulation

## 🔧 **Best Practices**

1. **Always use responsive utilities** instead of hard-coded values
2. **Test on multiple devices** or simulators
3. **Use relative units** (responsiveSpacing, responsiveFontSize)
4. **Consider touch targets** - minimum 44px on mobile
5. **Optimize for tablets** with larger touch targets and spacing

## 📈 **Performance**

- Responsive calculations are done at component mount
- No runtime performance impact
- Cached values for consistent rendering

