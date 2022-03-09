/// <reference path="fourslash.ts" />

////import { foo as foo } from "foo";
////foo;

verify.organizeImports(
`import { foo } from "foo";
foo;`
);
