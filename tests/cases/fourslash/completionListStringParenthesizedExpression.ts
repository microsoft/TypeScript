/// <reference path='fourslash.ts'/>

////const foo = {
////    a: 1,
////    b: 1,
////    c: 1
////}
////const a = foo["[|/*1*/|]"];
////const b = foo[("[|/*2*/|]")];
////const c = foo[(("[|/*3*/|]"))];

const [r1, r2, r3] = test.ranges();
verify.completions(
    {
        marker: "1",
        exact: [
            { name: "a", replacementSpan: r1 },
            { name: "b", replacementSpan: r1 },
            { name: "c", replacementSpan: r1 }
        ]
    },
    {
        marker: "2",
        exact: [
            { name: "a", replacementSpan: r2 },
            { name: "b", replacementSpan: r2 },
            { name: "c", replacementSpan: r2 }
        ]
    },
    {
        marker: "3",
        exact: [
            { name: "a", replacementSpan: r3 },
            { name: "b", replacementSpan: r3 },
            { name: "c", replacementSpan: r3 }
        ]
    }
);
