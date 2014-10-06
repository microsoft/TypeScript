/// <reference path="fourslash.ts"/>

////function;
////{| "itemName": "f", "kind": "function" |}
////function f() {
////    function;
////}

test.markers().forEach((marker) => {
    verify.getScriptLexicalStructureListContains(marker.data.itemName, marker.data.kind, marker.fileName, marker.data.parentName);
});

verify.getScriptLexicalStructureListCount(1); // 1 function with no global - the broken declaration adds nothing for us at the global scope.
