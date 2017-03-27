/// <reference path='fourslash.ts' />


//// namespace N {
////     class Inaccessible { a: number };
////     export class Accessible { b: string };
////     export abstract class A {
////         abstract x(a: Inaccessible);
////         abstract y(): Inaccessible;
////         abstract z(a: Accessible);
////         abstract t<T extends Accessible>(): any;
////         abstract u<T extends Inaccessible>(): any;
////         abstract v<T extends Accessible>(): T;
////         abstract w<T extends Inaccessible>(): T;
////     }
//// }
////
//// class C extends N.A {[| |]}

verify.rangeAfterCodeFix(`
    z(a: N.Accessible) {
        throw new Error('Method not implemented.');
    }
    t<T extends N.Accessible>() {
        throw new Error('Method not implemented.');
    }
    v<T extends N.Accessible>(): T {
        throw new Error('Method not implemented.');
    }
`);
