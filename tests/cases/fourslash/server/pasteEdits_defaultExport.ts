/// <reference path="../fourslash.ts" />

// @Filename: /src/folder/c.ts
//// [||]
////

// @Filename: /src/a.ts
//// export default function foo(name: string): void {
////     console.log(name);
//// }

// @Filename: /src/b.ts
//// import foo from "./a";
//// [|foo("bar");|]

// @Filename: /src/tsconfig.json
////{ "files": ["/src/folder/c.ts", "/src/a.ts", "/src/b.ts"] }

const range = test.ranges();
verify.pasteEdits({
    args: {
        pastedText: [`foo("bar");`],
        pasteLocations: [range[0]],
        copiedFrom: { file: "/src/b.ts", range: [range[1]] },
    },
    newFileContents: {
        "/src/folder/c.ts":
`import foo from "../a";

foo("bar");
`
    }
});

