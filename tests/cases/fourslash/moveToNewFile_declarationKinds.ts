/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////export {}; // make this a module
////[|const x = 0;
////function f() {}
////class C {}
////enum E {}
////namespace N { export const x = 0; }
////type T = number;
////interface I {}|]
////x; f; C; E; N;
////type U = T; type V = I;

verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
`import { x, f, C, E, N, T, I } from "./x";

export {}; // make this a module
x; f; C; E; N;
type U = T; type V = I;`,

        "/x.ts":
`export const x = 0;
export function f() { }
export class C {
}
export enum E {
}
export namespace N {
    export const x = 0;
}
export type T = number;
export interface I {
}`,
    },
});
