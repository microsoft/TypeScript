//// [tests/cases/conformance/esDecorators/classDeclaration/fields/esDecorators-classDeclaration-fields-staticAccessor.ts] ////

//// [esDecorators-classDeclaration-fields-staticAccessor.ts]
declare let dec: any;

const field3 = "field3";

class C {
    @dec(1) static accessor field1 = 1;
    @dec(2) static accessor ["field2"] = 2;
    @dec(3) static accessor [field3] = 3;
}

@dec
class D {
    static accessor field1 = 1;
    static {
        this.field1;
        this.field1 = 1;
    }
}

//// [esDecorators-classDeclaration-fields-staticAccessor.js]
"use strict";
var _a;
const field3 = "field3";
class C {
    static #field1_accessor_storage = 1;
    static get field1() { return C.#field1_accessor_storage; }
    static set field1(value) { C.#field1_accessor_storage = value; }
    static #_a_accessor_storage = 2;
    static get ["field2"]() { return C.#_a_accessor_storage; }
    static set ["field2"](value) { C.#_a_accessor_storage = value; }
    static #_b_accessor_storage = 3;
    static get [_a = field3]() { return C.#_b_accessor_storage; }
    static set [_a](value) { C.#_b_accessor_storage = value; }
}
class D {
    static #field1_accessor_storage = 1;
    static get field1() { return D.#field1_accessor_storage; }
    static set field1(value) { D.#field1_accessor_storage = value; }
    static {
        this.field1;
        this.field1 = 1;
    }
}
