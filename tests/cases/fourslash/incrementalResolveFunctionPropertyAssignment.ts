/// <reference path="fourslash.ts" />

////function bar(indexer: { getLength(): number; getTypeAtIndex(index: number): string; }): string {
////    return indexer.getTypeAtIndex(indexer.getLength() - 1);
////}
////function foo(a: string[]) {
////    return bar({
////        getLength(): number {
////            return "a.length";
////        },
////        getTypeAtIndex(index: number) {
////            switch (index) {
////                case 0: return a[0];
////                case 1: return a[1];
////                case 2: return a[2];
////                default: return "invalid";
////            }
////        }
////    });
////}
////var val = foo(["myString1", "myString2"]);
/////*1*/val;

verify.quickInfoAt("1", "var val: string");

// TypeCheck
verify.numberOfErrorsInCurrentFile(1);