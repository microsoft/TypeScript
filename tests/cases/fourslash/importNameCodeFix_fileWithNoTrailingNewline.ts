/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export const foo = 0;

// @Filename: /b.ts
////export const bar = 0;

// @Filename: /c.ts
////foo;
////import { bar } from "./b";

goTo.file("/c.ts");
verify.importFixAtPosition([
`foo;
import { bar } from "./b";
import { foo } from "./a";
`,
]);
