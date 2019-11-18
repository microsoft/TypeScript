/// <reference path="fourslash.ts" />

// @filename: main.ts
//// import Bar from "./other";
////
//// [|function [|foo|]() {
////     new [|Bar|]();
//// }|]

// @filename: other.ts
//// [|export /**/[|default|] class {
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
    barFunctionRange,
    barFunctionSelectionRange,
    bazReferenceRange,
    bazFunctionRange,
    bazFunctionSelectionRange
] = test.ranges();

goTo.marker();
verify.callHierarchy({
    kind: "class",
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
