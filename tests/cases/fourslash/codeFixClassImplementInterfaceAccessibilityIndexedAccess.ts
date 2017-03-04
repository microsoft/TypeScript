/// <reference path='fourslash.ts' />

//// namespace N {
////     const enum Inaccessible { };
////     export const enum Accessible { };
////     export interface InaccessibleIndexers {
////         [x: string]: Inaccessible;
////         [y: number]: Inaccessible;
////     }
////     export interface AccessibleIndexers {
////         [x: string]: Accessible;
////         [y: number]: Accessible;
////     }
//// }
//// class C implements N.InaccessibleIndexers, N.AccessibleIndexers {[| |]}

verify.rangeAfterCodeFix(`
    [y: number]: N.Accessible;
    [x: string]: N.Accessible;
`);
