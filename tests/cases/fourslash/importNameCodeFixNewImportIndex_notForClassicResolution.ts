/// <reference path="fourslash.ts" />

// @moduleResolution: classic

// @Filename: /a/index.ts
////export const foo = 0;

// @Filename: /node_modules/x/index.d.ts
////export const bar = 0;

// @Filename: /b.ts
////[|foo;|]

// @Filename: /c.ts
////[|bar;|]

goTo.file("/a/index.ts");

goTo.file("/b.ts");
// Explicitly imports from "./a/index" and not just from "./a"
verify.importFixAtPosition([
`import { foo } from "./a/index";

foo;`
]);

goTo.file("/c.ts");
// Does not use a global import for node_modules
verify.importFixAtPosition([
`import { bar } from "./node_modules/x/index";

bar;`]);
