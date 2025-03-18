//// [tests/cases/compiler/genericClassesInModule2.ts] ////

//// [genericClassesInModule2.ts]
export class A<T1>{
    constructor( public callback: (self: A<T1>) => void) {
        var child = new B(this);
    }
    AAA( callback: (self: A<T1>) => void) {
        var child = new B(this);
    }
}

export interface C<T1>{
    child: B<T1>;
    (self: C<T1>): void;
    new(callback: (self: C<T1>) => void)
}

export class B<T2> {
    constructor(public parent: T2) { }
}



//// [genericClassesInModule2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.B = exports.A = void 0;
class A {
    callback;
    constructor(callback) {
        this.callback = callback;
        var child = new B(this);
    }
    AAA(callback) {
        var child = new B(this);
    }
}
exports.A = A;
class B {
    parent;
    constructor(parent) {
        this.parent = parent;
    }
}
exports.B = B;
