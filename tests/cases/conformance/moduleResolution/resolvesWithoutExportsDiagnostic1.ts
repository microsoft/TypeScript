// @module: preserve
// @moduleResolution: bundler,node16
// @strict: true
// @noTypesAndSymbols: true
// @noEmit: true
// @traceResolution: true

// @Filename: /node_modules/foo/package.json
{
    "name": "foo",
    "version": "1.0.0",
    "main": "index.js",
    "types": "index.d.ts",
    "exports": {
        ".": {
            "import": "./index.mjs",
            "require": "./index.js"
        }
    }
}

// @Filename: /node_modules/foo/index.js
module.exports = { foo: 1 };

// @Filename: /node_modules/foo/index.mjs
export const foo = 1;

// @Filename: /node_modules/foo/index.d.ts
export declare const foo: number;

// @Filename: /node_modules/@types/bar/package.json
{
    "name": "@types/bar",
    "version": "1.0.0",
    "types": "index.d.ts",
    "exports": {
        ".": {
            "require": "./index.d.ts"
        }
    }
}

// @Filename: /node_modules/@types/bar/index.d.ts
export declare const bar: number;

// @Filename: /node_modules/bar/package.json
{
    "name": "bar",
    "version": "1.0.0",
    "main": "index.js",
    "exports": {
        ".": {
            "import": "./index.mjs",
            "require": "./index.js"
        }
    }
}

// @Filename: /node_modules/bar/index.js
module.exports = { bar: 1 };

// @Filename: /node_modules/bar/index.mjs
export const bar = 1;

// @Filename: /index.mts
import { foo } from "foo";
import { bar } from "bar";