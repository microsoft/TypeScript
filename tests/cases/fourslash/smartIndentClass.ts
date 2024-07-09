/// <reference path='fourslash.ts'/>

////class Bar {
////    {| "indentation": 4|}
////    private foo: string = "";
////    {| "indentation": 4|}
////    private f() {
////        var a: any[] = [[1, 2], [3, 4], 5];
////        {| "indentation": 8|}
////        return ((1 + 1));
////    }
////    {| "indentation": 4|}
////    private f2() {
////        if (true) { } { };
////    }
////}
////{| "indentation": 0|}

test.markers().forEach((marker) => {
    verify.indentationAtPositionIs(marker.fileName, marker.position, marker.data.indentation);
});
