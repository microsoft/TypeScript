/// <reference path='fourslash.ts'/>
//@allowJs: true
//@jsx:preserve
//@Filename:test.jsx
//// export class Test { }

//@Filename:module.jsx
////import { Test } from ".//**/"

verify.completions({ marker: "", includes:{name:"test.jsx"}, preferences: {importModuleSpecifierEnding: "js"}, isNewIdentifierLocation: true});
verify.completions({ marker: "", includes:{name:"test"}, preferences: {importModuleSpecifierEnding: "index" }, isNewIdentifierLocation: true});
