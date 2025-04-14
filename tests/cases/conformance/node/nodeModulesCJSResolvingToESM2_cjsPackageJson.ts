// @noEmit: true
// @noTypesAndSymbols: true
// @module: node16
// @allowJs: true
// @checkJs: true
// @jsx: preserve

// @Filename: /package.json
{ "type": "commonjs" }

// @Filename: /module.mts
export {};

// @Filename: /tsExtension.ts
import {} from "./module.mjs";

// @Filename: /jsExtension.js
import {} from "./module.mjs";

// @Filename: /ctsExtension.cts
import {} from "./module.mjs";

// @Filename: /tsxExtension.tsx
import {} from "./module.mjs";
