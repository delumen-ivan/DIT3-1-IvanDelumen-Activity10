import { loadTasks, saveTasks } from '../utils/storage';
import { Task } from '../types/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe('Storage Round Trip', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Property 4: Task Persistence Round Trip
  // Validates: Requirements 1.4, 6.1, 6.3
  test('For any task added to the task list, retrieving the task list from local storage should return a list containing that task with identical description and metadata', async () => {
    const mockTasks: Task[] = [
      {
        id: 'test-id-1',
        description: 'Test task 1',
        createdAt: 1000,
      },
      {
        id: 'test-id-2',
        description: 'Test task 2',
        createdAt: 2000,
      },
    ];

    // Mock the storage to return our tasks
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(mockTasks));

    // Save tasks
    await saveTasks(mockTasks);

    // Load tasks back
    const loadedTasks = await loadTasks();

    // Verify round trip
    expect(loadedTasks).toEqual(mockTasks);
    expect(loadedTasks.length).toBe(mockTasks.length);
    expect(loadedTasks[0].description).toBe(mockTasks[0].description);
    expect(loadedTasks[0].id).toBe(mockTasks[0].id);
    expect(loadedTasks[0].createdAt).toBe(mockTasks[0].createdAt);
  });

  test('For any empty task list, saving and loading should return an empty list', async () => {
    const emptyTasks: Task[] = [];

    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(emptyTasks));

    await saveTasks(emptyTasks);
    const loadedTasks = await loadTasks();

    expect(loadedTasks).toEqual([]);
    expect(loadedTasks.length).toBe(0);
  });

  test('For any task list with multiple tasks, all tasks should be preserved in order', async () => {
    const mockTasks: Task[] = [
      { id: '1', description: 'First', createdAt: 100 },
      { id: '2', description: 'Second', createdAt: 200 },
      { id: '3', description: 'Third', createdAt: 300 },
    ];

    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(mockTasks));

    await saveTasks(mockTasks);
    const loadedTasks = await loadTasks();

    expect(loadedTasks).toEqual(mockTasks);
    expect(loadedTasks.map((t) => t.id)).toEqual(['1', '2', '3']);
  });
});
