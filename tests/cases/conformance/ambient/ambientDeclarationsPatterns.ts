// @Filename: declarations.d.ts
declare module "foo*baz" {
    export function foo(n: number): void;
}

// Should be an error
declare module "too*many*asterisks" { }

// Longest prefix wins
declare module "foos*" {
    export const foos: number;
}

// @Filename: user.ts
///<reference path="declarations.d.ts" />
import {foo} from "foobarbaz";
foo(0);

import {foos} from "foosball";
