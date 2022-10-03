/// <reference path='fourslash.ts'/>

////enum Foo3 {
////    {| "indentation": 4|}
////    val1,
////    {| "indentation": 4|}
////    val2,
////    {| "indentation": 4|}
////}
////{| "indentation": 0|}

test.markers().forEach((marker) => {
    verify.indentationAtPositionIs(marker.fileName, marker.position, marker.data.indentation);
});
