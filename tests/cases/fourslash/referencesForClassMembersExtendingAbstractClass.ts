/// <reference path='fourslash.ts'/>

////abstract class Base {
////    abstract [|{| "isWriteAccess": true, "isDefinition": true |}a|]: number;
////    abstract [|{| "isWriteAccess": true, "isDefinition": true |}method|](): void;
////}
////class MyClass extends Base {
////    [|{| "isWriteAccess": true, "isDefinition": true |}a|];
////    [|{| "isWriteAccess": true, "isDefinition": true |}method|]() { }
////}
////
////var c: MyClass;
////c.[|a|];
////c.[|method|]();

const ranges = test.rangesByText();
const properties = ranges.get("a");
const [a0, a1, a2] = properties;
verify.referenceGroups(a0, [{ definition: "(property) Base.a: number", ranges: properties }]);
verify.referenceGroups([a1, a2], [
    { definition: "(property) Base.a: number", ranges: [a0] },
    { definition: "(property) MyClass.a: any", ranges: [a1, a2] }
]);

const methods = ranges.get("method");
const [m0, m1, m2] = methods;
verify.referenceGroups(m0, [{ definition: "(method) Base.method(): void", ranges: methods }]);
verify.referenceGroups(m1, [
    { definition: "(method) Base.method(): void", ranges: [m0] },
    { definition: "(method) MyClass.method(): void", ranges: [m1, m2] }
]);
verify.referenceGroups(m2, [
    { definition: "(method) Base.method(): void", ranges: [m0] },
    { definition: "(method) MyClass.method(): void", ranges: [m1] },
    { definition: "(method) MyClass.method(): void", ranges: [m2] }
]);
