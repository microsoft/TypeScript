/// <reference path='fourslash.ts'/>

////interface IFoo { [|{| "isDefinition": true |}xy|]: number; }
////
////// Assignment
////var a1: IFoo = { [|{| "isWriteAccess": true, "isDefinition": true |}xy|]: 0 };
////var a2: IFoo = { [|{| "isWriteAccess": true, "isDefinition": true |}xy|]: 0 };
////
////// Function call
////function consumer(f: IFoo) { }
////consumer({ [|{| "isWriteAccess": true, "isDefinition": true |}xy|]: 1 });
////
////// Type cast
////var c = <IFoo>{ [|{| "isWriteAccess": true, "isDefinition": true |}xy|]: 0 };
////
////// Array literal
////var ar: IFoo[] = [{ [|{| "isWriteAccess": true, "isDefinition": true |}xy|]: 1 }, { [|{| "isWriteAccess": true, "isDefinition": true |}xy|]: 2 }];
////
////// Nested object literal
////var ob: { ifoo: IFoo } = { ifoo: { [|{| "isWriteAccess": true, "isDefinition": true |}xy|]: 0 } };
////
////// Widened type
////var w: IFoo = { [|{| "isWriteAccess": true, "isDefinition": true, "type": "undefined" |}xy|]: undefined };
////
////var u = { [|{| "isWriteAccess": true, "isDefinition": true |}xy|]: 0 };

const [r0, r1, r2, r3, r4, r5, r6, r7, r8, r9] = test.ranges();
verify.referenceGroups([r0, r1, r2, r3, r4, r5, r6, r7, r8], [
    { definition: "(property) IFoo.xy: number", ranges: [r0, r1, r2, r3, r4, r5, r6, r7, r8] },
    { definition: "(property) xy: number", ranges: [r9] },
]);
verify.referenceGroups(r9, [
    { definition: "(property) IFoo.xy: number", ranges: [r0] },
    { definition: "(property) xy: number", ranges: [r1, r2, r3, r4, r5, r6, r7, r9] },
]);
