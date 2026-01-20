/// <reference path='fourslash.ts'/>

////namespace Fix2 {
////    interface iFace { (event: string); }
////    var foo: iFace = function (elem) { /**/ }
////}

verify.completions({ marker: "", includes: { name: "elem", text: "(parameter) elem: string" } });
