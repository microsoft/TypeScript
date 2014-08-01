/// <reference path="fourslash.ts"/>

////// less than and greater than tests
////    public bar(a, b) {
////        return a [|< b || a >|] b;
////    }
////
////// in comments
//// // [|{    }|]
//// // [|(    )|]
//// // [|[    ]|]
//// // [|<    >|]


test.ranges().forEach((range) => {
        verify.noMatchingBracePositionInCurrentFile(range.start);
        verify.noMatchingBracePositionInCurrentFile(range.end);
    });
