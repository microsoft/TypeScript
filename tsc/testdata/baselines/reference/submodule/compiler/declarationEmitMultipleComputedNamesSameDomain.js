//// [tests/cases/compiler/declarationEmitMultipleComputedNamesSameDomain.ts] ////

//// [declarationEmitMultipleComputedNamesSameDomain.ts]
declare const x: string;
declare const y: "y";

export class Test {
    [x] = 10;
    [y] = 10;
}

//// [declarationEmitMultipleComputedNamesSameDomain.js]
export class Test {
    [x] = 10;
    [y] = 10;
}


//// [declarationEmitMultipleComputedNamesSameDomain.d.ts]
declare const x: string;
declare const y: "y";
export declare class Test {
    [x]: number;
    [y]: number;
}
export {};
