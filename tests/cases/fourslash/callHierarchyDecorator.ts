/// <reference path="fourslash.ts" />

// @experimentalDecorators: true
//// [|@[|bar|]
//// class [|Foo|] {
//// }|]
////
//// [|function /**/[|bar|]() {
////     [|baz|]();
//// }|]
////
//// [|function [|baz|]() {
//// }|]

const [
    fooClassRange,
    barReferenceRange,
    fooClassSelectionRange,
    barFunctionRange,
    barFunctionSelectionRange,
    bazReferenceRange,
    bazFunctionRange,
    bazFunctionSelectionRange,
] = test.ranges();

goTo.marker();
verify.callHierarchy({
    kind: "function",
    range: barFunctionRange,
    selectionRange: barFunctionSelectionRange,
    incoming: sequence.one({
        from: {
            kind: "class",
            range: fooClassRange,
            selectionRange: fooClassSelectionRange,
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
