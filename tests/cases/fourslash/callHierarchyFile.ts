/// <reference path="fourslash.ts" />

//// [|[|foo|]();
//// [|function /**/[|foo|]() {
//// }|]|]

const [
    fileRange,
    fooReferenceRange,
    fooFunctionRange,
    fooFunctionSelectionRange,
] = test.ranges();

goTo.marker();
verify.callHierarchy({
    kind: "function",
    range: fooFunctionRange,
    selectionRange: fooFunctionSelectionRange,
    incoming: sequence.one({
        from: {
            kind: "script",
            range: fileRange,
        },
        fromRanges: sequence.one(
            fooReferenceRange
        )
    }),
    outgoing: sequence.none()
});
