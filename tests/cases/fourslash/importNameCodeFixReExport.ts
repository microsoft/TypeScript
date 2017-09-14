/// <reference path='fourslash.ts' />

// Test that we are not fooled by a re-export existing in the file already

// @Filename: /a.ts
////export const x = 0";

// @Filename: /b.ts
////[|export { x } from "./a";
////x;|]

goTo.file("/b.ts");
verify.rangeAfterCodeFix(`import { x } from "./a";

export { x } from "./a";
x;`, /*includeWhiteSpace*/ true);
