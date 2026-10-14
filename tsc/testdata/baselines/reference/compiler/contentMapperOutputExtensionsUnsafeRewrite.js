//// [tests/cases/compiler/contentMapperOutputExtensionsUnsafeRewrite.ts] ////

//// [package.json]
{
    "name": "mapper",
    "version": "1.0.0",
    "typescript": { "contentMapper": { "exec": ["compiler-test-mapper"] } }
}

//// [index.ts]
export const directory = 1;

//// [actual.astro]
const __VERSION = "1.0.0";
export const actual = 1;

//// [ambient.d.astro.ts]
export const ambient: number;

//// [main.ts]
import { directory } from "./components.astro";
import { actual } from "./actual.astro";
import { ambient } from "./ambient.astro";
import { actual as aliased } from "alias";
console.log(directory, actual, ambient, aliased);


//// [index.js]
export const directory = 1;
//// [main.js]
import { directory } from "./components.js";
import { actual } from "./actual.js";
import { ambient } from "./ambient.js";
import { actual as aliased } from "alias";
console.log(directory, actual, ambient, aliased);
