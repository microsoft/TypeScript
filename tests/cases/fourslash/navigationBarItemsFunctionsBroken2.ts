/// <reference path="fourslash.ts"/>

////function;
////{| "itemName": "f", "kind": "function" |}
////function f() {
////    function;
////}

test.markers().forEach((marker) => {
    verify.navigationBarContains(marker.data.itemName, marker.data.kind, marker.fileName, marker.data.parentName);
});

verify.navigationBarCount(5); // <global> with children '<function>' and 'f', and 'f' with child '<function>'
