// @strictNullChecks: true

var anyReplacer = (k) => undefined;
var failsafeReplacer = (k) => null;
var value = null;
JSON.stringify(value, undefined, 2);
JSON.stringify(value, null, 2);
JSON.stringify(value, ["a", 1], 2);
JSON.stringify(value, anyReplacer, 2);
JSON.stringify(value, failsafeReplacer, 2);
JSON.stringify(value, undefined, 2);
JSON.stringify(undefined);
JSON.stringify(undefined, anyReplacer);
JSON.stringify(undefined, failsafeReplacer);
JSON.stringify(() => "", anyReplacer);
JSON.stringify(() => "", failsafeReplacer);
JSON.stringify({});
JSON.stringify({}, anyReplacer);
JSON.stringify({}, failsafeReplacer);
JSON.stringify(new Object());
JSON.stringify(new Object(), anyReplacer);
JSON.stringify(new Object(), failsafeReplacer);
var anyValue: any;
JSON.stringify(anyValue);
JSON.stringify(anyValue, anyReplacer);
JSON.stringify(anyValue, failsafeReplacer);
