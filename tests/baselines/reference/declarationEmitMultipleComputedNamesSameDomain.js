//// [tests/cases/compiler/declarationEmitMultipleComputedNamesSameDomain.ts] ////

//// [declarationEmitMultipleComputedNamesSameDomain.ts]
declare const x: string;
declare const y: "y";

export class Test {
    [x] = 10;
    [y] = 10;
}

//// [declarationEmitMultipleComputedNamesSameDomain.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
var Test = /** @class */ (function () {
    function Test() {
        this[_a] = 10;
        this[_b] = 10;
    }
    return Test;
}());
exports.Test = Test;
_a = x, _b = y;


//// [declarationEmitMultipleComputedNamesSameDomain.d.ts]
declare const x: string;
declare const y: "y";
export declare class Test {
    [x]: number;
    [y]: number;
}
export {};
