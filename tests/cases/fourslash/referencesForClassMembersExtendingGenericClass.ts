/// <reference path='fourslash.ts'/>

////class Base<T> {
////    [|{| "isDefinition": true |}a|]: this;
////    [|{| "isWriteAccess": true, "isDefinition": true |}method|]<U>(a?:T, b?:U): this { }
////}
////class MyClass extends Base<number> {
////    [|{| "isDefinition": true |}a|];
////    [|{| "isWriteAccess": true, "isDefinition": true |}method|]() { }
////}
////
////var c: MyClass;
////c.[|a|];
////c.[|method|]();

const ranges = test.rangesByText();
const properties = ranges.get("a");
const [a0, a1, a2] = properties;
verify.referenceGroups(properties, [
    { definition: "(property) Base<T>.a: this", ranges: [a0] },
    { definition: "(property) MyClass.a: any", ranges: [a1, a2] }
]);

const methods = ranges.get("method");
const [m0, m1, m2] = methods;
verify.referenceGroups(methods, [
    { definition: "(method) Base<T>.method<U>(a?: T, b?: U): this", ranges: [m0] },
    { definition: "(method) MyClass.method(): void", ranges: [m1, m2] }
]);
