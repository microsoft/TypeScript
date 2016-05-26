/// <reference path="fourslash.ts"/>

////{| "itemName": "C", "kind": "class", "parentName": "<global>" |}
////class C {
////    {| "itemName": "[Symbol.isRegExp]", "kind": "property", "parentName": "C" |}
////    [Symbol.isRegExp] = 0;
////    {| "itemName": "[Symbol.iterator]", "kind": "method", "parentName": "C" |}
////    [Symbol.iterator]() { }
////    {| "itemName": "[Symbol.isConcatSpreadable]", "kind": "getter", "parentName": "C" |}
////    get [Symbol.isConcatSpreadable]() { }
////}

test.markers().forEach(marker => {
    verify.navigationBarContains(marker.data.itemName, marker.data.kind, marker.fileName, marker.data.parentName);
});

// 2 lack markers: <global> and its child
verify.navigationBarCount(2 + test.markers().length);