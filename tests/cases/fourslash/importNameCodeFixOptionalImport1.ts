/// <reference path="fourslash.ts" />

// @Filename: a/f1.ts
//// [|foo/*0*/();|]

// @Filename: a/node_modules/bar/index.ts
//// export function foo() {};

// @Filename: a/foo.ts
//// export { foo } from "bar"; 

verify.importFixAtPosition([
`import { foo } from "./foo";

foo();`,

`import { foo } from "bar";

foo();`,
]);
