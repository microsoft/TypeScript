// @target: es2016

// Sample from
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/getCanonicalLocales
console.log(Intl.getCanonicalLocales('EN-US'));
// Expected output: Array ["en-US"]

console.log(Intl.getCanonicalLocales(['EN-US', 'Fr']));
// Expected output: Array ["en-US", "fr"]

try {
  Intl.getCanonicalLocales('EN_US');
} catch (err) {
  console.log(err.toString());
  // Expected output: RangeError: invalid language tag: EN_US
}
