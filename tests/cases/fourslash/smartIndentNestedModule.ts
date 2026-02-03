/// <reference path='fourslash.ts'/>

////namespace Foo {
////    namespace Foo2 {
////        {| "indentation": 8 |}
////        function f() {
////        }
////        {| "indentation": 8 |}
////        var x: number;
////        {| "indentation": 8 |}
////    }
////    {| "indentation": 4 |}
////}

test.markers().forEach((marker) => {
    verify.indentationAtPositionIs(marker.fileName, marker.position, marker.data.indentation);
});