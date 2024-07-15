/// <reference path="../fourslash.ts" />

// @Filename: /folder/c.ts
//// [||]

// @Filename: /a.ts
//// export default function foo(name: string): void {
////     console.log(name);
//// }

// @Filename: /b.ts
////import foo from "./a";
////[|foo("bar");|]

// @Filename: /tsconfig.json
////{ "files": ["/folder/c.ts", "/a.ts", "/b.ts"] }

const range = test.ranges();
verify.pasteEdits({
    args: {
        pastedText: [`foo("bar");`],
        pasteLocations: [range[0]],
        copiedFrom: { file: "/b.ts", range: [range[1]] },
    },
    newFileContents: {
        "/folder/c.ts":
`import foo from "../a";

foo("bar");`
    }
});

