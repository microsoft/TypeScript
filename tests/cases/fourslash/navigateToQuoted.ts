/// <reference path="fourslash.ts" />

// @noLib: true

////class C {
////    [|["foo-bar"]() {}|]
////    [|["foo bar"]() {}|]
////}

const [r0, r1] = test.ranges();
const dash: FourSlashInterface.ExpectedNavigateToItem =
    { name: "foo-bar", kind: "method", range: r0, containerName: "C", containerKind: "class" };
const space: FourSlashInterface.ExpectedNavigateToItem =
    { name: "foo bar", kind: "method", range: r1, containerName: "C", containerKind: "class" };

verify.navigateTo(
    {
        pattern: "foo-bar",
        expected: [dash, { ...space, matchKind: "prefix" }],
    },
    {
        pattern: "foo bar",
        // TODO: GH#23035
        expected: [{ ...space, matchKind: "prefix" }, { ...dash, matchKind: "prefix" }],
    },
);
