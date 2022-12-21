/// <reference path='fourslash.ts'/>
//@allowJs: true
//@Filename:test.js
////export function f(){
////    return 1
////}

//@Filename:module.js
////import { f } from ".//**/"

verify.completions({ marker: "", includes:{name:"test.js"}, preferences: {importModuleSpecifierEnding: "js" }, isNewIdentifierLocation: true});
verify.completions({ marker: "", includes:{name:"test"}, preferences: {importModuleSpecifierEnding: "index" }, isNewIdentifierLocation: true});
