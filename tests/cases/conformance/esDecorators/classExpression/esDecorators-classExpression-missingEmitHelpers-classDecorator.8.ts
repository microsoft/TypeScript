// @target: es2022
// @importHelpers: true
// @module: commonjs
// @moduleResolution: classic
// @noTypesAndSymbols: true
// @filename: main.ts
export {};
declare var dec: any;

var C;

// uses __esDecorate, __runInitializers, __setFunctionName
({ C = @dec class {} } = {});

// @filename: tslib.d.ts
export {}
