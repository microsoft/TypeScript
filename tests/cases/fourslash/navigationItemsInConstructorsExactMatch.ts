/// <reference path="fourslash.ts"/>

// @noLib: true

////class Test {
////    [|private search1: number;|]
////    constructor([|public search2: boolean|], [|readonly search3: string|], search4: string) {
////    }
////}

// Search for properties defined in the constructor, but not other constructor paramters
const [r0, r1, r2] = test.ranges();
verify.navigateTo({
    pattern: "search",
    expected: [
        { name: "search1", matchKind: "prefix", kind: "property", kindModifiers: "private", range: r0, containerName: "Test", containerKind: "class" },
        { name: "search2", matchKind: "prefix", kind: "property", kindModifiers: "public", range: r1, containerName: "Test", containerKind: "class" },
        { name: "search3", matchKind: "prefix", kind: "property", range: r2, containerName: "Test", containerKind: "class" },
    ],
});
