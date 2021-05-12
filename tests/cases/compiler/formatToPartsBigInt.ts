// @target: esnext

// Intl.NumberFormat.formatToParts should support bigInt

// Test Intl methods with new parameter type
new Intl.NumberFormat("fr").formatToParts(3000n);
new Intl.NumberFormat("fr").formatToParts(BigInt(123));
