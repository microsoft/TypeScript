//// [tests/cases/compiler/parameterPropertyInConstructor4.ts] ////

//// [parameterPropertyInConstructor4.ts]
export class C {
    constructor(public a: number[] = [], b: number) {
    }
}


//// [parameterPropertyInConstructor4.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
var C = /** @class */ (function () {
    function C(a, b) {
        if (a === void 0) { a = []; }
        this.a = a;
    }
    return C;
}());
exports.C = C;


//// [parameterPropertyInConstructor4.d.ts]
export declare class C {
    a: number[];
    constructor(a: number[] | undefined, b: number);
}
