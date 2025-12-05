/// <reference path="fourslash.ts" />

////namespace Test {
////    class Mocked {
////        myProp: string;
////    }
////    class Tester {
////        willThrowError() {
////            Mocked = Mocked || function () { // => Error: Invalid left-hand side of assignment expression.
////                return { /**/myProp: "test" };
////            };
////        }
////    }
////}

goTo.marker();
// Verify no crash
verify.quickInfoExists();
