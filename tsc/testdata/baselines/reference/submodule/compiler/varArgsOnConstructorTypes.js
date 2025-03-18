//// [tests/cases/compiler/varArgsOnConstructorTypes.ts] ////

//// [varArgsOnConstructorTypes.ts]
export class A {
    constructor(ctor) { }
}

export class B extends A {
    private p1: number;
    private p2: string;

    constructor(element: any, url: string) {
       super(element);
        this.p1 = element;
        this.p2 = url;
    }
}

export interface I1 {
    register(inputClass: new(...params: any[]) => A);
    register(inputClass: { new (...params: any[]): A; }[]);
}


var reg: I1;
reg.register(B);


//// [varArgsOnConstructorTypes.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.B = exports.A = void 0;
class A {
    constructor(ctor) { }
}
exports.A = A;
class B extends A {
    p1;
    p2;
    constructor(element, url) {
        super(element);
        this.p1 = element;
        this.p2 = url;
    }
}
exports.B = B;
var reg;
reg.register(B);
