// @importHelpers: true
// @target: es2017
// @module: commonjs,system,amd,es2015,es2020
// @esModuleInterop: true,false
// @filename: a.ts
export class A { }

// @filename: b.ts
export * as a from "./a";

// @filename: tslib.d.ts
declare module "tslib" {
    function __importStar(m: any): void;
}