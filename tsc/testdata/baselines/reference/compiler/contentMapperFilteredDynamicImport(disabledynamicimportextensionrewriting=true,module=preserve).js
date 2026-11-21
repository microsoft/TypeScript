//// [tests/cases/compiler/contentMapperFilteredDynamicImport.ts] ////

//// [package.json]
{
    "name": "mapper",
    "version": "1.0.0",
    "typescript": { "contentMapper": { "exec": ["compiler-test-mapper"] } }
}

//// [data.toml]
const __VERSION = "1.0.0";
export const data = 1;

//// [main.ts]
declare const path: string;
export const dynamic = import(path);
export const template = import(`./${path}.toml`);
export const parenthesized = import(("./data.toml"));
export const literal = import("./data.toml");
export const literalTemplate = import(`./data.toml`);
declare function require(path: string): unknown;
export const tsRequire = require(path);

//// [require.js]
/** @type {string} */
const path = "./data.toml";
export const dynamic = import(path);
export const required = require(path);
export const template = require(`./${path}.toml`);
export const literal = require("./data.toml");
export const literalTemplate = require(`./data.toml`);

//// [globals.d.ts]
declare function require(path: string): unknown;


//// [main.js]
export const dynamic = import(path);
export const template = import(`./${path}.toml`);
export const parenthesized = import(("./data.toml"));
export const literal = import("./data.js");
export const literalTemplate = import(`./data.js`);
export const tsRequire = require(path);
//// [require.js]
/** @type {string} */
const path = "./data.toml";
export const dynamic = import(path);
export const required = require(path);
export const template = require(`./${path}.toml`);
export const literal = require("./data.js");
export const literalTemplate = require(`./data.js`);
