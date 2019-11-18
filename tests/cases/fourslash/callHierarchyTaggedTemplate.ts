/// <reference path="fourslash.ts" />

//// [|function [|foo|]() {
////     [|bar|]`a${1}b`;
//// }|]
////
//// [|function /**/[|bar|](array: TemplateStringsArray, ...args: any[]) {
////     [|baz|]();
//// }|]
////
//// [|function [|baz|]() {
//// }|]

const [
    fooFunctionRange,
    fooFunctionSelectionRange,
    barReferenceRange,
    barFunctionRange,
    barFunctionSelectionRange,
    bazReferenceRange,
    bazFunctionRange,
    bazFunctionSelectionRange
] = test.ranges();

goTo.marker();
verify.callHierarchy({
    kind: "function",
    range: barFunctionRange,
    selectionRange: barFunctionSelectionRange,
    incoming: sequence.one({
        from: {
            kind: "function",
            range: fooFunctionRange,
            selectionRange: fooFunctionSelectionRange,
        },
        fromRanges: { exact: true, values: [
            barReferenceRange
        ] }
    }),
    outgoing: sequence.one({
        to: {
            kind: "function",
            range: bazFunctionRange,
            selectionRange: bazFunctionSelectionRange
        },
        fromRanges: { exact: true, values: [
            bazReferenceRange
        ] }
    })
});
