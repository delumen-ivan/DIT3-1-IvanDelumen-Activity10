export function validateTaskInput(input: string): { isValid: boolean; error?: string } {
  if (!input || input.trim().length === 0) {
    return {
      isValid: false,
      error: 'Task description cannot be empty',
    };
  }
  return { isValid: true };
}
