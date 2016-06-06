// @Filename: declarations.d.ts
declare module "foo*baz" {
    export function foo(n: number): void;
}
// Augmentations still work
declare module "foo*baz" {
    export const baz: number;
}

// Should be an error
declare module "too*many*asterisks" { }

// Longest prefix wins
declare module "foos*" {
    export const foos: number;
}

// @Filename: user.ts
///<reference path="declarations.d.ts" />
import {foo, baz} from "foobarbaz";
foo(baz);

import {foos} from "foosball";
