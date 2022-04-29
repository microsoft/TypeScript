/// <reference path="fourslash.ts" />

////interface MyOptions {
////    hello?: boolean;
////    world?: boolean;
////}
////declare function bar<T extends MyOptions>(options?: Partial<T>): void;
////bar({ hello: true, /*1*/ });
////
////interface Test {
////    keyPath?: string;
////    autoIncrement?: boolean;
////}
////
////function test<T extends Record<string, Test>>(opt: T) { }
////
////test({
////    a: {
////        keyPath: 'x.y',
////        autoIncrement: true
////    },
////    b: {
////        /*2*/
////    }
////});
////type Colors = {
////    rgb: { r: number, g: number, b: number };
////    hsl: { h: number, s: number, l: number }
////};
////
////function createColor<T extends keyof Colors>(kind: T, values: Colors[T]) { }
////
////createColor('rgb', {
////  /*3*/
////});
////
////declare function f<T extends 'a' | 'b', U extends { a?: string }, V extends { b?: string }>(x: T, y: { a: U, b: V }[T]): void;
////
////f('a', {
////  /*4*/
////});
////
////declare function f2<T extends { x?: string }>(x: T): void;
////f2({
////  /*5*/
////});
////
////type X = { a: { a }, b: { b } }
////
////function f4<T extends 'a' | 'b'>(p: { kind: T } & X[T]) { }
////
////f4({
////    kind: "a",
////    /*6*/
////})

verify.completions(
    { marker: "1", exact: [{ name: "world", sortText: completion.SortText.OptionalMember }] },
    { marker: "2", exact: [{ name: "autoIncrement", sortText: completion.SortText.OptionalMember }, { name: "keyPath", sortText: completion.SortText.OptionalMember }] },
    { marker: "3", exact: ["b", "g", "r"] },
    { marker: "4", exact: [{ name: "a", sortText: completion.SortText.OptionalMember }] },
    { marker: "5", exact: [{ name: "x", sortText: completion.SortText.OptionalMember }] },
    { marker: "6", exact: ["a"] },
);