//// [tests/cases/conformance/ambient/ambientDeclarationsPatterns.ts] ////

//// [declarations.d.ts]
declare module "foo*baz" {
    export function foo(s: string): void;
}
// Augmentations still work
declare module "foo*baz" {
    export const baz: string;
}

// Longest prefix wins
declare module "foos*" {
    export const foos: string;
}

declare module "*!text" {
    const x: string;
    export default x;
}

//// [user.ts]
///<reference path="declarations.d.ts" />
import {foo, baz} from "foobarbaz";
foo(baz);

import {foos} from "foosball";
foo(foos);

// Works with relative file name
import fileText from "./file!text";
foo(fileText);


//// [user.js]
"use strict";
exports.__esModule = true;
///<reference path="declarations.d.ts" />
var foobarbaz_1 = require("foobarbaz");
(0, foobarbaz_1.foo)(foobarbaz_1.baz);
var foosball_1 = require("foosball");
(0, foobarbaz_1.foo)(foosball_1.foos);
// Works with relative file name
var file_text_1 = require("./file!text");
(0, foobarbaz_1.foo)(file_text_1["default"]);
