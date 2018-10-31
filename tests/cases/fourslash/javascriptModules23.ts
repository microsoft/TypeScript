/// <reference path='fourslash.ts'/>

// @Filename: mod.ts
//// var foo = {a: "test"};
//// export = foo;

// @Filename: app.ts
//// import {a} from "./mod"
//// a./**/

verify.completions({ marker: "", includes: "toString" });
