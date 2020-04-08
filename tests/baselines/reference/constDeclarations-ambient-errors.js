//// [constDeclarations-ambient-errors.ts]
// error: no intialization expected in ambient declarations
declare const c1: boolean = true;
declare const c2: number = 0;
declare const c3 = null, c4 :string = "", c5: any = 0;

declare module M {
    const c6 = 0;
    const c7: number = 7;
}

//// [constDeclarations-ambient-errors.js]
