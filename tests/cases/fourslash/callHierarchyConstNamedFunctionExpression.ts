/// <reference path="fourslash.ts" />

//// [|function [|foo|]() {
////     [|bar|]();
//// }|]
////
//// const /**/[|bar|] = [|function () {
////     [|baz|]();
//// }|]
////
//// [|function [|baz|]() {
//// }|]

const [
    fooFunctionRange,
    fooFunctionSelectionRange,
    barReferenceRange,
    barFunctionSelectionRange,
    barFunctionRange,
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
        fromRanges: sequence.one(
            barReferenceRange
        )
    }),
    outgoing: sequence.one({
        to: {
            kind: "function",
            range: bazFunctionRange,
            selectionRange: bazFunctionSelectionRange
        },
        fromRanges: sequence.one(
            bazReferenceRange
        )
    })
});
