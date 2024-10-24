/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/folder/c.ts
////[||]

// @Filename: /home/src/workspaces/project/b.ts
////import foo from "./a";
////[|const b = foo("bar");|]

// @Filename: /home/src/workspaces/project/a.ts
//// export default function foo(name: string): void {
////     console.log(name);
//// }

// @Filename: /home/src/workspaces/project/tsconfig.json
////{ "files": ["folder/c.ts", "a.ts", "b.ts"] }

const range = test.ranges();
verify.pasteEdits({
    args: {
        pastedText: [`const b = foo("bar");`],
        pasteLocations: [range[0]],
        copiedFrom: { file: "/home/src/workspaces/project/b.ts", range: [range[1]] },
    },
    newFileContents: {
        "/home/src/workspaces/project/folder/c.ts":
`import foo from "../a";

const b = foo("bar");`
    }
});