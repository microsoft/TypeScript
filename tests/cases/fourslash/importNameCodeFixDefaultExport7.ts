/// <reference path="fourslash.ts" />

// @lib: dom

// @Filename: foo.ts
//// export default globalThis.localStorage;

// @Filename: index.ts
//// foo/**/

goTo.marker("");
verify.importFixAtPosition([`import foo from "./foo";

foo`]);
