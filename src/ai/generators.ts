/**
 * Generates a random password string of the specified length and complexity.
 *
 * The password consists of characters based on the selected complexity level:
 * - "low": Only lowercase and uppercase letters.
 * - "medium": Letters and digits (at least one digit).
 * - "high": Letters, digits, and a selection of special characters (at least one of each type).
 *
 * Each character in the password is chosen randomly from the allowed character set.
 *
 * @param length - The desired length of the generated password. Must be a positive integer.
 * @param complexity - The complexity level of the password: "low", "medium", or "high". Defaults to "high".
 * @returns A randomly generated password string of the specified length and complexity.
 *
 * @example
 * // Generate a high complexity password of length 12
 * const password = generateRandomPassword(12, "high");
 * console.log(password); // e.g., "aB3$dEf!9Gh@"
 *
 * @example
 * // Generate a low complexity password of length 8
 * const simplePassword = generateRandomPassword(8, "low");
 * console.log(simplePassword); // e.g., "aBcDeFgH"
 *
 * @remarks
 * The function guarantees the inclusion of all required character types for the selected complexity.
 */
function generateRandomPassword(
  length: number,
  complexity: "low" | "medium" | "high" = "high"
): string {
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  const specials = "!@#$%^&*()_+[]{}|;:,.<>?";

  let chars = "";
  let required: Array<() => string> = [];

  switch (complexity) {
    case "low":
      chars = lower + upper;
      required = [
        () => lower[Math.floor(Math.random() * lower.length)],
        () => upper[Math.floor(Math.random() * upper.length)],
      ];
      break;
    case "medium":
      chars = lower + upper + digits;
      required = [
        () => lower[Math.floor(Math.random() * lower.length)],
        () => upper[Math.floor(Math.random() * upper.length)],
        () => digits[Math.floor(Math.random() * digits.length)],
      ];
      break;
    case "high":
    default:
      chars = lower + upper + digits + specials;
      required = [
        () => lower[Math.floor(Math.random() * lower.length)],
        () => upper[Math.floor(Math.random() * upper.length)],
        () => digits[Math.floor(Math.random() * digits.length)],
        () => specials[Math.floor(Math.random() * specials.length)],
      ];
      break;
  }

  if (length < required.length) {
    throw new Error(
      `Password length must be at least ${required.length} for ${complexity} complexity`
    );
  }

  // Start with required characters to guarantee complexity
  const passwordChars = required.map((fn) => fn());

  // Fill the rest randomly
  for (let i = passwordChars.length; i < length; i++) {
    passwordChars.push(chars[Math.floor(Math.random() * chars.length)]);
  }

  // Shuffle to avoid predictable placement of required chars
  for (let i = passwordChars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [passwordChars[i], passwordChars[j]] = [passwordChars[j], passwordChars[i]];
  }

  return passwordChars.join("");
}

// Control calling and logging
console.log("Low complexity password:", generateRandomPassword(10, "low"));
console.log(
  "Medium complexity password:",
  generateRandomPassword(12, "medium")
);
console.log("High complexity password:", generateRandomPassword(16, "high"));
