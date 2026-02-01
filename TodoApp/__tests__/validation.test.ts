import { validateTaskInput } from '../utils/validation';

describe('Input Validation', () => {
  // Property 2: Whitespace Tasks Are Invalid
  // Validates: Requirements 1.2
  test('For any string composed entirely of whitespace characters, attempting to add it to the task list should be rejected', () => {
    const whitespaceInputs = [
      '',
      ' ',
      '  ',
      '\t',
      '\n',
      '\r',
      '   \t\n  ',
    ];

    whitespaceInputs.forEach((input) => {
      const result = validateTaskInput(input);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  test('For any valid non-empty, non-whitespace task description, validation should pass', () => {
    const validInputs = [
      'Buy groceries',
      'Complete project',
      'Call mom',
      'a',
      '123',
      'Task with special chars !@#$%',
    ];

    validInputs.forEach((input) => {
      const result = validateTaskInput(input);
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });
  });

  test('Empty string should be rejected', () => {
    const result = validateTaskInput('');
    expect(result.isValid).toBe(false);
  });

  test('String with only spaces should be rejected', () => {
    const result = validateTaskInput('     ');
    expect(result.isValid).toBe(false);
  });

  test('String with leading/trailing whitespace but content should be accepted', () => {
    const result = validateTaskInput('  valid task  ');
    expect(result.isValid).toBe(true);
  });
});
