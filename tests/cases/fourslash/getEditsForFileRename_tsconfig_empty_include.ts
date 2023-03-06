/// <reference path="fourslash.ts" />

// @Filename: /a/foo.ts
////const x = 1

// @Filename: /a/tsconfig.json
////{ "include": [] }

verify.getEditsForFileRename({
  oldPath: "/a/foo.ts",
  newPath: "/a/bar.ts",
  newFileContents: {
  }
});
