//// [formatToPartsBigInt.ts]
// Intl.NumberFormat.formatToParts should support bigInt

// Test BigInt functions
let bigintVal: bigint = BigInt(123);

// Test Intl methods with new parameter type
new Intl.NumberFormat("fr").formatToParts(3000n);
new Intl.NumberFormat("fr").formatToParts(bigintVal);

//// [formatToPartsBigInt.js]
// Intl.NumberFormat.formatToParts should support bigInt
// Test BigInt functions
let bigintVal = BigInt(123);
// Test Intl methods with new parameter type
new Intl.NumberFormat("fr").formatToParts(3000n);
new Intl.NumberFormat("fr").formatToParts(bigintVal);
