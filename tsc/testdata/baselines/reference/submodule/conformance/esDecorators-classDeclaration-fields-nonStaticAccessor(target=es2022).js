//// [tests/cases/conformance/esDecorators/classDeclaration/fields/esDecorators-classDeclaration-fields-nonStaticAccessor.ts] ////

//// [esDecorators-classDeclaration-fields-nonStaticAccessor.ts]
declare let dec: any;

const field3 = "field3";

class C {
    @dec(1) accessor field1 = 1;
    @dec(2) accessor ["field2"] = 2;
    @dec(3) accessor [field3] = 3;
}


//// [esDecorators-classDeclaration-fields-nonStaticAccessor.js]
"use strict";
var _a;
const field3 = "field3";
class C {
    #field1_accessor_storage = 1;
    get field1() { return this.#field1_accessor_storage; }
    set field1(value) { this.#field1_accessor_storage = value; }
    #_a_accessor_storage = 2;
    get ["field2"]() { return this.#_a_accessor_storage; }
    set ["field2"](value) { this.#_a_accessor_storage = value; }
    #_b_accessor_storage = 3;
    get [_a = field3]() { return this.#_b_accessor_storage; }
    set [_a](value) { this.#_b_accessor_storage = value; }
}
