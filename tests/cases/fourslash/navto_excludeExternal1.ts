/// <reference path="fourslash.ts"/>

// @filename: /index.ts
//// const [|weirdName: number = 1|];

// @filename: /node_modules/bar/index.d.ts
//// export const [|weirdName: number|];

// @filename: /node_modules/bar/package.json
//// {}


const [weird, otherWeird] = test.ranges();

verify.navigateTo({
    pattern: "weirdName",
    expected: [{
        name: "weirdName",
        kind: "const",
        range: weird,
        matchKind: "exact",
    },
    {
        name: "weirdName",
        kind: "const",
        kindModifiers: "export,declare",
        range: otherWeird,
        matchKind: "exact",
    }],
});

verify.navigateTo({
    pattern: "weirdName",
    excludeExternalFiles: true,
    expected: [{
        name: "weirdName",
        kind: "const",
        range: weird,
        matchKind: "exact",
    }],
    
});