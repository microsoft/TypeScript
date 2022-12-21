/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export const foo: number;

// @Filename: /b.ts
////export const foo: number;
////export const bar: number;

// @Filename: /c.ts
////[|import { bar } from "./b";
////foo;|]

goTo.file("/c.ts");
verify.importFixAtPosition([
`import { bar, foo } from "./b";
foo;`,
`import { foo } from "./a";
import { bar } from "./b";
foo;`,
]);
