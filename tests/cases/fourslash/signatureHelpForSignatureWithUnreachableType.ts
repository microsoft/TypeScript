/// <reference path="fourslash.ts" />

// @Filename: /node_modules/foo/node_modules/bar/index.d.ts
////export interface SomeType {
////    x?: number;
////}
// @Filename: /node_modules/foo/index.d.ts
////import { SomeType } from "bar";
////export function func<T extends SomeType>(param: T): void;
////export function func<T extends SomeType>(param: T, other: T): void;
// @Filename: /usage.ts
////import { func } from "foo";
////func({/*1*/});

verify.signatureHelp({
    marker: "1",
    overloadsCount: 2,
    text: "func(param: {}): void"
});