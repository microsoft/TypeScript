/// <reference path='fourslash.ts' />

////class Foo {
////    get foo() {
////{| "indent": 8 |} 

test.markers().forEach(marker => {
    verify.indentationAtPositionIs(marker.fileName, marker.position, marker.data.indent);
});
