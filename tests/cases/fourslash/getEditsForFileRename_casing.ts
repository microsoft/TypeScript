/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////import { foo } from "./dir/fOo";

// @Filename: /dir/fOo.ts
////export const foo = 0;

// On a case-insensitive file system (like fourslash uses), there was a bug where we used the canonicalized path suffix.

verify.getEditsForFileRename({
    oldPath: "/dir",
    newPath: "/newDir",
    newFileContents: {
        "/a.ts":
`import { foo } from "./newDir/fOo";`,
    },
});
