/// <reference path="fourslash.ts" />

// @Filename: /a/index.d.ts
// @Symlink: /b/node_modules/a/index.d.ts
// @Symlink: /c/node_modules/a/index.d.ts
////export const a: number;

// @Filename: /b/index.ts
// @Symlink: /c/node_modules/b/index.d.ts
////import { a } from 'a'
////export const b: number;

// @Filename: /c/a_user.ts
// Importing from "a" to get /c/node_modules/a in the project.
// Must do this in a separate file to avoid import fixes attempting to share the import.
////import { a } from "a";

// @Filename: /c/foo.ts
////[|import { b } from "b";
////a;|]

goTo.file("/c/foo.ts");
verify.importFixAtPosition([
`import { b } from "b";
import { a } from "a";
a;`,
]);
