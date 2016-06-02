//// [tests/cases/conformance/ambient/ambientDeclarationsPatterns.ts] ////

//// [declarations.d.ts]
declare module "foo*baz" {
    export function foo(n: number): void;
}

// Should be an error
declare module "too*many*asterisks" { }

// Longest prefix wins
declare module "foos*" {
    export const foos: number;
}

//// [user.ts]
///<reference path="declarations.d.ts" />
import {foo} from "foobarbaz";
foo(0);

import {foos} from "foosball";


//// [user.js]
"use strict";
///<reference path="declarations.d.ts" />
var foobarbaz_1 = require("foobarbaz");
foobarbaz_1.foo(0);
