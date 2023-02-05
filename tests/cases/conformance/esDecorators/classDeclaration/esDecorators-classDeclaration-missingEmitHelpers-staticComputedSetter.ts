// @target: es2022
// @importHelpers: true
// @module: commonjs
// @moduleResolution: classic
// @noTypesAndSymbols: true
// @filename: main.ts
export {}

declare var dec: any;
declare var x: any;

// needs: __esDecorate, __runInitializers, __propKey
class C {
    @dec static set [x](value: number) { }
}

// @filename: tslib.d.ts
export {}
