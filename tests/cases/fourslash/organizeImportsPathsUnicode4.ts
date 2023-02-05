/// <reference path="fourslash.ts" />

//// import * as Ab from "./Ab";
//// import * as _aB from "./_aB";
//// import * as aB from "./aB";
//// import * as _Ab from "./_Ab";
////
//// console.log(_aB, _Ab, aB, Ab);

verify.organizeImports(
`import * as _Ab from "./_Ab";
import * as _aB from "./_aB";
import * as Ab from "./Ab";
import * as aB from "./aB";

console.log(_aB, _Ab, aB, Ab);`, /*mode*/ undefined, {
    organizeImportsIgnoreCase: false,
    organizeImportsCollation: "unicode",
    organizeImportsCaseFirst: "upper",
});

verify.organizeImports(
`import * as _aB from "./_aB";
import * as _Ab from "./_Ab";
import * as aB from "./aB";
import * as Ab from "./Ab";

console.log(_aB, _Ab, aB, Ab);`, /*mode*/ undefined, {
    organizeImportsIgnoreCase: false,
    organizeImportsCollation: "unicode",
    organizeImportsCaseFirst: "lower",
});
