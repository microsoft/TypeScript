/// <reference path='fourslash.ts'/>
//@jsx:preserve
//@Filename:test.tsx
//// export class Test { }

//@Filename:module.tsx
////import { Test } from ".//**/"

verify.completions({ marker: "", includes:{name:"test.jsx"}, preferences: {importModuleSpecifierEnding: "js"}, isNewIdentifierLocation: true});
verify.completions({ marker: "", includes:{name:"test"}, preferences: {importModuleSpecifierEnding: "index" }, isNewIdentifierLocation: true});
