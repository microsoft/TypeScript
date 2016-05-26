/// <reference path="fourslash.ts"/>

// @Filename: test/file.ts
////{| "itemName": "Bar", "kind": "class", "parentName": "\"file\"" |}export class Bar {
////    {| "itemName": "s", "kind": "property", "parentName": "Bar" |}public s: string;
////}
////{| "itemName": "\"file\"", "kind": "module" |}
////{| "itemName": "x", "kind": "var", "parentName": "\"file\"" |}
////export var x: number;

test.markers().forEach((marker) => {
    verify.navigationBarContains(marker.data.itemName, marker.data.kind, marker.fileName, marker.data.parentName);
});

verify.navigationBarCount(5); // external module node + variable in module + class + property
