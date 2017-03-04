/// <reference path='fourslash.ts' />


//// namespace N {
////     const enum Inaccessible { };
////     export const enum Accessible { };
////     export abstract class A {
////         abstract foo(a: Inaccessible);
////         abstract bar(): Inaccessible;
////         abstract baz(a: Accessible);
////         abstract qux(): Accessible;
////     }
//// }
////
//// class C extends N.A {[| |]}

verify.rangeAfterCodeFix(`
    abstract baz(a: Accessible) {
        throw new Error('Method not implemented.');
    }
    abstract qux(): Accessible {
        throw new Error('Method not implemented.');
    }
`)