//// [tests/cases/conformance/esDecorators/classDeclaration/fields/esDecorators-classDeclaration-fields-nonStaticPrivateAccessor.ts] ////

//// [esDecorators-classDeclaration-fields-nonStaticPrivateAccessor.ts]
declare let dec: any;

class C {
    @dec accessor #field1 = 0;
}


//// [esDecorators-classDeclaration-fields-nonStaticPrivateAccessor.js]
"use strict";
class C {
    #field1_accessor_storage = 0;
    get #field1() { return this.#field1_accessor_storage; }
    set #field1(value) { this.#field1_accessor_storage = value; }
}
