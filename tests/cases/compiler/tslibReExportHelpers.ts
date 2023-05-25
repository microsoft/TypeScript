// @module: nodenext
// @experimentalDecorators: true
// @importHelpers: true

// @Filename: /node_modules/tslib/index.d.ts
export declare function __decorate(...args: any[]): any;

// @Filename: /node_modules/tslib/index.d.mts
export * from "./index.js";

// @Filename: /node_modules/tslib/package.json
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

// @Filename: /index.mts
declare var decorator: any;
@decorator
export class Foo {}
