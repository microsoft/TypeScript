/// <reference path="fourslash.ts"/>

/////// Module
////{| "itemName": "Shapes", "kind": "module", "parentName": "", "matchKind": "substring" |}module Shapes {
////
////    // Class
////    {| "itemName": "Point", "kind": "class", "parentName": "Shapes", "matchKind": "substring" |}export class Point {
////        // Instance member
////        {| "itemName": "originPointAttheHorizon", "kind": "property", "parentName": "Point", "matchKind": "substring"|}private originPointAttheHorizon = 0.0;
////
////        // Getter
////        {| "itemName": "distanceFromOrigin", "kind": "getter", "parentName": "Point", "matchKind": "substring" |}get distanceFromOrigin(): number { return 0; }
////
////    }
////}
////
////// Local variables
////{| "itemName": "myPointThatIJustInitiated", "kind": "var", "parentName": "", "matchKind": "substring"|}var myPointThatIJustInitiated = new Shapes.Point();

//// Testing for substring matching of navigationItems
//var searchValue = "FromOrigin horizon INITIATED Shape Point";

test.markers().forEach((marker) => {
    if (marker.data) {
        var name = marker.data.itemName;
        verify.navigationItemsListContains(name, marker.data.kind, name.substr(1), marker.data.matchKind, marker.fileName, marker.data.parentName);
    }
});