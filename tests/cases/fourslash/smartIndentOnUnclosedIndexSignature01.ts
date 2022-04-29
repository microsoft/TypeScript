/// <reference path='fourslash.ts' />

////class C {
////[x: string
////{| "indent": 4 |}
////

// Note that we currently do NOT indent further in an index signature.
test.markers().forEach(marker => {
    verify.indentationAtPositionIs(marker.fileName, marker.position, marker.data.indent);
});