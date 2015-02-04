/// <reference path="fourslash.ts" />

//// {| "itemName": "c", "kind": "const", "parentName": "" |}const c = 0;

test.markers().forEach(marker => {
    verify.getScriptLexicalStructureListContains(
        marker.data.itemName,
        marker.data.kind,
        marker.fileName,
        marker.data.parentName,
        marker.data.isAdditionalRange,
        marker.position);
});