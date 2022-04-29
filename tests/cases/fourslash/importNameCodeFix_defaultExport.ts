/// <reference path="fourslash.ts" />

// @module: esnext
// @allowJs: true
// @checkJs: true

// @Filename: /a.js
////class C {}
////export default C;

// @Filename: /b.js
////[|C;|]

goTo.file("/b.js");
verify.importFixAtPosition([
`import C from "./a";

C;`,
]);
