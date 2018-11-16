/// <reference path="fourslash.ts" />

// @Filename: /howNow/node_modules/brownCow/index.d.ts
////export const foo: number;

// @Filename: /howNow/a.ts
////foo;

// Before fixing this bug, we compared a canonicalized `hownow` to a non-canonicalized `howNow`.

goTo.file("/howNow/a.ts");
verify.importFixAtPosition([
`import { foo } from "brownCow";

foo;`,
]);
