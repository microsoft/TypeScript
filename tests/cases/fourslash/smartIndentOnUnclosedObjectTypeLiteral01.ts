/// <reference path='fourslash.ts' />

////var x: {
////{| "indent": 4 |}

test.markers().forEach(marker => {
    verify.indentationAtPositionIs(marker.fileName, marker.position, marker.data.indent);
});