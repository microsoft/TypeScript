/// <reference path='fourslash.ts'/>

////var o = {
////    foo() { },
////    bar: 0,
////    "some other name": 1
////};
////declare const p: { [s: string]: any, a: number };
////
////o["[|/*1*/bar|]"];
////o["/*2*/ ;
////p["[|/*3*/|]"];

const replacementSpan0 = test.ranges()[0]

verify.completions(
    { marker: "1", exact: [
        { name: "foo", replacementSpan: replacementSpan0 },
        { name: "bar", replacementSpan: replacementSpan0 },
        { name: "some other name", replacementSpan: replacementSpan0 }
    ] },
    { marker: "2", exact: [ "foo", "bar", "some other name" ] },
    { marker: "3", exact: {
        name: "a",
        replacementSpan: test.ranges()[1]
    },
    isNewIdentifierLocation: true },
);
