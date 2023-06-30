/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export function foo() {}

// @Filename: /b.ts
////const x = 0
////const y = 1
////const z = fo/**/

verify.applyCodeActionFromCompletion("", {
  name: "foo",
  source: "/a",
  description: `Add import from "./a"`,
  newFileContent: `import { foo } from "./a"

const x = 0
const y = 1
const z = fo`,
});
