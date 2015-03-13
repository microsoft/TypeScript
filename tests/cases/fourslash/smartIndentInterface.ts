/// <reference path='fourslash.ts'/>

////interface Foo {
////    {| "indentation" : 4 |}
////    x: number;
////    {| "indentation" : 4 |}
////    foo(): number;
////    {| "indentation" : 4 |}
////}
////{| "indentation" : 0 |}

test.markers().forEach((marker) => {
    verify.indentationAtPositionIs(marker.fileName, marker.position, marker.data.indentation);
});