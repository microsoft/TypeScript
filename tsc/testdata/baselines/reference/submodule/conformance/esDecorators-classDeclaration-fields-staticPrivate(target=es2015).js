//// [tests/cases/conformance/esDecorators/classDeclaration/fields/esDecorators-classDeclaration-fields-staticPrivate.ts] ////

//// [esDecorators-classDeclaration-fields-staticPrivate.ts]
declare let dec: any;

class C {
    @dec static #field1 = 0;
}

@dec
class D {
    static #field1 = 0;
    static {
        this.#field1;
        this.#field1 = 1;
    }
}


//// [esDecorators-classDeclaration-fields-staticPrivate.js]
"use strict";
var _a, _C_field1, _b, _D_field1;
class C {
}
_a = C;
_C_field1 = { value: 0 };
class D {
}
_b = D;
_D_field1 = { value: 0 };
(() => {
    __classPrivateFieldGet(_b, _b, "f", _D_field1);
    __classPrivateFieldSet(_b, _b, 1, "f", _D_field1);
})();
