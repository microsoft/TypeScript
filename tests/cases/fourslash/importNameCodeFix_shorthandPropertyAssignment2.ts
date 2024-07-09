/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////const a = 1;
////export default a;

// @Filename: /b.ts
////const b = { /**/a };

goTo.file("/b.ts");
verify.importFixAtPosition([
`import a from "./a";

const b = { a };`
]);
