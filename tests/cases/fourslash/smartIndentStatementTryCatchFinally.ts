/// <reference path='fourslash.ts'/>

////function tryCatch() {
////    {| "indentation": 4 |}
////    try {
////        {| "indentation": 8 |}
////    }
////    {| "indentation": 4 |}
////    catch (err) {
////        {| "indentation": 8 |}
////    }
////    {| "indentation": 4 |}
////}
////
////function tryFinally() {
////    {| "indentation": 4 |}
////    try {
////        {| "indentation": 8 |}
////    }
////    {| "indentation": 4 |}
////    finally {
////        {| "indentation": 8 |}
////    }
////    {| "indentation": 4 |}
////}
////
////function tryCatchFinally() {
////    {| "indentation": 4 |}
////    try {
////        {| "indentation": 8 |}
////    }
////    {| "indentation": 4 |}
////    catch (err) {
////        {| "indentation": 8 |}
////    }
////    {| "indentation": 4 |}
////    finally {
////        {| "indentation": 8 |}
////    }
////    {| "indentation": 4 |}
////}

test.markers().forEach((marker) => {
    verify.indentationAtPositionIs(marker.fileName, marker.position, marker.data.indentation);
});