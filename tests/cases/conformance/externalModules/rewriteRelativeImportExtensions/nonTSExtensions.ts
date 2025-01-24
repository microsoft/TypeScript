// @module: node18,nodenext
// @rewriteRelativeImportExtensions: true
// @allowArbitraryExtensions: true
// @resolveJsonModule: true
// @noTypesAndSymbols: true

// @Filename: example.json
{}

// @Filename: styles.d.css.ts
export {};

// @Filename: index.mts
import {} from "./example.json" with { type: "json" }; // Ok
import {} from "./styles.css"; // Ok