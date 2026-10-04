// @target: es2022
// @importHelpers: true
// @module: commonjs
// @moduleResolution: classic
// @noTypesAndSymbols: true
// @filename: main.ts

declare var dec: any;

// uses __esDecorate, __runInitializers, __setFunctionName
export default (@dec class {});

// @filename: tslib.d.ts
export {}
