/// <reference path="fourslash.ts"/>

// @Filename: test/my fil"e.ts
////{| "itemName": "Bar", "kind": "class" |}export class Bar {
////    {| "itemName": "s", "kind": "property", "parentName": "Bar" |}public s: string;
////}
////{| "itemName": "\"my fil\\\"e\"", "kind": "module" |}
////{| "itemName": "x", "kind": "var", "parentName": "\"file\"" |}
////export var x: number;

test.markers().forEach((marker) => {
    verify.getScriptLexicalStructureListContains(marker.data.itemName, marker.data.kind, marker.fileName, marker.data.parentName);
});

verify.getScriptLexicalStructureListCount(4); // external module node + variable in module + class + property
