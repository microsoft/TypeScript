// @allowJs: true
// @checkJs: true
// @noEmit: true

// @Filename: /a.js
/** @param {...number} a */
function f(a) {
    // Ideally this would be a number. But currently checker.ts has only one `argumentsSymbol`.
    arguments[0];
}
f([1, 2]); // Error
f(1, "2"); // Error
f(1, 2);
