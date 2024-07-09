// @allowJs: true
// @noEmit: true

// @filename: foo.js
/**
 * @param a
 * @param b
 * @param c
 */
function f(a, b, c) { }


// @filename: bar.ts
f(); // Error
f(1); // Error
f(1, 2); // Error

f(1, 2, 3); // OK
