/// <reference path="fourslash.ts"/>

// @Filename: test/my fil"e.ts
////{| "itemName": "Bar", "kind": "class", "parentName": "\"my fil\\\"e\"" |}export class Bar {
////    {| "itemName": "s", "kind": "property", "parentName": "Bar" |}public s: string;
////}
////{| "itemName": "\"my fil\\\"e\"", "kind": "module" |}
////{| "itemName": "x", "kind": "var", "parentName": "\"my fil\\\"e\"" |}
////export var x: number;

test.markers().forEach((marker) => {
    verify.navigationBarContains(marker.data.itemName, marker.data.kind, marker.fileName, marker.data.parentName);
});

verify.navigationBarCount(5); // external module node + 2 children + class + property
