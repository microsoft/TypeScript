/// <reference path="fourslash.ts"/>

////{| "itemName": "C", "kind": "class", "parentName": "" |}
////class C {
////    {| "itemName": "[Symbol.isRegExp]", "kind": "property", "parentName": "C" |}
////    [Symbol.isRegExp] = 0;
////    {| "itemName": "[Symbol.iterator]", "kind": "method", "parentName": "C" |}
////    [Symbol.iterator]() { }
////    {| "itemName": "[Symbol.isConcatSpreadable]", "kind": "getter", "parentName": "C" |}
////    get [Symbol.isConcatSpreadable]() { }
////}

test.markers().forEach(marker => {
    verify.getScriptLexicalStructureListContains(marker.data.itemName, marker.data.kind, marker.fileName, marker.data.parentName);
});

verify.getScriptLexicalStructureListCount(test.markers().length);