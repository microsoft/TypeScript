//// [tests/cases/compiler/tslibReExportHelpers.ts] ////

//// [index.d.ts]
export declare function __decorate(...args: any[]): any;

//// [index.d.mts]
export * from "./index.js";

//// [package.json]
{
    "name": "tslib",
    "version": "1.0.0",
    "types": "index.d.ts",
    "exports": {
        ".": {
            "types": {
                "import": "./index.d.mts",
                "default": "./index.d.ts"
            }
        }
    }
}

//// [index.mts]
declare var decorator: any;
@decorator
export class Foo {}


//// [index.mjs]
import { __decorate } from "tslib";
let Foo = class Foo {
};
Foo = __decorate([
    decorator
], Foo);
export { Foo };
