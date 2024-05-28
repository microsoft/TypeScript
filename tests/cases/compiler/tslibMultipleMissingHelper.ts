// @filename: /tsconfig.json
{
    "compilerOptions": {
        "strict": true,
        "target": "ES2016",
        "importHelpers": true,
        "module": "commonjs",
    }
}

// @filename: /package1/index.ts
export {};
async function foo(): Promise<void> {}
async function bar(): Promise<void> {}

// @filename: /package1/node_modules/tslib/package.json
{
    "name": "tslib",
    "main": "tslib.js",
    "typings": "tslib.d.ts"
}

// @filename: /package1/node_modules/tslib/tslib.d.ts
export const notAHelper: any;

// @filename: /package1/node_modules/tslib/tslib.js
module.exports.notAHelper = 3;

// @filename: /package2/index.ts
export {};
async function foo(): Promise<void> {}

// @filename: /package2/node_modules/tslib/package.json
{
    "name": "tslib",
    "main": "tslib.js",
    "typings": "tslib.d.ts"
}

// @filename: /package2/node_modules/tslib/tslib.d.ts
export const notAHelper: any;

// @filename: /package2/node_modules/tslib/tslib.js
module.exports.notAHelper = 3;