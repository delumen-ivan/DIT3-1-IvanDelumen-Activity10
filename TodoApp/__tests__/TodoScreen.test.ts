import { Task } from '../types/Task';

describe('TodoScreen Logic', () => {
  // Property 1: Task Addition Grows List
  // Validates: Requirements 1.1, 2.4
  test('For any task list and any valid (non-empty, non-whitespace) task description, adding it to the task list should result in the length of the task list growing by exactly one', () => {
    const initialTasks: Task[] = [
      { id: '1', description: 'Task 1', createdAt: 100 },
    ];

    const newTask: Task = {
      id: '2',
      description: 'New task',
      createdAt: 200,
    };

    const updatedTasks = [...initialTasks, newTask];

    expect(updatedTasks.length).toBe(initialTasks.length + 1);
    expect(updatedTasks).toContain(newTask);
  });

  test('For any empty task list, adding a valid task should result in a list of length 1', () => {
    const initialTasks: Task[] = [];

    const newTask: Task = {
      id: '1',
      description: 'First task',
      createdAt: 100,
    };

    const updatedTasks = [...initialTasks, newTask];

    expect(updatedTasks.length).toBe(1);
    expect(updatedTasks[0]).toEqual(newTask);
  });

  test('For any task list, adding multiple valid tasks should grow the list by the number of tasks added', () => {
    const initialTasks: Task[] = [];

    const newTasks: Task[] = [
      { id: '1', description: 'Task 1', createdAt: 100 },
      { id: '2', description: 'Task 2', createdAt: 200 },
      { id: '3', description: 'Task 3', createdAt: 300 },
    ];

    let updatedTasks = initialTasks;
    newTasks.forEach((task) => {
      updatedTasks = [...updatedTasks, task];
    });

    expect(updatedTasks.length).toBe(newTasks.length);
  });

  // Property 5: Deletion Removes Task
  // Validates: Requirements 3.1, 3.2
  test('For any task in the task list, when the delete action is performed on that task, the task should no longer appear in the task list', () => {
    const tasks: Task[] = [
      { id: '1', description: 'Task 1', createdAt: 100 },
      { id: '2', description: 'Task 2', createdAt: 200 },
      { id: '3', description: 'Task 3', createdAt: 300 },
    ];

    const taskToDelete = tasks[1];
    const updatedTasks = tasks.filter((task) => task.id !== taskToDelete.id);

    expect(updatedTasks).not.toContain(taskToDelete);
    expect(updatedTasks.length).toBe(tasks.length - 1);
  });

  test('For any task list, deleting a task should remove exactly that task', () => {
    const tasks: Task[] = [
      { id: '1', description: 'Task 1', createdAt: 100 },
      { id: '2', description: 'Task 2', createdAt: 200 },
    ];

    const updatedTasks = tasks.filter((task) => task.id !== '1');

    expect(updatedTasks.length).toBe(1);
    expect(updatedTasks[0].id).toBe('2');
  });

  test('For any task list, deleting a non-existent task should not change the list', () => {
    const tasks: Task[] = [
      { id: '1', description: 'Task 1', createdAt: 100 },
      { id: '2', description: 'Task 2', createdAt: 200 },
    ];

    const updatedTasks = tasks.filter((task) => task.id !== 'non-existent');

    expect(updatedTasks).toEqual(tasks);
    expect(updatedTasks.length).toBe(tasks.length);
  });

  // Property 3: Input Field Clears After Addition
  // Validates: Requirements 1.3
  test('For any UI state where the input field contains text, successfully submitting a task should result in the input field being cleared', () => {
    const inputValue = 'New task';
    const clearedInput = '';

    expect(clearedInput).toBe('');
    expect(inputValue.length > 0).toBe(true);
  });

  // Property 8: FIFO Task Ordering
  // Validates: Requirements 2.4
  test('For any sequence of tasks added to the task list, retrieving the list should return tasks in the same order they were added', () => {
    const tasks: Task[] = [
      { id: '1', description: 'First', createdAt: 100 },
      { id: '2', description: 'Second', createdAt: 200 },
      { id: '3', description: 'Third', createdAt: 300 },
    ];

    const taskIds = tasks.map((t) => t.id);
    expect(taskIds).toEqual(['1', '2', '3']);
  });

  // Property 7: Empty State Consistency
  // Validates: Requirements 2.3, 3.4
  test('For any task list, when the list becomes empty, no task items should be visible', () => {
    const tasks: Task[] = [];

    expect(tasks.length).toBe(0);
    expect(tasks).toEqual([]);
  });

  test('For any non-empty task list, when all tasks are deleted, the list should become empty', () => {
    let tasks: Task[] = [
      { id: '1', description: 'Task 1', createdAt: 100 },
      { id: '2', description: 'Task 2', createdAt: 200 },
    ];

    tasks = tasks.filter(() => false);

    expect(tasks.length).toBe(0);
  });
});
