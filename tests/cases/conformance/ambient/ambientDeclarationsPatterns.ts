// @Filename: declarations.d.ts
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

// @Filename: user.ts
///<reference path="declarations.d.ts" />
import {foo, baz} from "foobarbaz";
foo(baz);

import {foos} from "foosball";
foo(foos);

// Works with relative file name
import fileText from "./file!text";
foo(fileText);
