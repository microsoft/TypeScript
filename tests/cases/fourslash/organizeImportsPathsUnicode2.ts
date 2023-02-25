/// <reference path="fourslash.ts" />

//// import * as a2 from "./a2";
//// import * as a100 from "./a100";
//// import * as a1 from "./a1";
////
//// console.log(a1, a2, a100);

verify.organizeImports(
`import * as a1 from "./a1";
import * as a100 from "./a100";
import * as a2 from "./a2";

console.log(a1, a2, a100);`, /*mode*/ undefined, {
    organizeImportsIgnoreCase: false,
    organizeImportsCollation: "unicode",
    organizeImportsNumericCollation: false,
});

verify.organizeImports(
`import * as a1 from "./a1";
import * as a2 from "./a2";
import * as a100 from "./a100";

console.log(a1, a2, a100);`, /*mode*/ undefined, {
    organizeImportsIgnoreCase: false,
    organizeImportsCollation: "unicode",
    organizeImportsNumericCollation: true,
});
