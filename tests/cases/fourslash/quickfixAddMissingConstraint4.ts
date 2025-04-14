/// <reference path="fourslash.ts" />

// @filename: /bar.ts
////export type Bar = Record<string, string>
////export function bar<T extends Bar>(obj: { prop: T }) {}

// @filename: /foo.ts
////import { bar } from "./bar";
////
////export function foo<T>(x: T) {
////    bar({ prop: x/**/ })
////}

goTo.marker("");
verify.codeFix({
    index: 0,
    description: "Add `extends` constraint.",
    newFileContent:
`import { bar } from "./bar";

export function foo<T extends Bar>(x: T) {
    bar({ prop: x })
}`
});
