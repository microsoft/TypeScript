/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export function a() {}

// @Filename: /b.ts
////function *f() {
////  yield a/**/
////}

verify.applyCodeActionFromCompletion("", {
  name: "a",
  source: "/a",
  description: `Import 'a' from module "./a"`,
  newFileContent: `import { a } from "./a";

function *f() {
  yield a
}`
});
