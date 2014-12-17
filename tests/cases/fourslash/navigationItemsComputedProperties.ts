/// <reference path="fourslash.ts"/>

////{| "itemName": "C", "kind": "class", "parentName": "" |}
////class C {
////    {| "itemName": "foo", "kind": "method", "parentName": "C" |}
////    foo() { }
////    ["hi" + "bye"]() { }
////    {| "itemName": "bar", "kind": "method", "parentName": "C" |}
////    bar() { }
////}

test.markers().forEach(marker => {
    verify.navigationItemsListContains(
        marker.data.itemName,
        marker.data.kind,
        marker.data.itemName,
        "exact",
        marker.fileName,
        marker.data.parentName);
});