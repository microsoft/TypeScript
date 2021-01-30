/// <reference path='fourslash.ts'/>
//@allowJs: true
//@Filename:test.js
////export function f(){
////    return 1
////}

//@Filename:module.js
////import { f } from "/**/"


verify.completions({ marker: "", includes:{name:"false"}, preferences: {importModuleSpecifierEnding: "js" }, isNewIdentifierLocation: true})