/// <reference path="fourslash.ts" />

//// [|interface I {
////     /**/[|[|foo|](): void;|]
//// }
////
//// const obj: I = { foo() {} };
////
//// obj.[|foo|]();|]

const [
    fileRange,
    fooMethodRange,
    fooMethodSelectionRange,
    fooReferenceRange
] = test.ranges();

goTo.marker();
verify.callHierarchy({
    kind: "method",
    range: fooMethodRange,
    selectionRange: fooMethodSelectionRange,
    incoming: sequence.one({
        from: {
            kind: "script",
            range: fileRange
        },
        fromRanges: sequence.one(
            fooReferenceRange
        )
    }),
    outgoing: sequence.none()
});
