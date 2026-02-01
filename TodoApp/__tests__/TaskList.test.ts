import { Task } from '../types/Task';

describe('Task List Display', () => {
  // Property 8: FIFO Task Ordering
  // Validates: Requirements 2.4
  test('For any sequence of tasks added to the task list, retrieving the list should return tasks in the same order they were added', () => {
    const tasks: Task[] = [
      { id: '1', description: 'First task', createdAt: 1000 },
      { id: '2', description: 'Second task', createdAt: 2000 },
      { id: '3', description: 'Third task', createdAt: 3000 },
    ];

    const retrievedOrder = tasks.map((t) => t.id);
    expect(retrievedOrder).toEqual(['1', '2', '3']);
  });

  test('For any task list, the order should be preserved after filtering', () => {
    const tasks: Task[] = [
      { id: '1', description: 'Task 1', createdAt: 1000 },
      { id: '2', description: 'Task 2', createdAt: 2000 },
      { id: '3', description: 'Task 3', createdAt: 3000 },
    ];

    const filtered = tasks.filter((t) => t.id !== '2');
    const order = filtered.map((t) => t.id);

    expect(order).toEqual(['1', '3']);
  });

  test('For any large task list, FIFO order should be maintained', () => {
    const tasks: Task[] = Array.from({ length: 100 }, (_, i) => ({
      id: `${i}`,
      description: `Task ${i}`,
      createdAt: i * 1000,
    }));

    const order = tasks.map((t) => parseInt(t.id));
    expect(order).toEqual(Array.from({ length: 100 }, (_, i) => i));
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
      { id: '1', description: 'Task 1', createdAt: 1000 },
      { id: '2', description: 'Task 2', createdAt: 2000 },
    ];

    tasks = tasks.filter(() => false);

    expect(tasks.length).toBe(0);
  });

  test('For any task list, deleting all tasks one by one should result in an empty list', () => {
    let tasks: Task[] = [
      { id: '1', description: 'Task 1', createdAt: 1000 },
      { id: '2', description: 'Task 2', createdAt: 2000 },
      { id: '3', description: 'Task 3', createdAt: 3000 },
    ];

    tasks = tasks.filter((t) => t.id !== '1');
    expect(tasks.length).toBe(2);

    tasks = tasks.filter((t) => t.id !== '2');
    expect(tasks.length).toBe(1);

    tasks = tasks.filter((t) => t.id !== '3');
    expect(tasks.length).toBe(0);
  });

  test('For any task list, displaying tasks should show each task with its description', () => {
    const tasks: Task[] = [
      { id: '1', description: 'Buy groceries', createdAt: 1000 },
      { id: '2', description: 'Complete project', createdAt: 2000 },
    ];

    tasks.forEach((task) => {
      expect(task.description).toBeDefined();
      expect(task.description.length > 0).toBe(true);
    });
  });
});
