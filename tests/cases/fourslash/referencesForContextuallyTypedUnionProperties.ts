/// <reference path='fourslash.ts'/>

////interface A {
////    a: number;
////    [|{| "isDefinition": true |}common|]: string;
////}
////
////interface B {
////    b: number;
////    [|{| "isDefinition": true |}common|]: number;
////}
////
////// Assignment
////var v1: A | B = { a: 0, [|{| "isWriteAccess": true, "isDefinition": true, "type": "string" |}common|]: "" };
////var v2: A | B = { b: 0, [|{| "isWriteAccess": true, "isDefinition": true, "type": "number" |}common|]: 3 };
////
////// Function call
////function consumer(f:  A | B) { }
////consumer({ a: 0, b: 0, [|{| "isWriteAccess": true, "isDefinition": true, "type": "number" |}common|]: 1 });
////
////// Type cast
////var c = <A | B> { [|{| "isWriteAccess": true, "isDefinition": true, "type": "number" |}common|]: 0, b: 0 };
////
////// Array literal
////var ar: Array<A|B> = [{ a: 0, [|{| "isWriteAccess": true, "isDefinition": true, "type": "string" |}common|]: "" }, { b: 0, [|{| "isWriteAccess": true, "isDefinition": true, "type": "number" |}common|]: 0 }];
////
////// Nested object literal
////var ob: { aorb: A|B } = { aorb: { b: 0, [|{| "isWriteAccess": true, "isDefinition": true, "type": "number" |}common|]: 0 } };
////
////// Widened type
////var w: A|B = { a:0, [|{| "isWriteAccess": true, "isDefinition": true, "type": "undefined" |}common|]: undefined };
////
////var u1 = { a: 0, b: 0, common: "" }; // Does not match 'A or 'B'
////var u2 = { b: 0, [|{| "isWriteAccess": true, "isDefinition": true |}common|]: 0 }; // Matches 'B'

const [aCommon, bCommon, u0, u1, u2, u3, u4, u5, u6, u7, last] = test.ranges();
const unionRefs = [u0, u1, u2, u3, u4, u5, u6, u7];
verify.referenceGroups(aCommon, [
    { definition: "(property) A.common: string", ranges: [aCommon] },
    { definition: "(property) common: string | number", ranges: unionRefs },
]);
verify.referenceGroups(bCommon, [
    { definition: "(property) B.common: number", ranges: [bCommon] },
    { definition: "(property) common: string | number", ranges: unionRefs },
    { definition: "(property) common: number", ranges: [last] },
]);
verify.referenceGroups(unionRefs, [
    { definition: "(property) A.common: string", ranges: [aCommon] },
    { definition: "(property) B.common: number", ranges: [bCommon] },
    { definition: `(property) common: string | number`, ranges: unionRefs },
    { definition: "(property) common: number", ranges: [last] },
]);
verify.referenceGroups(last, [
    { definition: "(property) B.common: number", ranges: [bCommon] },
    { definition: "(property) common: number", ranges: [u1, u3, u5, u6, last] },
]);
