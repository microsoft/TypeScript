// @allowJs: true
// @checkJs: true
// @strict: true
// @noEmit: true

// @Filename: /a.js
/** @param {...number} a */
function f(a) {
    a; // number | undefined
    // Ideally this would be a number. But currently checker.ts has only one `argumentsSymbol`, so it's `any`.
    arguments[0];
}
f([1, 2]); // Error
f(1, "2"); // Error
f(1, 2);
