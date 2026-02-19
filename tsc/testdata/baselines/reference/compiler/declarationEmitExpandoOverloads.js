//// [tests/cases/compiler/declarationEmitExpandoOverloads.ts] ////

//// [declarationEmitExpandoOverloads.ts]
export function A(a: number): void;
export function A(a: string): void;
export function A(a: number | string) {}
A.a = 1;


//// [declarationEmitExpandoOverloads.js]
export function A(a) { }
A.a = 1;


//// [declarationEmitExpandoOverloads.d.ts]
export declare function A(a: number): void;
export declare function A(a: string): void;
export declare namespace A {
    var a: number;
}
