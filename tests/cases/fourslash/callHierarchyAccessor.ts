/// <reference path="fourslash.ts" />

//// [|function [|foo|]() {
////     new C().[|bar|];
//// }|]
////
//// class C {
////     [|get /**/[|bar|]() {
////         return [|baz|]();
////     }|]
//// }
////
//// [|function [|baz|]() {
//// }|]

const [
    fooFunctionRange,
    fooFunctionSelectionRange,
    barReferenceRange,
    barAccessorRange,
    barAccessorSelectionRange,
    bazReferenceRange,
    bazFunctionRange,
    bazFunctionSelectionRange
] = test.ranges();

goTo.marker();
verify.callHierarchy({
    kind: "getter",
    range: barAccessorRange,
    selectionRange: barAccessorSelectionRange,
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
