// @lib: es6
// @allowJs: true
// @checkJs: true
// @outDir: out
// @strict: true

// @filename: /index.js
function F() { }
!(Array.of.call(F) instanceof F);
