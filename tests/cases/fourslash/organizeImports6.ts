/// <reference path="fourslash.ts" />

// Regression test for GH#43107

//// import * as something from "path"; /* small comment */ // single line one.
//// /* some comment here
//// * and there
//// */
//// import * as somethingElse from "anotherpath";
//// import * as anotherThing from "someopath"; /* small comment */ // single line one.
//// /* some comment here
//// * and there
//// */
//// import * as anotherThingElse from "someotherpath";
//// 
//// anotherThing;

verify.organizeImports(
`/* some comment here
* and there
*/
import * as anotherThing from "someopath"; /* small comment */ // single line one.
/* some comment here
* and there
*/

anotherThing;`);
