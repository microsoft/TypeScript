/// <reference path='fourslash.ts'/>

////var /*1*/x: {
////    func1(x: number): number;         // Method signature
////    func2: (x: number) => number;     // Function type literal
////    func3: { (x: number): number };   // Object type literal
////};
////
////x.func1 = x.func2 = x.func3;
////
////var /*2*/y: {
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
verify.quickInfos({
    1: "var x: {\n    func1(x: number): number;\n    func2: (x: number) => number;\n    func3: {\n        (x: number): number;\n    };\n}",
    2: "var y: {\n    func4(x: number): number;\n    func4(s: string): string;\n    func5: {\n        (x: number): number;\n        (s: string): string;\n    };\n}"
});
