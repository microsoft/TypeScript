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
class C {
    a;
    constructor(a = [], b) {
        this.a = a;
    }
}
exports.C = C;
