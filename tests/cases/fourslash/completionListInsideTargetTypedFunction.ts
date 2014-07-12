/// <reference path='fourslash.ts'/>

////module BugFix2 {
////    interface iFace { (event: string); }
////    var foo: iFace = function (elem) { /**/ }
////}

// this line triggers a semantic/syntactic error check, remove line when 788570 is fixed
edit.insert('');

goTo.marker();
verify.completionListContains("elem", "string");