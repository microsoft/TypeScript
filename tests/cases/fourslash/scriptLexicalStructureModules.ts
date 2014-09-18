
////{| "itemName": "\"X.Y.Z\"", "kind": "module" |}
////declare module "X.Y.Z" {
////}
////
////{| "itemName": "A.B.C", "kind": "module" |}
////module A.B.C {
////    {| "itemName": "x", "kind": "var", "parent": "A.B.C" |}
////    export var x;
////}
////
////{| "itemName": "A.B", "kind": "module" |}
////module A.B {
////    {| "itemName": "y", "kind": "var", "parent": "A.B" |}
////    export var y;
////}
////
////{| "itemName": "A", "kind": "module" |}
////module A {
////    {| "itemName": "z", "kind": "var", "parent": "A" |}
////    export var z;
////}
////
////{| "itemName": "A", "kind": "module" |}
////module A {
////    {| "itemName": "B", "kind": "module", "parent": "E" |}
////    module B {
////        {| "itemName": "C", "kind": "module", "parent": "F" |}
////        module C {
////            {| "itemName": "x", "kind": "var", "parent": "C" |}
////            declare var x;
////        }
////    }
////}


test.markers().forEach((marker) => {
    verify.getScriptLexicalStructureListContains(marker.data.itemName, marker.data.kind, marker.fileName, marker.data.parentName);
});

/// We have 7 module keywords, and 4 var keywords.
/// The declarations of A.B.C.x do not get merged, so the 4 vars are independent.
/// The two 'A' modules, however, do get merged, so in reality we have 6 modules.
verify.getScriptLexicalStructureListCount(10);
