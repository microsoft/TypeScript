/// <reference path='fourslash.ts' />

// @Filename: file1.ts
//// export module m1 {
////        function f1() {
////            let /*0*/s1:string ="dummy";
////            let m1: string = "dummy2", m: string = "dummy", m3: string = "dummy3" ;
////            let s2: string = s1.replace(s1, "") + m + "some value" + s1;
////        }
//// }

verify.inlineTempAtPosition([{
    fileName: "file1.ts",
    expectedText: `
export module m1 {
    function f1() {
        let m1: string = "dummy2", m: string = "dummy", m3: string = "dummy3" ;
        let s2: string = ("dummy").replace(("dummy"), "") + m + "some value" + ("dummy");
    }
}`}]);