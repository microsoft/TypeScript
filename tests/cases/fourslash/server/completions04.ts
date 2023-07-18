/// <reference path="../fourslash.ts"/>

// issue: https://github.com/microsoft/TypeScript/issues/54729

//// let foo
//// /**/

verify.completions({ marker: "", includes: "const" });