/// <reference path="fourslash.ts"/>


////export { {| "itemName": "a", "kind": "alias", "parentName": "" |}a } from "a";
////
////export { {| "itemName": "B", "kind": "alias", "parentName": "" |}b as B } from "a" 
////
////{| "itemName": "e", "kind": "alias", "parentName": "" |} export import e = require("a");
////
////export * from "a"; // no bindings here

test.markers().forEach((marker) => {
    if (marker.data) {
        verify.getScriptLexicalStructureListContains(marker.data.itemName, marker.data.kind, marker.fileName, marker.data.parentName);
    }
});

verify.getScriptLexicalStructureListCount(4);
