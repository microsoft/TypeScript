/// <reference path="fourslash.ts" />

//// [|function [|foo|]() {
////     [|bar|]();
//// }|]
////
//// [|function /**/[|bar|]() {
////     [|baz|]();
////     [|quxx|]();
////     [|baz|]();
//// }|]
////
//// [|function [|baz|]() {
//// }|]
////
//// [|function [|quxx|]() {
//// }|]

const [
    fooFunctionRange,
    fooFunctionSelectionRange,
    barReferenceRange,
    barFunctionRange,
    barFunctionSelectionRange,
    bazReferenceRange1,
    quxxReferenceRange,
    bazReferenceRange2,
    bazFunctionRange,
    bazFunctionSelectionRange,
    quxxFunctionRange,
    quxxFunctionSelectionRange,
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
    outgoing: sequence.exact([
        {
            to: {
                kind: "function",
                range: bazFunctionRange,
                selectionRange: bazFunctionSelectionRange
            },
            fromRanges: sequence.exact([
                bazReferenceRange1,
                bazReferenceRange2
            ])
        },
        {
            to: {
                kind: "function",
                range: quxxFunctionRange,
                selectionRange: quxxFunctionSelectionRange
            },
            fromRanges: sequence.one(
                quxxReferenceRange
            )
        },
    ])
});
