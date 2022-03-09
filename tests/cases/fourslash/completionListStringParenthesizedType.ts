/// <reference path='fourslash.ts'/>

////type T1 = "a" | "b" | "c";
////type T2<T extends T1> = {};
////
////type T3 = T2<"[|/*1*/|]">;
////type T4 = T2<("[|/*2*/|]")>;
////type T5 = T2<(("[|/*3*/|]"))>;
////type T6 = T2<((("[|/*4*/|]")))>;
////
////type T7<P extends T1, K extends T1> = {};
////type T8 = T7<"a", ((("[|/*5*/|]")))>;
////
////interface Foo {
////    a: number;
////    b: number;
////}
////const a: Foo["[|/*6*/|]"];
////const b: Foo[("[|/*7*/|]")];
////const b: Foo[(("[|/*8*/|]"))];

const [r1, r2, r3, r4, r5, r6, r7, r8] = test.ranges();
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
    },
    {
        marker: "4",
        exact: [
            { name: "a", replacementSpan: r4 },
            { name: "b", replacementSpan: r4 },
            { name: "c", replacementSpan: r4 }
        ]
    },
    {
        marker: "5",
        exact: [
            { name: "a", replacementSpan: r5 },
            { name: "b", replacementSpan: r5 },
            { name: "c", replacementSpan: r5 }
        ]
    },
    {
        marker: "6",
        exact: [
            { name: "a", replacementSpan: r6 },
            { name: "b", replacementSpan: r6 }
        ]
    },
    {
        marker: "7",
        exact: [
            { name: "a", replacementSpan: r7 },
            { name: "b", replacementSpan: r7 }
        ]
    },
    {
        marker: "8",
        exact: [
            { name: "a", replacementSpan: r8 },
            { name: "b", replacementSpan: r8 }
        ]
    }
);
