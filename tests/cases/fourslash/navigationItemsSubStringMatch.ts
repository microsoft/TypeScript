/// <reference path="fourslash.ts"/>

/////// Module
////{| "itemName": "MyShapes", "kind": "module", "parentName": "", "matchKind": "substring" |}module MyShapes {
////
////    // Class
////    {| "itemName": "MyPoint", "kind": "class", "parentName": "MyShapes", "matchKind": "substring" |}export class MyPoint {
////        // Instance member
////        {| "itemName": "MyoriginPointAttheHorizon", "kind": "property", "parentName": "MyPoint", "matchKind": "substring"|}private MyoriginPointAttheHorizon = 0.0;
////
////        // Getter
////        {| "itemName": "MydistanceFromOrigin", "kind": "getter", "parentName": "MyPoint", "matchKind": "substring" |}get MydistanceFromOrigin(): number { return 0; }
////
////    }
////}
////
////// Local variables
////{| "itemName": "MymyPointThatIJustInitiated", "kind": "var", "parentName": "", "matchKind": "substring"|}var MymyPointThatIJustInitiated = new Shapes.Point();

test.markers().forEach((marker) => {
    if (marker.data) {
        var name = marker.data.itemName;
        verify.navigationItemsListContains(name, marker.data.kind, name.substr(2), marker.data.matchKind, marker.fileName, marker.data.parentName);
    }
});