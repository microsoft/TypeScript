/// <reference path="fourslash.ts" />

// Regression test for GH#43107

//// import * as something from "path"; /* small comment */ // single line one.
//// /* some comment here
//// * and there
//// */
//// import * as somethingElse from "anotherpath";

verify.organizeImports('');