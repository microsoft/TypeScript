/// <reference path='fourslash.ts' />

// @Filename: file1.ts
//// export module m1 {
////        function f1(/*0*/s1: string/*1*/) {
////            s1 ="dummy";
////            let s2: string = s1.replace(s1, "");
////        }
////
////        function f2() {
////            f1("dummy");
////        }
//// }

verify.codeRefactor({
    description: "Extract Interface from Parameters",
    expectedFileChanges: [
        {
            fileName: "file1.ts",
            expectedText: `
export module m1 {
    interface newInterfacef1 {
        s1: string;
    }

    function f1(iObj: newInterfacef1) {
        iObj.s1 = "dummy";
        let s2: string = iObj.s1.replace(iObj.s1, "");
    }

    function f2() {
        f1({s1: "dummy"});
    }
}
`
        }
    ]
});