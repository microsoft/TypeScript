// @noTypesAndSymbols: true
// @filename: /tsconfig.json
{
    "compilerOptions": {
        "target": "es2015",
        "module": "commonjs",
        "importHelpers": true,
    }
}

// @filename: /main.ts
import greet from "./dependency";

export const message = greet("world");

// @filename: /combined.ts
import greet, * as dependency from "./dependency";

export const message = greet("world");
export const namespaceMessage = dependency.default("namespace");

// @filename: /dependency.ts
export default function greet(name: string) {
    return `hello, ${name}`;
}

// @filename: /node_modules/tslib/package.json
{
    "name": "tslib",
    "main": "tslib.js",
    "typings": "tslib.d.ts"
}

// @filename: /node_modules/tslib/tslib.d.ts
export const notAHelper: any;

// @filename: /node_modules/tslib/tslib.js
module.exports.notAHelper = 3;
