/// <reference path="fourslash.ts" />

////{| "itemName": "c", "kind": "constant", "parentName": "" |}const c = 10;
////function foo() {
////    {| "itemName": "d", "kind": "constant", "parentName": "foo" |}const d = 10;
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