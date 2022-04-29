/// <reference path="fourslash.ts" />

// @Filename: /foo-bar.ts
////export default function fooBar();

// @Filename: /b.ts
////[|import * as fb from "./foo-bar";
////foo/**/Bar|]

goTo.file("/b.ts");
// No suggestion to use `fb.fooBar` (which would be wrong)
verify.importFixAtPosition([`import fooBar, * as fb from "./foo-bar";
fooBar`]);
