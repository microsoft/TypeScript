/// <reference path='fourslash.ts'/>

////interface A {
////    a: number;
////    common: string;
////}
////
////interface B {
////    [|{| "isWriteAccess": true, "isDefinition": true |}b|]: number;
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
////// Untped -- should not be included
////var u1 = { a: 0, b: 0, common: "" };
////var u2 = { b: 0, common: 0 };

const ranges = test.ranges();
verify.referenceGroups(ranges[0], [{ definition: "(property) B.b: number", ranges }]);
for (const reference of ranges.slice(1)) {
    const type = reference.marker.data.type;
    verify.referenceGroups(reference, [
        { definition: "(property) B.b: number", ranges: ranges.filter(r => r !== reference) },
        { definition: `(property) b: ${type}`, ranges: [reference] }
    ]);
}
