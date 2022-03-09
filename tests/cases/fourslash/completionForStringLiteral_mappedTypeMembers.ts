/// <reference path='fourslash.ts'/>

////type Foo = {
////   a: string;
////   b: string;
////};
////
////type A = Readonly<Foo>;
////type B = A["[|/**/|]"]

const replacementSpan = test.ranges()[0];
verify.completions({
    marker: "",
    exact: [
        { name: "a", replacementSpan },
        { name: "b", replacementSpan }
    ]
});
