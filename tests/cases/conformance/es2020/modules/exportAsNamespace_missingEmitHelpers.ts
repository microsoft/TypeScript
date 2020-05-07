// @module: commonjs
// @importHelpers: true
// @noTypesAndSymbols: true

// @Filename: a.ts
export {}

// @Filename: b.ts
export * as ns from './a'; // Error
