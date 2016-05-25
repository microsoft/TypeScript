/// <reference path="fourslash.ts"/>

////{| "itemName": "I", "kind": "interface", "parentName": "<global>" |}
////interface I {
////    {| "itemName": "[Symbol.isRegExp]", "kind": "property", "parentName": "I" |}
////    [Symbol.isRegExp]: string;
////    {| "itemName": "[Symbol.iterator]", "kind": "method", "parentName": "I" |}
////    [Symbol.iterator](): string;
////}

test.markers().forEach(marker => {
    verify.navigationBarContains(marker.data.itemName, marker.data.kind, marker.fileName, marker.data.parentName);
});

// 2 are not marked: <global> and its child.
verify.navigationBarCount(2 + test.markers().length);