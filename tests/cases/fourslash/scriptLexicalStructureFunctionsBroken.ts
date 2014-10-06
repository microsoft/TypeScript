/// <reference path="fourslash.ts"/>

////{| "itemName": "f", "kind": "function" |}
////function f() {
////    function;
////}

test.markers().forEach((marker) => {
    verify.getScriptLexicalStructureListContains(marker.data.itemName, marker.data.kind, marker.fileName, marker.data.parentName);
});

verify.getScriptLexicalStructureListCount(1); // 1 function - no global since the inner function thinks it has a declaration.
