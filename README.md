# Cross-Platform To-Do List App

A simple, efficient to-do list application built with **React Native** and **Expo**, providing a seamless experience across iOS and Android platforms from a single codebase.

## Framework Used

**React Native** with **Expo**

This project leverages React Native, a JavaScript framework that enables developers to build native mobile applications using React. Expo is used as the development platform, providing tools and services that simplify the React Native development process.

### Why React Native?
- **Single Codebase**: Write once, deploy to both iOS and Android
- **JavaScript/TypeScript**: Familiar language for web developers
- **Hot Reload**: Instant feedback during development
- **Rich Ecosystem**: Access to thousands of community packages
- **Native Performance**: Compiles to native code for optimal performance

## Native vs Cross-Platform Comparison

### Native Development
| Aspect | Native |
|--------|--------|
| **Languages** | Swift (iOS), Kotlin (Android) |
| **Development Time** | Longer - separate codebases for each platform |
| **Code Reuse** | Minimal - platform-specific code required |
| **Performance** | Optimal - direct access to platform APIs |
| **Maintenance** | Higher - must maintain two separate projects |
| **Learning Curve** | Steeper - requires platform-specific knowledge |
| **Team Size** | Larger - need iOS and Android specialists |

### Cross-Platform (React Native)
| Aspect | Cross-Platform |
|--------|--------|
| **Languages** | JavaScript/TypeScript |
| **Development Time** | Faster - single codebase for both platforms |
| **Code Reuse** | High - 90%+ code sharing between platforms |
| **Performance** | Very Good - near-native performance |
| **Maintenance** | Lower - single codebase to maintain |
| **Learning Curve** | Gentler - JavaScript knowledge sufficient |
| **Team Size** | Smaller - one team can handle both platforms |


## App Features

### Core Functionality

#### 1. Add Tasks
- Enter task descriptions in the input field
- Tap the "Add" button to create a new task
- Input validation prevents empty or whitespace-only tasks
- Input field automatically clears after successful addition
- Tasks are immediately persisted to local storage

#### 2. View Task List
- Display all tasks in a clean, organized list
- Tasks appear in FIFO (First-In-First-Out) order
- Each task shows its description text
- Empty state message displays when no tasks exist
- Responsive layout adapts to different screen sizes

#### 3. Delete Tasks
- Tap the delete button (✕) next to any task
- Task is immediately removed from the list
- Changes are persisted to local storage
- Empty state message appears when all tasks are deleted

#### 4. Data Persistence
- All tasks are automatically saved to local storage
- Tasks persist across app sessions
- Data survives app restarts and device reboots
- Uses AsyncStorage for reliable cross-platform persistence

#### 5. Cross-Platform Compatibility
- Runs seamlessly on iOS and Android
- Consistent UI and functionality across platforms
- Responsive design works on various screen sizes
- Native performance on both platforms

### Technical Features

#### Architecture
- **Component-Based**: Modular, reusable components
- **State Management**: React Hooks (useState, useEffect)
- **Type Safety**: Full TypeScript support
- **Testing**: Comprehensive test suite with 43 passing tests

#### Testing Coverage
- **Unit Tests**: Validate individual functions and components
- **Property-Based Tests**: Verify universal correctness properties
- **Test Suites**: 7 test files covering all major features
- **100% Pass Rate**: All 43 tests passing

#### Key Components
- **TodoScreen**: Main screen managing task list state
- **TaskItem**: Individual task display with delete button
- **Storage Layer**: AsyncStorage utilities for persistence
- **Validation**: Input validation for task descriptions

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`

### Installation

```bash
# Navigate to the app directory
cd TodoApp

# Install dependencies
npm install
```

### Running the App

#### Option 1: Expo Go (Easiest)
```bash
npm start
```
Then scan the QR code with the Expo Go app on your mobile device.

#### Option 2: Android Emulator
```bash
npm run android
```
Requires Android SDK and emulator setup.

#### Option 3: iOS Simulator (macOS only)
```bash
npm run ios
```

### Running Tests

```bash
npm test
```

All 43 tests will run and display results.

## Project Structure

### Core
- `react-native`: Mobile app framework
- `expo`: Development platform
- `@react-native-async-storage/async-storage`: Local storage
- `uuid`: Unique ID generation

### Development
- `typescript`: Type safety
- `jest`: Testing framework
- `ts-jest`: TypeScript support for Jest
- `@testing-library/react-native`: Testing utilities

## Correctness Properties

The app is validated against 10 correctness properties:

1. **Task Addition Grows List**: Adding a task increases list length by 1
2. **Whitespace Tasks Invalid**: Empty/whitespace input is rejected
3. **Input Field Clears**: Input clears after successful addition
4. **Task Persistence Round Trip**: Tasks survive save/load cycle
5. **Deletion Removes Task**: Deleted tasks no longer appear
6. **Deletion Persists**: Deleted tasks don't reappear after reload
7. **Empty State Consistency**: Empty list shows appropriate message
8. **FIFO Task Ordering**: Tasks maintain insertion order
9. **Cross-Platform Consistency**: Same behavior on iOS and Android
10. **App Restart Persistence**: Tasks restore after app restart

## Performance

- **Fast Load Time**: Minimal dependencies, optimized bundle
- **Smooth Interactions**: Native performance on both platforms
- **Efficient Storage**: Lightweight AsyncStorage implementation
- **Responsive UI**: Immediate feedback on user actions


