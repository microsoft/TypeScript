/// <reference path="fourslash.ts" />

//// import * as B from "./B";
//// import * as À from "./À";
//// import * as A from "./A";
////
//// console.log(A, À, B);

verify.organizeImports(
`import * as À from "./À";
import * as A from "./A";
import * as B from "./B";

console.log(A, À, B);`, /*mode*/ undefined, {
    organizeImportsIgnoreCase: false,
    organizeImportsCollation: "unicode",
    organizeImportsAccentCollation: false,
});

verify.organizeImports(
`import * as A from "./A";
import * as À from "./À";
import * as B from "./B";

console.log(A, À, B);`, /*mode*/ undefined, {
    organizeImportsIgnoreCase: false,
    organizeImportsCollation: "unicode",
    organizeImportsAccentCollation: true,
});
