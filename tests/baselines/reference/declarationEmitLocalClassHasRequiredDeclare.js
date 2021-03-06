//// [declarationEmitLocalClassHasRequiredDeclare.ts]
export declare namespace A {
    namespace X { }
}

class X { }

export class A {
    static X = X;
}

export declare namespace Y {

}

export class Y { }

//// [declarationEmitLocalClassHasRequiredDeclare.js]
"use strict";
exports.__esModule = true;
exports.Y = exports.A = void 0;
var X = /** @class */ (function () {
    function X() {
    }
    return X;
}());
var A = /** @class */ (function () {
    function A() {
    }
    A.X = X;
    return A;
}());
exports.A = A;
var Y = /** @class */ (function () {
    function Y() {
    }
    return Y;
}());
exports.Y = Y;


//// [declarationEmitLocalClassHasRequiredDeclare.d.ts]
export declare namespace A {
    namespace X { }
}
declare class X {
}
export declare class A {
    static X: typeof X;
}
export declare namespace Y {
}
export declare class Y {
}
export {};
