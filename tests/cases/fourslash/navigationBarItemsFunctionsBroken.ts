/// <reference path="fourslash.ts"/>

////{| "itemName": "f", "kind": "function" |}
////function f() {
////    function;
////}

test.markers().forEach((marker) => {
    verify.navigationBarContains(marker.data.itemName, marker.data.kind, marker.fileName, marker.data.parentName);
});

verify.navigationBarCount(4); // <global> with child 'f' and 'f' with child '<function>'.
