// @target: es2022
// @importHelpers: true
// @module: commonjs
// @moduleResolution: classic
// @noTypesAndSymbols: true
// @filename: main.ts
export {};
declare var dec: any;
declare var x: any;

// uses __esDecorate, __runInitializers, __setFunctionName, __propKey
class C { [x] = @dec class {} }

// @filename: tslib.d.ts
export {}
