/// <reference path="fourslash.ts" />

//// [|function [|foo|]() {
////     new [|Bar|]();
//// }|]
////
//// const /**/[|Bar|] = [|class {
////     constructor() {
////         [|baz|]();
////     }
//// }|]
////
//// [|function [|baz|]() {
//// }|]

const [
    fooFunctionRange,
    fooFunctionSelectionRange,
    barReferenceRange,
    barClassSelectionRange,
    barClassRange,
    bazReferenceRange,
    bazFunctionRange,
    bazFunctionSelectionRange,
] = test.ranges();

goTo.marker();
verify.callHierarchy({
    kind: "class",
    range: barClassRange,
    selectionRange: barClassSelectionRange,
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