/// <reference path='fourslash.ts'/>

////var x/*1*/: {
////    func1(x: number): number;         // Method signature
////    func2: (x: number) => number;     // Function type literal
////    func3: { (x: number): number };   // Object type literal
////};
////
////x.func1 = x.func2 = x.func3;
////
////var y/*2*/: {
////    func4(x: number): number;
////    func4(s: string): string;
////    func5: {
////        (x: number): number;
////        (s: string): string;
////    };
////};
////
////y.func4 = y.func5;
////y.func5 = y.func4;

verify.not.errorExistsAfterMarker('1');
goTo.marker('1');
verify.quickInfoIs('{ func1(x: number): number; func2: (x: number) => number; func3: (x: number) => number; }');

goTo.marker('2');
verify.quickInfoIs('{ func4(x: number): number; func4(s: string): string; func5: { (x: number): number; (s: string): string; }; }');

