/// <reference path='fourslash.ts'/>

////interface Foo {
////    a: string;
////    b: boolean;
////    c: number;
////}
////type Bar = Record<keyof Foo, any>["[|/**/|]"];

const replacementSpan = test.ranges()[0]
verify.completions({
    marker: "",
    exact: [
        { name: "a", replacementSpan },
        { name: "b", replacementSpan },
        { name: "c", replacementSpan }
    ]
});
