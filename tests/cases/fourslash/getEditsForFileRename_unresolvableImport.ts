/// <reference path="fourslash.ts" />

// @Filename: /tsconfig.json
//// {
////   "compilerOptions": {
////     "allowJs": true,
////     "paths": {
////       "*": ["./next/src/*"],
////       "@app": ["./modules/@app/*"],
////       "@app/*": ["./modules/@app/*"],
////       "@local": ["./modules/@local/*"],
////       "@local/*": ["./modules/@local/*"]
////     }
////   }
//// }

// @Filename: /modules/@app/something/index.js
//// import "@local/some-other-import";

// @Filename: /modules/@local/index.js
//// import "@local/some-other-import";

verify.getEditsForFileRename({
  oldPath: "/modules/@app/something",
  newPath: "/modules/@app/something-2",
  newFileContents: {}
});
