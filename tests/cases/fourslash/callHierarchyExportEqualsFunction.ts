/// <reference path="fourslash.ts" />

// @filename: main.ts
//// import bar = require("./other");
////
//// function foo() {
////     bar();
//// }

// @filename: other.ts
//// [|export = /**/function () {
////     [|baz|]();
//// }
////
//// [|function [|baz|]() {
//// }|]|]

const [
    otherFileRange,
    bazReferenceRange,
    bazFunctionRange,
    bazFunctionSelectionRange
] = test.ranges();

goTo.marker();
verify.callHierarchy({
    // NOTE: exported function is unnamed, so we expand the item to the entire file...
    kind: "module",
    range: otherFileRange,
    incoming: sequence.none(),
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
