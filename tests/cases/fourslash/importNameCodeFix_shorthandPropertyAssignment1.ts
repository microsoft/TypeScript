/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export const a = 1;

// @Filename: /b.ts
////const b = { /**/a };

goTo.file("/b.ts");
verify.importFixAtPosition([
`import { a } from "./a";

const b = { a };`
]);
