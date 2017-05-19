/// <reference path='fourslash.ts'/>

////class Base<T> {
////    [|{| "isWriteAccess": true, "isDefinition": true |}a|]: this;
////    [|{| "isWriteAccess": true, "isDefinition": true |}method|]<U>(a?:T, b?:U): this { }
////}
////class MyClass extends Base<number> {
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
verify.referenceGroups(a0, [{ definition: "(property) Base<T>.a: this", ranges: properties }]);
verify.referenceGroups([a1, a2], [
    { definition: "(property) Base<T>.a: this", ranges: [a0] },
    { definition: "(property) MyClass.a: any", ranges: [a1, a2] }
]);

const methods = ranges.get("method");
const [m0, m1, m2] = methods;
verify.referenceGroups(m0, [{ definition: "(method) Base<T>.method<U>(a?: T, b?: U): this", ranges: methods }]);
verify.referenceGroups(m1, [
    { definition: "(method) Base<T>.method<U>(a?: T, b?: U): this", ranges: [m0] },
    { definition: "(method) MyClass.method(): void", ranges: [m1, m2] }
]);
verify.referenceGroups(m2, [
    { definition: "(method) Base<T>.method<U>(a?: T, b?: U): this", ranges: [m0] },
    { definition: "(method) MyClass.method(): void", ranges: [m1] },
    { definition: "(method) MyClass.method(): void", ranges: [m2] }
]);
