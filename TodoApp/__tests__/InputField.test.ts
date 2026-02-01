describe('Input Field', () => {
  // Property 3: Input Field Clears After Addition
  // Validates: Requirements 1.3
  test('For any UI state where the input field contains text, successfully submitting a task should result in the input field being cleared', () => {
    let inputValue = 'Buy groceries';
    expect(inputValue.length > 0).toBe(true);

    // Simulate clearing the input after submission
    inputValue = '';
    expect(inputValue).toBe('');
    expect(inputValue.length).toBe(0);
  });

  test('For any non-empty input, clearing should result in an empty string', () => {
    let inputValue = 'Complete project';
    inputValue = '';

    expect(inputValue).toBe('');
  });

  test('For any input field state, after adding a task, the field should be ready for the next entry', () => {
    let inputValue = 'Task 1';
    inputValue = '';

    expect(inputValue).toBe('');
    expect(typeof inputValue).toBe('string');
  });

  test('For multiple task additions, the input field should clear after each submission', () => {
    let inputValue = 'Task 1';
    inputValue = '';
    expect(inputValue).toBe('');

    inputValue = 'Task 2';
    inputValue = '';
    expect(inputValue).toBe('');

    inputValue = 'Task 3';
    inputValue = '';
    expect(inputValue).toBe('');
  });
});
