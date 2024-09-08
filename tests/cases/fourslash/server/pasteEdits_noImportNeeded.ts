/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/b.ts
////[||]

// @Filename: /home/src/workspaces/project/a.ts
//// export interface Foo { }
////
//// [|export|] const foo: Foo = {}

// @Filename: /home/src/workspaces/project/tsconfig.json
////{ "files": ["a.ts", "b.ts"] }

const ranges = test.ranges();
verify.pasteEdits({
    args: {
        pastedText: [`export`],
        pasteLocations: [ranges[0]],
        copiedFrom: { file: "/home/src/workspaces/project/a.ts", range: [ranges[1]] },
    },
    newFileContents: {}
});
