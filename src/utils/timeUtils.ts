/**
 * Parses a string input into a non-negative integer representing seconds.
 * Returns 0 if the input is invalid or empty.
 *
 * @param input - A string that may contain numeric characters
 * @returns A non-negative number (>= 0)
 */
export function parseDelayInSeconds(input: string): number {
  const numericOnly = input.replace(/[^0-9]/g, "");
  const parsed = parseInt(numericOnly, 10);

  return isNaN(parsed) ? 0 : Math.max(0, parsed);
}
