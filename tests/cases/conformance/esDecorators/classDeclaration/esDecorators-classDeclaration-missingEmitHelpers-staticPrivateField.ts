// @target: es2022
// @importHelpers: true
// @module: commonjs
// @moduleResolution: classic
// @noTypesAndSymbols: true
// @filename: main.ts
export {}

declare var dec: any;

// needs: __esDecorate, __runInitializers
class C {
    @dec static #x: any;
}

// @filename: tslib.d.ts
export {}
