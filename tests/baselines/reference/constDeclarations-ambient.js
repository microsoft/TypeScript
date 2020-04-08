//// [constDeclarations-ambient.ts]
// No error
declare const c1: boolean;
declare const c2: number;
declare const c3, c4 :string, c5: any;

declare module M {
    const c6;
    const c7: number;
}

//// [constDeclarations-ambient.js]
