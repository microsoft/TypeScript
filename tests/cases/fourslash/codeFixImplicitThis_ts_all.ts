/// <reference path='fourslash.ts' />

// @noImplicitThis: true

////class C {
////    m() {
////        function f() {
////            this;
////        }
////        const g = function() {
////            this;
////        };
////    }
////}

verify.codeFixAll({
    fixId: "fixImplicitThis",
    fixAllDescription: "Fix all implicit-'this' errors",
    newFileContent:
`class C {
    m() {
        const f = () => {
            this;
        }
        const g = () => {
            this;
        };
    }
}`,
});
