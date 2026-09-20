# Building the Macro Tracker App

## Option 1: Build APK Locally (Recommended)

### Prerequisites:

- Android Studio installed
- Android SDK (API 31 or higher)
- Java Development Kit (JDK 11 or higher)
- Node.js and npm

### Steps:

1. **Install dependencies:**

```bash
cd /path/to/native_app
npm install
```

2. **Build APK using Expo:**

```bash
# First, ensure you're logged in
npx expo login

# Build for Android
eas build --platform android --local
```

3. **Or build using Gradle directly:**

```bash
# Generate native Android build
npx expo run:android
```

## Option 2: Use EAS Build (Cloud Build - Recommended for CI/CD)

1. **Log in to Expo:**

```bash
npx expo login
# Enter your email and password
```

2. **Build in the cloud:**

```bash
eas build --platform android
```

This will build your APK on Expo's servers and download it automatically.

## Option 3: Export Web Version

If you just need to test the app's functionality:

```bash
npx expo export --platform web
```

This creates a static export that can be deployed anywhere.

## App Features:

✅ Home screen with macro progress tracking
✅ Add/Edit/Delete meals
✅ Customizable daily macro goals
✅ Progress bars with visual feedback
✅ Copy/Share meal summaries
✅ Haptic feedback
✅ Cross-platform support

## Project Structure:

```
src/
├── app/
│   ├── _layout.tsx (Root layout)
│   ├── edit-meal.tsx (Edit meal modal)
│   └── (tabs)/
│       ├── _layout.tsx (Tab navigation)
│       ├── index.tsx (Home screen)
│       ├── add-meals.tsx (Add meal screen)
│       ├── meals.tsx (All meals list)
│       └── settings.tsx (Settings screen)
├── components/
│   ├── MacroProgress.tsx
│   ├── MacroProgressGrid.tsx
│   ├── MealItem.tsx
│   ├── CopyButton.tsx
│   ├── ShareButton.tsx
│   └── others...
├── storage/
│   ├── meals.ts (Meal management)
│   └── goals.ts (Goal management)
└── styles/
    └── global.ts (Theme and global styles)
```

## Testing Locally

To test the app before building:

```bash
# Web version
npm run web

# Expo Go (requires Expo Go app on phone)
npx expo start
# Scan QR code with Expo Go
```

## Build Configuration

The app is configured in `app.json`:

- App name: native_app
- Version: 1.0.0
- Package: com.anonymous.native_app
- Icon: assets/images/logo.png

## Troubleshooting

### If authentication fails:

- Ensure you have an Expo account at https://expo.dev
- Check your internet connection
- Try: `npx expo logout` then `npx expo login` again

### If build fails locally:

- Ensure Android SDK is properly installed
- Set `ANDROID_HOME` environment variable
- Run `flutter doctor` to diagnose issues

### If you prefer not to authenticate:

- Use `npm run web` for web version
- Use `expo export --platform web` for static export

## Next Steps

1. Set up your local development environment with Android SDK
2. Run `npm install` to install dependencies
3. Use `npm run web` for web testing
4. Build APK when ready using the steps above
