import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { TodoScreen } from './screens/TodoScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <TodoScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
