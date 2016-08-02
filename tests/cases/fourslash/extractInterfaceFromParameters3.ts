/// <reference path='fourslash.ts' />

// @Filename: file1.ts
//// export module m1 {
////        function f1(/*0*/s1: string, n1: number/*1*/) {
////            s1 ="dummy";
////            n1 = 98;
////            let s2: string = s1.replace(s1, "");
////            return n1 + 8769/n1 - n1 * n1;
////        }
////
////        function f2() {
////            f1("dummy", 90);
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
        n1: number;
    }

    function f1(iObj: newInterfacef1) {
        iObj.s1 = "dummy";
        iObj.n1 = 98;
        let s2: string = iObj.s1.replace(iObj.s1, "");
        return iObj.n1 + 8769/iObj.n1 - iObj.n1 * iObj.n1;
    }

    function f2() {
        f1({s1: "dummy", n1: 90});
    }
}
`
        }
    ]
});