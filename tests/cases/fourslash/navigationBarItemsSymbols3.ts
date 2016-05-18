/// <reference path="fourslash.ts"/>

////{| "itemName": "E", "kind": "enum", "parentName": "" |}
////enum E {
////    // No nav bar entry for this
////    [Symbol.isRegExp] = 0
////}

test.markers().forEach(marker => {
    verify.navigationBarContains(marker.data.itemName, marker.data.kind, marker.fileName, marker.data.parentName);
});

verify.navigationBarCount(test.markers().length);