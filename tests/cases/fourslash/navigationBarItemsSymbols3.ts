/// <reference path="fourslash.ts"/>

////{| "itemName": "E", "kind": "enum", "parentName": "<global>" |}
////enum E {
////    // No nav bar entry for this
////    [Symbol.isRegExp] = 0
////}

test.markers().forEach(marker => {
    verify.navigationBarContains(marker.data.itemName, marker.data.kind, marker.fileName, marker.data.parentName);
});

verify.navigationBarCount(3); // <global> and E appearing both toplevel and under <global>