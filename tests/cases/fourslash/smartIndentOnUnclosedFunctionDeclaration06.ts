/// <reference path='fourslash.ts' />

////function f<A,B,C>(a: A, b:B, c, d: C): {
////{| "indent": 4 |}
////} {
////{| "indent": 4 |}

test.markers().forEach(marker => {
    verify.indentationAtPositionIs(marker.fileName, marker.position, marker.data.indent);
});
