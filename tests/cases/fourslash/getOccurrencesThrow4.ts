/// <reference path='fourslash.ts' />

////function f(a: number) {
////    try {
////        throw "Hello";
////
////        try {
////            throw 10;
////        }
////        catch (x) {
////            return 100;
////        }
////        finally {
////            throw 10;
////        }
////    }
////    catch (x) {
////        throw "Something";
////    }
////    finally {
////        throw "Also something";
////    }
////    if (a > 0) {
////        return (function () {
////            [|return|];
////            [|return|];
////            [|return|];
////
////            if (false) {
////                [|return|] true;
////            }
////            [|th/**/row|] "Hello!";
////        })() || true;
////    }
////
////    throw 10;
////
////    var unusued = [1, 2, 3, 4].map(x => { throw 4 })
////
////    return;
////    return true;
////    throw false;
////}

verify.baselineDocumentHighlights();
