/// <reference path="fourslash.ts" />

// @Filename: /packages/a/test.ts
// @Symlink: /node_modules/a/test.ts
////x;

// @Filename: /packages/a/utils.ts
// @Symlink: /node_modules/a/utils.ts
////import {} from "a/utils";
////export const x = 0;

goTo.file("/packages/a/test.ts");
verify.importFixAtPosition([
`import { x } from "./utils";

x;`,
]);
