//// [tests/cases/compiler/declarationEmitMultipleComputedNamesSameDomain.ts] ////

//// [declarationEmitMultipleComputedNamesSameDomain.ts]
declare const x: string;
declare const y: "y";

export class Test {
    [x] = 10;
    [y] = 10;
}

//// [declarationEmitMultipleComputedNamesSameDomain.js]
var _a, _b;
export class Test {
    constructor() {
        this[_a] = 10;
        this[_b] = 10;
    }
}
_a = x, _b = y;


//// [declarationEmitMultipleComputedNamesSameDomain.d.ts]
declare const x: string;
declare const y: "y";
export declare class Test {
    [x]: number;
    [y]: number;
}
export {};
