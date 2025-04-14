/// <reference path="fourslash.ts" />

//// import { c, b, a } from "foo";
//// import d, { e } from "bar";
//// import * as f from "baz";
//// import { g } from "foo";
////
//// export { g, e, b, c };

verify.organizeImports(
`import { c, b } from "foo";
import { e } from "bar";
import { g } from "foo";

export { g, e, b, c };`,
  ts.OrganizeImportsMode.RemoveUnused);
