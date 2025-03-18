//// [tests/cases/compiler/declarationEmitLocalClassHasRequiredDeclare.ts] ////

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Y = exports.A = void 0;
class X {
}
class A {
    static X = X;
}
exports.A = A;
class Y {
}
exports.Y = Y;
