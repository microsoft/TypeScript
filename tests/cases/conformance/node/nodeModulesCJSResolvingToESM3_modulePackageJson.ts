// @noEmit: true
// @noTypesAndSymbols: true
// @module: node16
// @allowJs: true
// @checkJs: true

// @Filename: /package.json
{ "type": "module" }

// @Filename: /module.mts
export {};

// @Filename: /tsExtension.ts
import {} from "./module.mjs";

// @Filename: /jsExtension.js
import {} from "./module.mjs";

// @Filename: /ctsExtension.cts
import {} from "./module.mjs";