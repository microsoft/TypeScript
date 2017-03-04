/// <reference path='fourslash.ts' />

//// namespace N {
////     type Inaccessible = { a: string, y: number };
////     type Accessible = { a: string, y: number };
////     export abstract class A {
////         abstract x: keyof Inaccessible;
////         abstract y: keyof Accessible;
////     }
//// }
//// class C extends N.A {[| |]}

verify.rangeAfterCodeFix(`
    x: "a" | "y";
    y: "a" | "y";
`);