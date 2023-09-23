/// <reference path="fourslash.ts" />

////class C1 {
////    method(map: Map<string, string>, key: string, defaultValue: string) {
////        try {
////            return map.get(key)!;
////        }
////        catch {
////            return default/*1*/
////        }
////    }
////}
////class C2 {
////    method(map: Map<string, string>, key: string, defaultValue: string) {
////        if (map.has(key)) {
////            return map.get(key)!;
////        }
////        else {
////            return default/*2*/
////        }
////    }
////}
////class C3 {
////    method(map: Map<string, string>, key: string, returnValue: string) {
////        try {
////            return map.get(key)!;
////        }
////        catch {
////            return return/*3*/
////        }
////    }
////}
////class C4 {
////    method(map: Map<string, string>, key: string, returnValue: string) {
////        if (map.has(key)) {
////            return map.get(key)!;
////        }
////        else {
////            return return/*4*/
////        }
////    }
////}

verify.completions({
    marker: ["1", "2"],
    includes: [{ name: "defaultValue", sortText: completion.SortText.LocationPriority }]
}, {
    marker: ["3", "4"],
    includes: [{ name: "returnValue", sortText: completion.SortText.LocationPriority }]
});
