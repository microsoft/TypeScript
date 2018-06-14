/// <reference path="fourslash.ts" />

// @Filename: exporter.ts
////export interface Thing {}
////export const Foo: () => Thing = null as any;

// @Filename: usage.ts
////import {Foo} from "./exporter"
////function f(p = Foo()): void {}
////f(/*1*/

verify.signatureHelp({
    marker: "1",
    text: "f(p?: Thing): void"
});