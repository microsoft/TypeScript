//// [tests/cases/compiler/privacyCheckOnTypeParameterReferenceInConstructorParameter.ts] ////

//// [privacyCheckOnTypeParameterReferenceInConstructorParameter.ts]
export class A<T1>{
    constructor(callback: (self: A<T1>) => void) {
        var child = new B(this);
    }
}

export class B<T2> {
    constructor(parent: T2) { }
}


//// [privacyCheckOnTypeParameterReferenceInConstructorParameter.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.B = exports.A = void 0;
class A {
    constructor(callback) {
        var child = new B(this);
    }
}
exports.A = A;
class B {
    constructor(parent) { }
}
exports.B = B;
