/// <reference path="fourslash.ts" />

////class C {
////    [|[Symbol.iterator]() {}|]
////}

verify.navigateTo({
    pattern: "iterator",
    expected: [
        { name: "iterator", kind: "method", range: test.ranges()[0], containerName: "C", containerKind: "class" },
    ],
});
