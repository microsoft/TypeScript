// @target: es2022
// @importHelpers: true
// @module: commonjs
// @moduleResolution: classic
// @noTypesAndSymbols: true
// @filename: main.ts

declare var dec: any;

// uses: __esDecorate, __runInitializers
export const C = @dec class C {};

// @filename: tslib.d.ts
export {}
