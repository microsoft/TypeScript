/// <reference path="fourslash.ts"/>

////const a = [|(
////    true
////        ? true
////        : false
////            ? true
////            : false
////)|];
////
////const b = ( 1 );
////
////const c = [|(
////    1
////)|];
////
////( 1 );
////
////[|(
////    [|(
////        [|(
////            1
////        )|]
////    )|]
////)|];
////
////[|(
////    [|(
////        ( 1 )
////    )|]
////)|];

verify.outliningSpansInCurrentFile(test.ranges());
