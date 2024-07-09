/// <reference path='fourslash.ts' />

// @Filename: /foo.ts
// @Symlink: /node_modules/foo/index.ts
////export const x = 0;

// @Filename: /user.ts
////import { x } from 'foo';

verify.noErrors();

verify.getEditsForFileRename({
    oldPath: "/user.ts",
    newPath: "/luser.ts",
    // no change
    newFileContents: {},
});
