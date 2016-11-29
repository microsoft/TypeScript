/// <reference path='fourslash.ts' />

//// namespace N1 {
////     export interface I1 {
////         f1():string;
////     }
//// }
//// interface I1 {
////     f1();
//// }
////
//// class C1 implements N1.I1 {[|
//// |]}

let passcode = "secret passcode";

abstract class A {
    private _a: string;

    abstract get a(): string;
    abstract set a(newName: string);
}

class B extends A {
    a: string;
}


abstract class AA {
    private _a: string;

    abstract get a(): string {
        return this._a;
    }

    abstract set a(newName: string) {
            this._a = newName;
    }
}

verify.rangeAfterCodeFix(`f1(): string{
    throw new Error('Method not implemented.');
}
`);
