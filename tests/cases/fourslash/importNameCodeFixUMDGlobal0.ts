/// <reference path="fourslash.ts" />

// @Filename: a/f1.ts
//// [|export function test() { };
//// bar1/*0*/.bar;|]

// @Filename: a/foo.d.ts
//// export declare function bar(): number;
//// export as namespace bar1; 

verify.importFixAtPosition([
`import * as bar1 from "./foo";

export function test() { };
bar1.bar;`
]);