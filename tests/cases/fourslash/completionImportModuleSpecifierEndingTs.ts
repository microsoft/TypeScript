/// <reference path='fourslash.ts'/>
//@Filename:test.ts
////export function f(){
////    return 1
////}

//@Filename:module.ts
////import { f } from ".//**/"

verify.completions({ marker: "", includes:{name:"test.js"}, preferences: {importModuleSpecifierEnding: "js" }, isNewIdentifierLocation: true});
verify.completions({ marker: "", includes:{name:"test"}, preferences: {importModuleSpecifierEnding: "index" }, isNewIdentifierLocation: true});
