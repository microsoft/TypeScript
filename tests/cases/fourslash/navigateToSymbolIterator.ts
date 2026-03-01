/// <reference path="fourslash.ts" />

// @lib: es5

////class C {
////    [|[Symbol.iterator]() {}|]
////}

verify.navigateTo({
    pattern: "iterator",
    expected: [
        { name: "iterator", kind: "method", range: test.ranges()[0], containerName: "C", containerKind: "class" },
    ],
});
