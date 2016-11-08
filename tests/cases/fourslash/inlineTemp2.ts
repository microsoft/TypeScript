/// <reference path='fourslash.ts' />

// @Filename: file1.ts
//// export module m1 {
////        function f1() {
////            let s3:string = "mmmmm", j:number = 98;
////            let /*0*/s1:string ="dummy";
////            j = 87, s3="rrrr", s1 = "ddddd";
////            let m1: string = "dummy2", m: string = "dummy", m3: string = s1;
////            s1 = "kkk";
////            let s2: string = s1.replace(s1, "") + m + "some value" + s1;
////        }
//// }

verify.inlineTempAtPosition([{
            fileName: "file1.ts",
            expectedText: `
export module m1 {
    function f1() {
        let s3:string = "mmmmm", j:number = 98;
        j = 87, s3="rrrr";
        let m1: string = "dummy2", m: string = "dummy", m3: string = ("ddddd") ;
        let s2: string = ("kkk").replace(("kkk"), "") + m + "some value" + ("kkk");
    }
}
`}]);