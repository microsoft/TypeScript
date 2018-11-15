/// <reference path='fourslash.ts' />

// @Filename: /a.tsx
////[|<div>a</div>;|]

verify.moveToNewFile({
    newFileContents: {
        "/a.tsx":
``,

        "/newFile.tsx":
`<div>a</div>;
`,
    }
});
