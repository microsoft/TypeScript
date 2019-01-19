/// <reference path='fourslash.ts'/>

////module Fix2 {
////    interface iFace { (event: string); }
////    var foo: iFace = function (elem) { /**/ }
////}

verify.completions({ marker: "", includes: { name: "elem", text: "(parameter) elem: string" } });
