/// <reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true

// @Filename: /modules/@app/something/index.js
//// import "doesnt-exist";

// @Filename: /modules/@local/foo.js
//// import "doesnt-exist"; 

verify.getEditsForFileRename({
  oldPath: "/modules/@app/something",
  newPath: "/modules/@app/something-2",
  newFileContents: {}
});
