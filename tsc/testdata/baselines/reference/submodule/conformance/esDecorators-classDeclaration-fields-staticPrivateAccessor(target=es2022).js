//// [tests/cases/conformance/esDecorators/classDeclaration/fields/esDecorators-classDeclaration-fields-staticPrivateAccessor.ts] ////

//// [esDecorators-classDeclaration-fields-staticPrivateAccessor.ts]
declare let dec: any;

class C {
    @dec static accessor #field1 = 0;
}

@dec
class D {
    static accessor #field1 = 0;
    static {
        this.#field1;
        this.#field1 = 1;
    }
}


//// [esDecorators-classDeclaration-fields-staticPrivateAccessor.js]
"use strict";
class C {
    static #field1_accessor_storage = 0;
    static get #field1() { return C.#field1_accessor_storage; }
    static set #field1(value) { C.#field1_accessor_storage = value; }
}
class D {
    static #field1_accessor_storage = 0;
    static get #field1() { return D.#field1_accessor_storage; }
    static set #field1(value) { D.#field1_accessor_storage = value; }
    static {
        this.#field1;
        this.#field1 = 1;
    }
}
