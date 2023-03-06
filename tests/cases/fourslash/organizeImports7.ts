/// <reference path="fourslash.ts" />

// Regression test for GH#43107

//// import * as something from "path"; /**
////  * some comment here
////  * and there
////  */
//// import * as somethingElse from "anotherpath";
//// 
//// something;
//// somethingElse;

verify.organizeImports(
`import * as somethingElse from "anotherpath";
import * as something from "path"; /**
 * some comment here
 * and there
 */

something;
somethingElse;`
);