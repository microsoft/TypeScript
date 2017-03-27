/// <reference path='fourslash.ts' />

//// namespace N {
////     type Inaccessible = { i: Inaccessible };
////     export type AccessibleGeneric<T> = number;
////     export abstract class A {
////         abstract x: Inaccessible;
////         abstract y: AccessibleGeneric<Inaccessible>;
////         abstract z: AccessibleGeneric<number>;
////     }
//// }
//// class C extends N.A {[| |]}

// TODO: (aozgaa) Figure out how to avoid resolving aliases and doing checks on the aliases themselves.
verify.rangeAfterCodeFix(`
    y: number;
    z: number;
`);
