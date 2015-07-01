/// <reference path="fourslash.ts"/>


////import {| "itemName": "d1", "kind": "alias", "parentName": "" |}d1 from "a";
////
////import { {| "itemName": "a", "kind": "alias", "parentName": "" |}a } from "a";
////
////import { {| "itemName": "B", "kind": "alias", "parentName": "" |}b as B } from "a" 
////
////import {| "itemName": "d2", "kind": "alias", "parentName": "" |}d2,
////            { {| "itemName": "c", "kind": "alias", "parentName": "" |}c,
////            {| "itemName": "D", "kind": "alias", "parentName": "" |} d as D } from "a" 
////
////{| "itemName": "e", "kind": "alias", "parentName": "" |}import e = require("a");
////
////import {| "itemName": "ns", "kind": "alias", "parentName": "" |}* as ns from "a";


test.markers().forEach((marker) => {
    if (marker.data) {
        verify.getScriptLexicalStructureListContains(marker.data.itemName, marker.data.kind, marker.fileName, marker.data.parentName);
    }
});

verify.getScriptLexicalStructureListCount(9);
