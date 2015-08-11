////export function
/////**
//// * This is a class.
//// */
////{| "itemName": "C", "kind": "class" |} class C {
////    {| "itemName": "foo", "kind": "method" |} foo() {
////    }
////}


test.markers().forEach((marker) => {
    verify.getScriptLexicalStructureListContains(marker.data.itemName, marker.data.kind, marker.fileName, marker.data.parentName);
});

/// Only have two named elements.
verify.getScriptLexicalStructureListCount(2);
