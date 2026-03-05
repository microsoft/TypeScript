//// [tests/cases/conformance/esDecorators/classDeclaration/classThisReference/esDecorators-classDeclaration-classThisReference.ts] ////

//// [esDecorators-classDeclaration-classThisReference.ts]
declare let dec: any;

@dec
class C {
    static { this; }
    static x: any = this;
    static accessor a: any = this;
    static m() { this; }
    static get g() { return this; }
}


//// [esDecorators-classDeclaration-classThisReference.js]
"use strict";
class C {
    static { this; }
    static x = this;
    static #a_accessor_storage = this;
    static get a() { return C.#a_accessor_storage; }
    static set a(value) { C.#a_accessor_storage = value; }
    static m() { this; }
    static get g() { return this; }
}
