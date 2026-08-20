// @module: preserve
// @target: es2022
// @importHelpers: true


// @Filename: /a.mts
declare var dec: any

@dec()
export class A {}

// @Filename: /b.cts
declare var dec: any

@dec()
class B {}
export {};

// @Filename: /c.ts
declare var dec: any

@dec()
export class C {}

// @filename: /package.json
{
    "type": "module"
}

// @filename: /node_modules/tslib/package.json
{
    "name": "tslib",
    "main": "tslib.js",
    "types": "tslib.d.ts"
}

// @filename: /node_modules/tslib/tslib.d.ts
export declare function __esDecorate(...args: any[]): any;
export declare function __runInitializers(...args: any[]): any;
