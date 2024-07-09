/// <reference path="fourslash.ts" />
////type TypeEq<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
////
////const /*2*/test1: TypeEq<number[], [number, ...number[]]> = false;
////
////declare const foo: [number, ...number[]];
////declare const bar: number[];
////
////const /*1*/test2: TypeEq<typeof foo, typeof bar> = false;

goTo.marker("1");
verify.quickInfoIs("const test2: false");

goTo.marker("2");
verify.quickInfoIs("const test1: false");
