// @lib: es2015,{ "replace": "dom", "with": "./fake-dom.d.ts" }
// @Filename: /fake-dom.d.ts
interface ABC {}

// @Filename: index.ts
/// <reference lib="dom" />
const a: ABC = {}

// This should raise ebcause 'window' is not set in the replacement for DOM
window