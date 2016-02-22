/// <reference path="fourslash.ts"/>

////class Class {
////    constructor() {
////        {| "itemName": "LocalFunctionInConstructor", "kind": "function", "parentName": "Class"|}function LocalFunctionInConstructor() {
////
////        }
////
////        {| "itemName": "LocalInterfaceInConstrcutor", "kind": "interface", "parentName": "foo"|}interface LocalInterfaceInConstrcutor {
////        }
////
////        enum LocalEnumInConstructor {
////            {| "itemName": "LocalEnumMemberInConstructor", "kind": "property", "parentName": "LocalEnumInConstructor"|}LocalEnumMemberInConstructor,
////        }
////    }
////    method() {
////        {| "itemName": "LocalFunctionInMethod", "kind": "function", "parentName": "foo"|}function LocalFunctionInMethod() {
////            {| "itemName": "LocalFunctionInLocalFunctionInMethod", "kind": "function", "parentName": "bar"|}function LocalFunctionInLocalFunctionInMethod() {
////
////            }
////        }
////
////        {| "itemName": "LocalInterfaceInMethod", "kind": "interface", "parentName": "foo"|}interface LocalInterfaceInMethod {
////        }
////
////        enum LocalEnumInMethod {
////            {| "itemName": "LocalEnumMemberInMethod", "kind": "property", "parentName": "foo"|}LocalEnumMemberInMethod,
////        }
////    }
////}

test.markers().forEach((marker) => {
    verify.getScriptLexicalStructureListContains(marker.data.itemName, marker.data.kind, marker.fileName, marker.data.parentName);
});

// no other items
verify.getScriptLexicalStructureListCount(12);
