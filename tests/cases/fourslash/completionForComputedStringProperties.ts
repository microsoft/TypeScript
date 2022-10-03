/// <reference path="fourslash.ts" />

//// const p2 = "p2";
//// interface A {
////     ["p1"]: string;
////     [p2]: string;
//// }
//// declare const a: A;
//// a[|./**/|]

verify.completions({
    marker: "",
    exact: [
        { name: "p1" },
        { name: "p2", insertText: '[p2]', replacementSpan: test.ranges()[0] },
    ],
    preferences: { includeInsertTextCompletions: true },
});