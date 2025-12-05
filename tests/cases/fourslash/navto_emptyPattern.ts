/// <reference path="fourslash.ts"/>

// @filename: foo.ts
//// const [|x: number = 1|];
//// [|function y(x: string): string { return x; }|]


const [x, y] = test.ranges();

verify.navigateTo({
    pattern: "",
    fileName: "foo.ts",
    expected: [{
        name: "x",
        kind: "const",
        range: x,
        matchKind: "substring",
    },
    {
        name: "y",
        kind: "function",
        range: y,
        matchKind: "substring",
    }],
});