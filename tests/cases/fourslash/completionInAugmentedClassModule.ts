/// <reference path='fourslash.ts'/>

////declare class m3f { foo(x: number): void }
////module m3f { export interface I { foo(): void } }
////var x: m3f./**/

goTo.marker();
verify.not.completionListContains("foo");