/// <reference path="fourslash.ts" />

////import { a as a, b, c, d as d, e as e } from "foo";
////a(b, d);

verify.organizeImports(
`import { a, b, d } from "foo";
a(b, d);`
);
