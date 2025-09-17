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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
class Test {
    [x] = 10;
    [y] = 10;
}
exports.Test = Test;


//// [declarationEmitMultipleComputedNamesSameDomain.d.ts]
declare const x: string;
declare const y: "y";
export declare class Test {
    [x]: number;
    [y]: number;
}
export {};
