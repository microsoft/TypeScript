/// <reference path="fourslash.ts" />

// @Filename: a/f1.ts
//// [|import * as ns from "./foo";
//// foo/*0*/();|]

// @Filename: a/foo/bar.ts
//// export function foo() {};

// @Filename: a/foo.ts
//// export { foo } from "./foo/bar";

verify.importFixAtPosition([
`import * as ns from "./foo";
ns.foo();`,

`import * as ns from "./foo";
import { foo } from "./foo";
foo();`,
]);
