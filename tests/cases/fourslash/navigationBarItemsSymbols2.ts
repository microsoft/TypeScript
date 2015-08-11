/// <reference path="fourslash.ts"/>

////{| "itemName": "I", "kind": "interface", "parentName": "" |}
////interface I {
////    {| "itemName": "[Symbol.isRegExp]", "kind": "property", "parentName": "I" |}
////    [Symbol.isRegExp]: string;
////    {| "itemName": "[Symbol.iterator]", "kind": "method", "parentName": "I" |}
////    [Symbol.iterator](): string;
////}

test.markers().forEach(marker => {
    verify.getScriptLexicalStructureListContains(marker.data.itemName, marker.data.kind, marker.fileName, marker.data.parentName);
});

verify.getScriptLexicalStructureListCount(test.markers().length);