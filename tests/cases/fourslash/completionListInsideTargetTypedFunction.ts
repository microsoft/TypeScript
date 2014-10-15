/// <reference path='fourslash.ts'/>

////module Fix2 {
////    interface iFace { (event: string); }
////    var foo: iFace = function (elem) { /**/ }
////}

goTo.marker();
verify.completionListContains("elem", "(parameter) elem: string");