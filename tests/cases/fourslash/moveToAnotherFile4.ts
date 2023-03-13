/// <reference path='fourslash.ts' />

//@Filename: /bar.ts
////import './blah';
////import './blah2';
////const a = 2;
////a;

// @Filename: /a.ts
////// header comment
////
////import './foo';
////import { a, b, alreadyUnused } from './other';
////const p = 0;
////[|const x = 0;
////function f() {}
////class C {}
////enum E {}
////namespace N { export const x = 0; }
////type T = number;
////interface I {}|]

verify.moveToAnotherFile({
    newFileContents: {
        "/a.ts":
`// header comment

import './foo';
import { a, b, alreadyUnused } from './other';
const p = 0;
`,

        "/bar.ts":
`import './blah';
import './blah2';
const a = 2;
a;
export const x = 0;
export function f() { }
export class C { }
export enum E { }
export namespace N { export const x = 0; }
export type T = number;
export interface I { }
`,
    },
    newFile: "/bar.ts",

    preferences: {
        quotePreference: "single",
    }
});
