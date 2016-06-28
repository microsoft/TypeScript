/// <reference path="fourslash.ts" />

////{| "itemName": "c", "kind": "let", "parentName": "" |}let c = 10;
////function foo() {
////    {| "itemName": "d", "kind": "let", "parentName": "foo" |}let d = 10;
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