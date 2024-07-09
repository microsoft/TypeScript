/// <reference path='fourslash.ts'/>
//@Filename:test.d.ts
//// export declare class Test {}

//@Filename:module.ts
////import { Test } from ".//**/"

verify.completions({ marker: "", includes:{name:"test.js"}, preferences: {importModuleSpecifierEnding: "js" }, isNewIdentifierLocation: true});
verify.completions({ marker: "", includes:{name:"test"}, preferences: {importModuleSpecifierEnding: "index" }, isNewIdentifierLocation: true});
