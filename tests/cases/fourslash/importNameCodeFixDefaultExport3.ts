/// <reference path="fourslash.ts" />

// @Filename: /foo-bar/index.ts
////export default 0;

// @Filename: /b.ts
////[|foo/**/Bar|]

goTo.file("/b.ts");
verify.importFixAtPosition([`import fooBar from "./foo-bar";

fooBar`]);
