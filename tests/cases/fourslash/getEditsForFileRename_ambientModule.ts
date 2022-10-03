/// <reference path='fourslash.ts' />

// @Filename: /tsconfig.json
////{}

// @Filename: /sub/types.d.ts
// @Symlink: /node_modules/sub/types.d.ts
////declare module "sub" {
////    declare export const abc: number
////}

// @Filename: /sub/package.json
// @Symlink: /node_modules/sub/package.json
////{ "types": "types.d.ts" }

// @Filename: /a.ts
////import { abc } from "sub";

verify.getEditsForFileRename({
    oldPath: "/a.ts",
    newPath: "/b.ts",
    newFileContents: {},
});
