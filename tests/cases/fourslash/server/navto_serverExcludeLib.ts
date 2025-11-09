/// <reference path="../fourslash.ts"/>

// @Filename: /home/src/workspaces/project/index.ts
//// import { weirdName as otherName } from "bar";
//// const [|weirdName: number = 1|];

// @Filename: /home/src/workspaces/project/tsconfig.json
//// {}

// @Filename: /home/src/workspaces/project/node_modules/bar/index.d.ts
//// export const [|weirdName: number|];

// @Filename: /home/src/workspaces/project/node_modules/bar/package.json
//// {}


const [weird, otherWeird] = test.ranges();

verify.navigateTo({
    pattern: "weirdName",
    expected: [{
        name: "weirdName",
        kind: "const",
        kindModifiers: "export,declare",
        range: otherWeird,
        matchKind: "exact",
    },
    {
        name: "weirdName",
        kind: "const",
        range: weird,
        matchKind: "exact",
    }],
});

verify.navigateTo({
    pattern: "weirdName",
    excludeLibFiles: true,
    expected: [{
        name: "weirdName",
        kind: "const",
        range: weird,
        matchKind: "exact",
    }],
});