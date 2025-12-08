//// [tests/cases/conformance/node/nodeModulesPackageImportsRootWildcard.ts] ////

//// [package.json]
{
    "name": "package",
    "private": true,
    "type": "module",
    "imports": {
        "#/*": "./src/*"
    }
}
//// [foo.ts]
export const foo = "foo";
//// [bar.ts]
export const bar = "bar";
//// [baz.ts]
export const baz = "baz";
//// [index.ts]
// esm format file
import { foo } from "#/foo.js";
import { bar } from "#/features/bar.js";
import { baz } from "#/nested/deep/baz.js";
foo;
bar;
baz;
//// [index.mts]
// esm format file
import { foo } from "#/foo.js";
import { bar } from "#/features/bar.js";
import { baz } from "#/nested/deep/baz.js";
foo;
bar;
baz;
//// [index.cts]
// cjs format file
import { foo } from "#/foo.js";
import { bar } from "#/features/bar.js";
import { baz } from "#/nested/deep/baz.js";
foo;
bar;
baz;


//// [foo.js]
export const foo = "foo";
//// [bar.js]
export const bar = "bar";
//// [baz.js]
export const baz = "baz";
//// [index.js]
// esm format file
import { foo } from "#/foo.js";
import { bar } from "#/features/bar.js";
import { baz } from "#/nested/deep/baz.js";
foo;
bar;
baz;
//// [index.mjs]
// esm format file
import { foo } from "#/foo.js";
import { bar } from "#/features/bar.js";
import { baz } from "#/nested/deep/baz.js";
foo;
bar;
baz;
//// [index.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// cjs format file
const foo_js_1 = require("#/foo.js");
const bar_js_1 = require("#/features/bar.js");
const baz_js_1 = require("#/nested/deep/baz.js");
foo_js_1.foo;
bar_js_1.bar;
baz_js_1.baz;


//// [foo.d.ts]
export declare const foo = "foo";
//// [bar.d.ts]
export declare const bar = "bar";
//// [baz.d.ts]
export declare const baz = "baz";
//// [index.d.ts]
export {};
//// [index.d.mts]
export {};
//// [index.d.cts]
export {};
