/// <reference path="fourslash.ts" />

////export { {| "itemName": "a", "kind": "alias", "parentName": "" |}a }  from "a";
////
////export { {| "itemName": "B", "kind": "alias", "parentName": "" |}b as B }  from "a";
////
////export { {| "itemName": "c", "kind": "alias", "parentName": "" |}c,
////            {| "itemName": "D", "kind": "alias", "parentName": "" |}d as D }  from "a";
////
////{| "itemName": "f", "kind": "alias", "parentName": "" |}export import f = require("a");

test.markers().forEach(marker => {
    verify.navigationItemsListContains(
        marker.data.itemName,
        marker.data.kind,
        marker.data.itemName,
        "exact",
        marker.fileName,
        marker.data.parentName);
});