/// <reference path='fourslash.ts' />

////var x = {
////    [1123123123132
////{| "indent": 4 |}
////}

// Note that we currently do NOT indent further in a computed property.
test.markers().forEach(marker => {
    verify.indentationAtPositionIs(marker.fileName, marker.position, marker.data.indent);
});