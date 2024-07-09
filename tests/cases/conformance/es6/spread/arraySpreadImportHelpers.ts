// @target: es5
// @importHelpers: true
// @isolatedModules: true
// @noTypesAndSymbols: true
// @noEmit: true
// @filename: main.ts

export {};
const k = [1, , 2];
const o = [3, ...k, 4];

// @filename: tslib.d.ts
// this is a pre-TS4.4 versions of emit helper, which always forced array packing
declare module "tslib" {
    function __spreadArray(to: any[], from: any[]): any[];
}
