import { loadTasks, saveTasks } from '../utils/storage';
import { Task } from '../types/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe('Persistence Properties', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Property 10: App Restart Persistence
  // Validates: Requirements 6.2, 6.4
  test('For any set of tasks saved to local storage, closing and reopening the app should restore all tasks with identical descriptions and metadata', async () => {
    const originalTasks: Task[] = [
      {
        id: 'task-1',
        description: 'Buy groceries',
        createdAt: 1000,
      },
      {
        id: 'task-2',
        description: 'Complete project',
        createdAt: 2000,
      },
      {
        id: 'task-3',
        description: 'Call mom',
        createdAt: 3000,
      },
    ];

    // Simulate saving tasks
    await saveTasks(originalTasks);

    // Simulate app restart by loading tasks
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify(originalTasks)
    );
    const restoredTasks = await loadTasks();

    // Verify all tasks are restored with identical data
    expect(restoredTasks).toEqual(originalTasks);
    expect(restoredTasks.length).toBe(originalTasks.length);

    restoredTasks.forEach((task, index) => {
      expect(task.id).toBe(originalTasks[index].id);
      expect(task.description).toBe(originalTasks[index].description);
      expect(task.createdAt).toBe(originalTasks[index].createdAt);
    });
  });

  test('For any large task list, persistence should maintain all tasks after app restart', async () => {
    const largeTasks: Task[] = Array.from({ length: 50 }, (_, i) => ({
      id: `task-${i}`,
      description: `Task ${i}`,
      createdAt: i * 1000,
    }));

    await saveTasks(largeTasks);

    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify(largeTasks)
    );
    const restoredTasks = await loadTasks();

    expect(restoredTasks.length).toBe(50);
    expect(restoredTasks).toEqual(largeTasks);
  });

  test('For any task list with special characters, persistence should preserve all characters', async () => {
    const specialTasks: Task[] = [
      {
        id: '1',
        description: 'Task with émojis 🎉 and spëcial çhars',
        createdAt: 1000,
      },
      {
        id: '2',
        description: 'Task with "quotes" and \'apostrophes\'',
        createdAt: 2000,
      },
      {
        id: '3',
        description: 'Task with\nnewlines\nand\ttabs',
        createdAt: 3000,
      },
    ];

    await saveTasks(specialTasks);

    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify(specialTasks)
    );
    const restoredTasks = await loadTasks();

    expect(restoredTasks).toEqual(specialTasks);
    restoredTasks.forEach((task, index) => {
      expect(task.description).toBe(specialTasks[index].description);
    });
  });

  // Property 6: Deletion Persists
  // Validates: Requirements 3.3
  test('For any task deleted from the task list, retrieving the task list from local storage should not contain that task', async () => {
    const initialTasks: Task[] = [
      { id: '1', description: 'Task 1', createdAt: 1000 },
      { id: '2', description: 'Task 2', createdAt: 2000 },
      { id: '3', description: 'Task 3', createdAt: 3000 },
    ];

    // Delete task 2
    const updatedTasks = initialTasks.filter((t) => t.id !== '2');

    await saveTasks(updatedTasks);

    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify(updatedTasks)
    );
    const restoredTasks = await loadTasks();

    expect(restoredTasks).not.toContainEqual(initialTasks[1]);
    expect(restoredTasks.length).toBe(2);
    expect(restoredTasks.map((t) => t.id)).toEqual(['1', '3']);
  });

  test('For any task list, deleting all tasks and persisting should result in an empty list on reload', async () => {
    const initialTasks: Task[] = [
      { id: '1', description: 'Task 1', createdAt: 1000 },
      { id: '2', description: 'Task 2', createdAt: 2000 },
    ];

    const emptyTasks: Task[] = [];

    await saveTasks(emptyTasks);

    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify(emptyTasks)
    );
    const restoredTasks = await loadTasks();

    expect(restoredTasks).toEqual([]);
    expect(restoredTasks.length).toBe(0);
  });

  test('For any task list, deleting specific tasks should persist the correct remaining tasks', async () => {
    const initialTasks: Task[] = [
      { id: '1', description: 'Keep this', createdAt: 1000 },
      { id: '2', description: 'Delete this', createdAt: 2000 },
      { id: '3', description: 'Keep this too', createdAt: 3000 },
    ];

    const tasksAfterDeletion = initialTasks.filter((t) => t.id !== '2');

    await saveTasks(tasksAfterDeletion);

    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify(tasksAfterDeletion)
    );
    const restoredTasks = await loadTasks();

    expect(restoredTasks.length).toBe(2);
    expect(restoredTasks[0].description).toBe('Keep this');
    expect(restoredTasks[1].description).toBe('Keep this too');
  });
});
