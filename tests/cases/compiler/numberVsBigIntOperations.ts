// @target: esnext

// Cannot mix bigints and numbers
let bigInt = 1n, num = 2;
bigInt = 1n; bigInt = 2; num = 1n; num = 2;
bigInt += 1n; bigInt += 2; num += 1n; num += 2;
bigInt -= 1n; bigInt -= 2; num -= 1n; num -= 2;
bigInt *= 1n; bigInt *= 2; num *= 1n; num *= 2;
bigInt /= 1n; bigInt /= 2; num /= 1n; num /= 2;
bigInt %= 1n; bigInt %= 2; num %= 1n; num %= 2;
bigInt **= 1n; bigInt **= 2; num **= 1n; num **= 2;
bigInt <<= 1n; bigInt <<= 2; num <<= 1n; num <<= 2;
bigInt >>= 1n; bigInt >>= 2; num >>= 1n; num >>= 2;
bigInt &= 1n; bigInt &= 2; num &= 1n; num &= 2;
bigInt ^= 1n; bigInt ^= 2; num ^= 1n; num ^= 2;
bigInt |= 1n; bigInt |= 2; num |= 1n; num |= 2;
bigInt = 1n + 2n; num = 1 + 2; 1 + 2n; 1n + 2;
bigInt = 1n - 2n; num = 1 - 2; 1 - 2n; 1n - 2;
bigInt = 1n * 2n; num = 1 * 2; 1 * 2n; 1n * 2;
bigInt = 1n / 2n; num = 1 / 2; 1 / 2n; 1n / 2;
bigInt = 1n % 2n; num = 1 % 2; 1 % 2n; 1n % 2;
bigInt = 1n ** 2n; num = 1 ** 2; 1 ** 2n; 1n ** 2;
bigInt = 1n & 2n; num = 1 & 2; 1 & 2n; 1n & 2;
bigInt = 1n | 2n; num = 1 | 2; 1 | 2n; 1n | 2;
bigInt = 1n ^ 2n; num = 1 ^ 2; 1 ^ 2n; 1n ^ 2;
bigInt = 1n << 2n; num = 1 << 2; 1 << 2n; 1n << 2;
bigInt = 1n >> 2n; num = 1 >> 2; 1 >> 2n; 1n >> 2;

// Plus should still coerce to strings
let str: string;
str = "abc" + 123; str = "abc" + 123n; str = 123 + "abc"; str = 123n + "abc";

// Unary operations allowed on bigints and numbers
bigInt = bigInt++; bigInt = ++bigInt; num = num++; num = ++num;
bigInt = bigInt--; bigInt = --bigInt; num = num--; num = --num;
bigInt = -bigInt; num = -num;
bigInt = ~bigInt; num = ~num;

// Number-only operations
bigInt >>>= 1n; num >>>= 2;
bigInt = bigInt >>> 1n; num = num >>> 2;
num = +bigInt; num = +num; num = +"3";

// Comparisons can be mixed
let result: boolean;
result = bigInt > num;
result = bigInt >= num;
result = bigInt < num;
result = bigInt <= num;

// Trying to compare for equality is likely an error (since 1 == "1" is disallowed)
result = bigInt == num;
result = bigInt != num;
result = bigInt === num;
result = bigInt !== num;

// Types of arithmetic operations on other types
num = "3" & 5; num = 2 ** false; // should error, but infer number
"3" & 5n; 2n ** false; // should error, result in any
num = ~"3"; num = -false; // should infer number
let bigIntOrNumber: bigint | number;
bigIntOrNumber + bigIntOrNumber; // should error, result in any
bigIntOrNumber << bigIntOrNumber; // should error, result in any
if (typeof bigIntOrNumber === "bigint") {
    // Allowed, as type is narrowed to bigint
    bigIntOrNumber = bigIntOrNumber << bigIntOrNumber;
}
if (typeof bigIntOrNumber === "number") {
    // Allowed, as type is narrowed to number
    bigIntOrNumber = bigIntOrNumber << bigIntOrNumber;
}
+bigIntOrNumber; // should error, result in number
~bigIntOrNumber; // should infer number | bigint
bigIntOrNumber++; // should infer number | bigint
++bigIntOrNumber; // should infer number | bigint
let anyValue: any;
anyValue + anyValue; // should infer any
anyValue >>> anyValue; // should infer number
anyValue ^ anyValue; // should infer number
+anyValue; // should infer number
-anyValue; // should infer number
anyValue--; // should infer number
--anyValue; // should infer number

// Distinguishing numbers from bigints with typeof
const isBigInt: (x: 0n | 1n) => bigint = (x: 0n | 1n) => x;
const isNumber: (x: 0 | 1) => number = (x: 0 | 1) => x;
const zeroOrBigOne: 0 | 1n;
if (typeof zeroOrBigOne === "bigint") isBigInt(zeroOrBigOne);
else isNumber(zeroOrBigOne);

// Distinguishing truthy from falsy
const isOne = (x: 1 | 1n) => x;
if (zeroOrBigOne) isOne(zeroOrBigOne);
const bigZeroOrOne: 0n | 1;
if (bigZeroOrOne) isOne(bigZeroOrOne);