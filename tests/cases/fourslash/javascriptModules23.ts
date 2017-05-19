/// <reference path='fourslash.ts'/>

// @Filename: mod.ts
//// var foo = {a: "test"};
//// export = foo;

// @Filename: app.ts
//// import {a} from "./mod"
//// a./**/

goTo.marker();
verify.completionListContains('toString');
