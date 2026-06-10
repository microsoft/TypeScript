//// [tests/cases/compiler/declarationEmitExpandoFunction.ts] ////

//// [declarationEmitExpandoFunction.ts]
export function A() {
    return 'A';
}

export function B() {
    return 'B';
}

export enum C {
    C
}

A.a = C;
A.b = C;

B.c = C;


//// [declarationEmitExpandoFunction.js]
export function A() {
    return 'A';
}
export function B() {
    return 'B';
}
export var C;
(function (C) {
    C[C["C"] = 0] = "C";
})(C || (C = {}));
A.a = C;
A.b = C;
B.c = C;


//// [declarationEmitExpandoFunction.d.ts]
export declare function A(): string;
export declare namespace A {
    var a: typeof C;
    var b: typeof C;
}
export declare function B(): string;
export declare namespace B {
    var c: typeof C;
}
export declare enum C {
    C = 0
}
