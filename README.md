# SOOFT React Native Challenge

This project is a technical challenge built with **Expo**, **React Native**, and **TypeScript**.

It demonstrates modern mobile development practices, including local push notifications, modular state management using Zustand, and custom UI components following best practices.

---

## 🛠️ Tech Stack

- **Expo** (Bare Workflow)
- **React Native**
- **TypeScript**
- **Zustand** for state management
- **Notifee** for local push notifications — the go-to solution recommended by the React Native Firebase team
- **React Navigation** (based on the [official Expo template](https://reactnavigation.org/docs/getting-started/))
- **Jest** for unit testing
- **Husky** for Git hook automation (linting & testing)

---

## 🚀 Getting Started

To run the project locally, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/rodcibils/sooft-react-native-challenge.git
cd sooft-react-native-challenge
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app

Run on iOS simulator:

```bash
npx expo run:ios
```

Run on Android emulator:

```bash
npx expo run:android
```

---

## ✨ Features

- **Dark & Light mode support**  
  Automatically adapts to the device’s current theme using React Navigation's built-in theming support.

- **Send local notifications (immediate or scheduled)**  
  Use the "Send" tab to send a local push notification instantly or with a custom delay in seconds. The form supports title, body, and selecting one of three types: Info, Error, or Warning.

- **Unread badge on Inbox tab + App Icon Badge (iOS only)**  
  The Inbox tab icon shows a badge with the unread count. The app icon badge is also updated (only supported on iOS).  
  → [Notifee iOS badge support](https://notifee.app/react-native/docs/ios/badges)

- **Pre-commit checks via Husky**  
  Automatically runs unit tests and linting before every commit using a Husky pre-commit hook.

- **Notification history in the Inbox tab**  
  Notifications sent or received are listed chronologically in the Inbox tab.

- **Unread indicator on each notification**  
  Unread notifications show a small round dot. Tapping a notification navigates the user to a detail screen.

- **State management with Zustand**  
  All local state and data handling is powered by Zustand, including notification inbox, UI flags, and shared values.

- **Encapsulated notification logic with custom hook**  
  The Notifee integration (permissions, listeners, local pushes) is abstracted into a reusable hook.

- **Deep linking via notifications**  
  Pressing a notification (foreground or background) opens the app and navigates to the detail screen, marking the item as read.

- **Custom linting and Prettier configuration for VSCode**  
  The repository includes editor settings to ensure consistent formatting and linting in development.

- **Ephemeral in-memory data**  
  All data is stored in memory — there’s no disk or session persistence.

