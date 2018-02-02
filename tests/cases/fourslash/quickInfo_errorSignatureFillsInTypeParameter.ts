/// <reference path='fourslash.ts'/>

////declare function f<T>(x: number): T;
////const x/**/ = f();

verify.quickInfoAt("", "const x: T"); // TODO: GH#19854
