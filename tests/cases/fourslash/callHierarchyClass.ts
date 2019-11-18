/// <reference path="fourslash.ts" />

//// [|function [|foo|]() {
////     [|bar|]();
//// }|]
////
//// [|function /**/[|bar|]() {
////     new [|Baz|]();
//// }|]
////
//// [|class [|Baz|] {
//// }|]

const [
    fooFunctionRange,
    fooFunctionSelectionRange,
    barReferenceRange,
    barFunctionRange,
    barFunctionSelectionRange,
    bazReferenceRange,
    bazClassRange,
    bazClassSelectionRange
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
        fromRanges: sequence.one(
            barReferenceRange
        )
    }),
    outgoing: sequence.one({
        to: {
            kind: "class",
            range: bazClassRange,
            selectionRange: bazClassSelectionRange
        },
        fromRanges: sequence.one(
            bazReferenceRange
        )
    })
});
