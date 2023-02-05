// @target: es2022
// @importHelpers: true
// @module: commonjs
// @moduleResolution: classic
// @noTypesAndSymbols: true
// @filename: main.ts
export {}

declare var dec: any;

// needs: __esDecorate, __runInitializers, __setFunctionName
class C {
    @dec static #foo() {}
}

// @filename: tslib.d.ts
export {}
