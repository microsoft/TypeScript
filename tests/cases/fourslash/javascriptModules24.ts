/// <reference path='fourslash.ts'/>

// @Filename: mod.ts
//// function foo() { return 42; }
//// namespace foo {
////   export function bar (a: string) { return a; }
//// }
//// export = foo;

// @Filename: app.ts
//// import * as foo from "./mod"
//// foo/*1*/();
//// foo.bar(/*2*/"test");

goTo.marker('1');

/**** BUG: Should be an error to invoke a call signature on a namespace import ****/
//verify.errorExistsBeforeMarker('1');
verify.quickInfoIs("(alias) foo(): number\nimport foo");
verify.signatureHelp({ marker: "2", argumentCount: 1 });
