import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types/Task';

const TASKS_KEY = 'tasks';

export async function loadTasks(): Promise<Task[]> {
  try {
    const data = await AsyncStorage.getItem(TASKS_KEY);
    if (data === null) {
      return [];
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading tasks:', error);
    return [];
  }
}

export async function saveTasks(tasks: Task[]): Promise<void> {
  try {
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks:', error);
  }
}
