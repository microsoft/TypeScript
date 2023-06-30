//// [tests/cases/compiler/importAssertionNonstring.ts] ////

//// [mod.mts]
import * as thing1 from "./mod.mjs" assert {field: 0};

import * as thing2 from "./mod.mjs" assert {field: `a`};

import * as thing3 from "./mod.mjs" assert {field: /a/g};

import * as thing4 from "./mod.mjs" assert {field: ["a"]};

import * as thing5 from "./mod.mjs" assert {field: { a: 0 }};

import * as thing6 from "./mod.mjs" assert {type: "json", field: 0..toString()}

//// [mod.mjs]
export {};
