/// <reference path="fourslash.ts" />

////import c from "C";
////
////import d from "D";
////import a from "A"; // not count
////import b from "B";
////
////console.log(a, b, c, d)

verify.organizeImports(
`import c from "C";

import a from "A"; // not count
import b from "B";
import d from "D";

console.log(a, b, c, d)`
);
