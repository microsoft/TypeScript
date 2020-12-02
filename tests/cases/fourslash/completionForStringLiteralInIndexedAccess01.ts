/// <reference path='fourslash.ts'/>

////interface Foo {
////    foo: string;
////    bar: string;
////}
////
////let x: Foo["[|/*1*/|]"]

const replacementSpan = test.ranges()[0]
verify.completions({ marker: "1", exact: [
    { name: "foo", replacementSpan },
    { name: "bar", replacementSpan }
] });
