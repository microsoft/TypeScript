/// <reference path="fourslash.ts"/>

/////// Module
////{| "itemName": "Shapes", "kind": "module", "parentName": "" |}module Shapes {
////
////    // Class
////    {| "itemName": "Point", "kind": "class", "parentName": "Shapes" |}export class Point {
////        // Instance member
////        {| "itemName": "origin", "kind": "property", "parentName": "Point", "matchKind": "exact"|}private origin = 0.0;
////        
////        {| "itemName": "distFromZero", "kind": "property", "parentName": "Point", "matchKind": "exact"|}private distFromZero = 0.0;
////
////        // Getter
////        {| "itemName": "distance", "kind": "getter", "parentName": "Point", "matchKind": "exact" |}get distance(): number { return 0; }
////    }
////}
////
////// Local variables
////{| "itemName": "point", "kind": "var", "parentName": "", "matchKind": "exact"|}var point = new Shapes.Point();

//// Testing for exact matching of navigationItems

test.markers().forEach((marker) => {
    if (marker.data) {
        verify.navigationItemsListContains(marker.data.itemName, marker.data.kind, marker.data.itemName, marker.data.matchKind, marker.fileName, marker.data.parentName);
    }
});
