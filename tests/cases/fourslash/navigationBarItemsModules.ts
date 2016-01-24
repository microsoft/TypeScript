
////{| "itemName": "\"X.Y.Z\"", "kind": "module" |}
////declare module "X.Y.Z" {
////}
////
////{| "itemName": "'X2.Y2.Z2'", "kind": "module" |}
////declare module 'X2.Y2.Z2' {
////}
////
////{| "itemName": "A.B.C", "kind": "module" |}
////module A.B.C {
////    {| "itemName": "x", "kind": "var", "parentName": "A.B.C" |}
////    export var x;
////}
////
////{| "itemName": "A.B", "kind": "module" |}
////module A.B {
////    {| "itemName": "y", "kind": "var", "parentName": "A.B" |}
////    export var y;
////}
////
////{| "itemName": "A", "kind": "module" |}
////module A {
////    {| "itemName": "z", "kind": "var", "parentName": "A" |}
////    export var z;
////}
////
////{| "itemName": "A", "kind": "module" |}
////module A {
////    {| "itemName": "B", "kind": "module", "parentName": "E" |}
////    module B {
////        {| "itemName": "C", "kind": "module", "parentName": "F" |}
////        module C {
////            {| "itemName": "x", "kind": "var", "parentName": "C" |}
////            declare var x;
////        }
////    }
////}


test.markers().forEach((marker) => {
    verify.getScriptLexicalStructureListContains(marker.data.itemName, marker.data.kind, marker.fileName, marker.data.parentName);
});

/// We have 8 module keywords, and 4 var keywords.
/// The declarations of A.B.C.x do not get merged, so the 4 vars are independent.
/// The two 'A' modules, however, do get merged, so in reality we have 7 modules.
verify.getScriptLexicalStructureListCount(11);
