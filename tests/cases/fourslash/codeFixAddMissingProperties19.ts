/// <reference path='fourslash.ts' />

////export interface Foo<T> {
////    z(...args: T extends unknown[] ? T : [T]);
////}
////export interface Bar {
////    a(foo: Foo<[number]>): void;
////    b(foo: Foo<[]>): void;
////    c(foo: Foo<number>): void;
////}
////[|const bar: Bar = {};|]

verify.codeFix({
    index: 0,
    description: ts.Diagnostics.Add_missing_properties.message,
    newRangeContent:
`const bar: Bar = {
    a: function(foo: Foo<[number]>): void {
        throw new Error("Function not implemented.");
    },
    b: function(foo: Foo<[]>): void {
        throw new Error("Function not implemented.");
    },
    c: function(foo: Foo<number>): void {
        throw new Error("Function not implemented.");
    }
};`,
});
