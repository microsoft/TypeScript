/// <reference path='fourslash.ts'/>
//@Filename:index.css
//// body {}

//@Filename:module.ts
////import ".//**/"

verify.completions({ marker: "", excludes:"index.css", preferences: {importModuleSpecifierEnding: "js" }, isNewIdentifierLocation: true});
verify.completions({ marker: "", excludes:"index", preferences: {importModuleSpecifierEnding: "index" }, isNewIdentifierLocation: true});
