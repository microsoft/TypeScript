/// <reference path="fourslash.ts"/>

////class Class {
////    constructor() {
////        {| "itemName": "LocalFunctionInConstructor", "kind": "function", "parentName": "constructor"|}function LocalFunctionInConstructor() {
////
////        }
////
////        {| "itemName": "LocalInterfaceInConstrcutor", "kind": "interface", "parentName": ""|}interface LocalInterfaceInConstrcutor {
////        }
////
////        {| "itemName": "LocalEnumInConstructor", "kind": "enum", "parentName": "constructor"|}enum LocalEnumInConstructor {
////            {| "itemName": "LocalEnumMemberInConstructor", "kind": "property", "parentName": "LocalEnumInConstructor"|}LocalEnumMemberInConstructor,
////        }
////    }
////
////    method() {
////        {| "itemName": "LocalFunctionInMethod", "kind": "function", "parentName": "method"|}function LocalFunctionInMethod() {
////            {| "itemName": "LocalFunctionInLocalFunctionInMethod", "kind": "function", "parentName": "LocalFunctionInMethod"|}function LocalFunctionInLocalFunctionInMethod() {
////
////            }
////        }
////
////        {| "itemName": "LocalInterfaceInMethod", "kind": "interface", "parentName": ""|}interface LocalInterfaceInMethod {
////        }
////
////        {| "itemName": "LocalEnumInMethod", "kind": "enum", "parentName": "method"|}enum LocalEnumInMethod {
////            {| "itemName": "LocalEnumMemberInMethod", "kind": "property", "parentName": "LocalEnumInMethod"|}LocalEnumMemberInMethod,
////        }
////    }
////
////    emptyMethod() { // Non child functions method should not be duplicated
////
////    }
////}

test.markers().forEach((marker) => {
    verify.navigationBarContains(marker.data.itemName, marker.data.kind, marker.fileName, marker.data.parentName);
});

// no other items
verify.navigationBarCount(19);
