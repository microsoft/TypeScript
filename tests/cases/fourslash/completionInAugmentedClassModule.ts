/// <reference path='fourslash.ts'/>

////declare class m3f { foo(x: number): void }
////namespace m3f { export interface I { foo(): void } }
////var x: m3f./**/

verify.completions({ marker: "", exact: "I" });
