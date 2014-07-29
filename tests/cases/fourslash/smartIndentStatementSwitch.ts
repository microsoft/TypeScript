/// <reference path='fourslash.ts'/>

////function Foo() {
////    var x;
////    switch (x) {
////        {| "indentation": 8 |}
////    }
////    {| "indentation": 4 |}
////    switch (x) {
////        {| "indentation": 8 |}
////        case 1:
////            {| "indentation": 12 |}
////            break;
////        {| "indentation": 8 |}
////    }
////    {| "indentation": 4 |}
////}

test.markers().forEach((marker) => {
    verify.indentationAtPositionIs(marker.fileName, marker.position, marker.data.indentation);
});