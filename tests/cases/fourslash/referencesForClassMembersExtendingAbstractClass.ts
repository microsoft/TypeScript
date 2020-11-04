/// <reference path='fourslash.ts'/>

////abstract class Base {
////    [|abstract [|{| "isDefinition": true, "contextRangeIndex": 0 |}a|]: number;|]
////    [|abstract [|{| "isDefinition": true, "contextRangeIndex": 2 |}method|](): void;|]
////}
////class MyClass extends Base {
////    [|[|{| "isDefinition": true, "contextRangeIndex": 4 |}a|];|]
////    [|[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 6 |}method|]() { }|]
////}
////
////var c: MyClass;
////c.[|a|];
////c.[|method|]();

const ranges = test.rangesByText();
const properties = ranges.get("a");
const [a0, a1, a2] = properties;
verify.referenceGroups(properties, [
    { definition: "(property) Base.a: number", ranges: [a0] },
    { definition: "(property) MyClass.a: any", ranges: [a1, a2] }
]);

const methods = ranges.get("method");
const [m0, m1, m2] = methods;
verify.referenceGroups(methods, [
    { definition: "(method) Base.method(): void", ranges: [m0] },
    { definition: "(method) MyClass.method(): void", ranges: [m1, m2] }
]);
