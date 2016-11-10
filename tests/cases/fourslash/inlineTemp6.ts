/// <reference path='fourslash.ts' />

// @Filename: file1.ts
//// export module m1 {
////        function f1() {
////            let j:number = 98;
////            let /*0*/s1:string ="dummy", s3:string = "mmmmm";
////            let r1 = s1.replace("d", "g");
////            j = 87, s1 = "ddddd", s3="rrrr";
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
        let j:number = 98;
        let s3:string = "mmmmm";
        let r1 = ("dummy").replace("d", "g");
        j = 87, s3="rrrr";
        let m1: string = "dummy2", m: string = "dummy", m3: string = ("ddddd") ;
        let s2: string = ("kkk").replace(("kkk"), "") + m + "some value" + ("kkk");
    }
}
`}]);