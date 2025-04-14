/// <reference path="fourslash.ts" />

////interface A {
////    a: number;
////    b: string;
////}
////interface B {
////    c: boolean;
////}
////interface C {
////    a: A;
////    b: B;
////}
////function f<T extends keyof C>(type: T, obj: C[T]): string {
////    return "";
////}
////[|f("a", {});|]

verify.codeFix({
    index: 0,
    description: ts.Diagnostics.Add_missing_properties.message,
    newRangeContent:
`f("a", {
    a: 0,
    b: ""
});`,
});
