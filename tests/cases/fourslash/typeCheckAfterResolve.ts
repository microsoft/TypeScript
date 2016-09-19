/// <reference path="fourslash.ts" />

/////*start*/class Point implements /*IPointRef*/IPoint {
////    getDist() {
////        ssss;
////    }
////}/*end*/

// Edit to invalidate the intial typeCheck state
goTo.eof();
edit.insertLine("");

// Attempt to resolve a symbol
verify.quickInfoAt("IPointRef", ""); // not found

// trigger typecheck after the partial resolve, we should see errors
verify.errorExistsAfterMarker("IPointRef");

goTo.eof();
edit.insertLine("");

// one more time with full typecheck
verify.errorExistsAfterMarker("IPointRef");

