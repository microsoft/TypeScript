// @runExternalCode: true
// @module: preserve, commonjs
// @disableDynamicImportExtensionRewriting: false, true

// @Filename: /tsconfig.json
{
    "compilerOptions": {
        "target": "esnext",
        "rewriteRelativeImportExtensions": true,
        "allowJs": true,
        "checkJs": true,
        "outDir": "/dist"
    },
    "contentMappers": [{
        "package": "mapper",
        "extensions": [".toml"],
        "include": ["**/*.toml"],
        "outputExtensions": { ".toml": ".js" }
    }]
}

// @Filename: /node_modules/mapper/package.json
{
    "name": "mapper",
    "version": "1.0.0",
    "typescript": { "contentMapper": { "exec": ["compiler-test-mapper"] } }
}

// @Filename: /data.toml
export const data = 1;

// @Filename: /main.ts
declare const path: string;
export const dynamic = import(path);
export const template = import(`./${path}.toml`);
export const parenthesized = import(("./data.toml"));
export const literal = import("./data.toml");
export const literalTemplate = import(`./data.toml`);
declare function require(path: string): unknown;
export const tsRequire = require(path);

// @Filename: /require.js
/** @type {string} */
const path = "./data.toml";
export const dynamic = import(path);
export const required = require(path);
export const template = require(`./${path}.toml`);
export const literal = require("./data.toml");
export const literalTemplate = require(`./data.toml`);

// @Filename: /globals.d.ts
declare function require(path: string): unknown;
