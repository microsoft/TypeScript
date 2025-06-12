//// [tests/cases/conformance/classes/classDeclarations/classAbstractKeyword/classAbstractManyKeywords.ts] ////

//// [classAbstractManyKeywords.ts]
export default abstract class A {}
export abstract class B {}
default abstract class C {}
import abstract class D {}

//// [classAbstractManyKeywords.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.B = void 0;
class A {
}
exports.default = A;
class B {
}
exports.B = B;
class C {
}
class D {
}
