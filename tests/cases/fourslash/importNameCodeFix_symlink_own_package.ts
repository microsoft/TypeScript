/// <reference path="fourslash.ts" />

// @Filename: /packages/b/b0.ts
// @Symlink: /node_modules/b/b0.ts
////x;

// @Filename: /packages/b/b1.ts
// @Symlink: /node_modules/b/b1.ts
////import { a } from "a";
////export const x = 0;

// @Filename: /packages/a/index.d.ts
// @Symlink: /node_modules/a/index.d.ts
////export const a: number;

goTo.file("/packages/b/b0.ts");
verify.importFixAtPosition([
`import { x } from "./b1";

x;`,
]);
