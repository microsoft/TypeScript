/// <reference path="fourslash.ts" />

////import {| "itemName": "ns", "kind": "alias", "parentName": "" |}* as ns from "a";
////
////import { {| "itemName": "a", "kind": "alias", "parentName": "" |}a }  from "a";
////
////import { {| "itemName": "B", "kind": "alias", "parentName": "" |}b as B }  from "a";
////
////import { {| "itemName": "c", "kind": "alias", "parentName": "" |}c,
////            {| "itemName": "D", "kind": "alias", "parentName": "" |}d as D }  from "a";
////
////import {| "itemName": "d1", "kind": "alias", "parentName": "" |}d1, { 
////            {| "itemName": "e", "kind": "alias", "parentName": "" |}e }  from "a";
////
////{| "itemName": "f", "kind": "alias", "parentName": "" |}import f = require("a");

test.markers().forEach(marker => {
    verify.navigationItemsListContains(
        marker.data.itemName,
        marker.data.kind,
        marker.data.itemName,
        "exact",
        marker.fileName,
        marker.data.parentName);
});