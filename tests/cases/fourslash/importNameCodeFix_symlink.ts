/// <reference path="fourslash.ts" />

// @moduleResolution: node
// @noLib: true

// @Filename: /node_modules/real/index.d.ts
// @Symlink: /node_modules/link/index.d.ts
////export const foo: number;

// @Filename: /a.ts
////import { foo } from "link";

// @Filename: /b.ts
////[|foo;|]

// Uses "link" instead of "real" because `a` did.
goTo.file("/b.ts");
verify.importFixAtPosition([
`import { foo } from "link";

foo;`,
`import { foo } from "real";

foo;`,
]);
