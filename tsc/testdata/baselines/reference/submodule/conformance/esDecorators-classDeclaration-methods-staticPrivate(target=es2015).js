//// [tests/cases/conformance/esDecorators/classDeclaration/methods/esDecorators-classDeclaration-methods-staticPrivate.ts] ////

//// [esDecorators-classDeclaration-methods-staticPrivate.ts]
declare let dec: any;

class C {
    @dec static #method1() {}
}

@dec
class D {
    static #method1() {}
}


//// [esDecorators-classDeclaration-methods-staticPrivate.js]
"use strict";
var _a, _C_method1, _b, _D_method1;
class C {
}
_a = C, _C_method1 = function _C_method1() { };
class D {
}
_b = D, _D_method1 = function _D_method1() { };
