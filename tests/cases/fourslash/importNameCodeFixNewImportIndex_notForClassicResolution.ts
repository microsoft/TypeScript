/// <reference path="fourslash.ts" />

// @moduleResolution: classic

// @Filename: /a/index.ts
////export const foo = 0;

// @Filename: /b.ts
////[|/**/foo;|]

goTo.file("/a/index.ts");
goTo.file("/b.ts");

verify.importFixAtPosition([
`import { foo } from "./a/index.ts";

foo;`
]);
