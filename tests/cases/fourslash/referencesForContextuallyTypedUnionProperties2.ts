/// <reference path='fourslash.ts'/>

////interface A {
////    a: number;
////    common: string;
////}
////
////interface B {
////    [|{| "isDefinition": true |}b|]: number;
////    common: number;
////}
////
////// Assignment
////var v1: A | B = { a: 0, common: "" };
////var v2: A | B = { [|{| "isWriteAccess": true, "isDefinition": true, "type": "number" |}b|]: 0, common: 3 };
////
////// Function call
////function consumer(f:  A | B) { }
////consumer({ a: 0, [|{| "isWriteAccess": true, "isDefinition": true, "type": "number" |}b|]: 0, common: 1 });
////
////// Type cast
////var c = <A | B> { common: 0, [|{| "isWriteAccess": true, "isDefinition": true, "type": "number" |}b|]: 0 };
////
////// Array literal
////var ar: Array<A|B> = [{ a: 0, common: "" }, { [|{| "isWriteAccess": true, "isDefinition": true, "type": "number" |}b|]: 0, common: 0 }];
////
////// Nested object literal
////var ob: { aorb: A|B } = { aorb: { [|{| "isWriteAccess": true, "isDefinition": true, "type": "number" |}b|]: 0, common: 0 } };
////
////// Widened type
////var w: A|B = { [|{| "isWriteAccess": true, "isDefinition": true, "type": "undefined" |}b|]:undefined, common: undefined };
////
////var u1 = { a: 0, b: 0, common: "" }; // Object type doesn't match 'B'
////var u2 = { [|{| "isWriteAccess": true, "isDefinition": true |}b|]: 0, common: 0 }; // Object type matches 'B'

const [r0, r1, r2, r3, r4, r5, r6, r7, r8] = test.ranges();
verify.referenceGroups([r0, r1, r2, r3, r4, r5, r6], [
    { definition: "(property) B.b: number", ranges: [r0, r1, r2, r3, r4, r5, r6] },
    { definition: "(property) b: number", ranges: [r7] },
]);
verify.referenceGroups(r7, [
    { definition: "(property) B.b: number", ranges: [r0] },
    { definition: "(property) b: number", ranges: [r1, r3, r4, r5, r7] }
]);
