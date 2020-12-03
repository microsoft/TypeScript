/// <reference path='fourslash.ts' />

// @noImplicitThis: true

////class C {
////    m() {
////        return function g() {
////            this;
////            g();
////        };
////    }
////}

// note that no implicitThis fix is available, only a inferFromUsage one:
verify.codeFixAvailable([{
    description: "Infer 'this' type of 'g' from usage",
}]);
