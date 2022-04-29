/// <reference path="fourslash.ts"/>

/////** some documentation
//// * @template T some documentation 2
//// * @template W
//// * @template U,V others
//// * @param a ok
//// * @param b not ok
//// */
////function f<T, U, V, W>(a: number, b: string, c: boolean): void { }
////f</*f0*/;
////f<number, /*f1*/;
////f<number, string, /*f2*/;
////f<number, string, boolean, /*f3*/;

verify.baselineSignatureHelp()
