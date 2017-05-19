/// <reference path='fourslash.ts'/>

////interface IFoo { [|{| "isWriteAccess": true, "isDefinition": true |}xy|]: number; }
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
////// Untped -- should not be included
////var u = { xy: 0 };

const ranges = test.ranges();
verify.referenceGroups(ranges[0], [{ definition: "(property) IFoo.xy: number", ranges }]);
for (const range of ranges.slice(1)) {
    const type = range.marker.data.type || "number";
    verify.referenceGroups(range, [
        { definition: "(property) IFoo.xy: number", ranges: ranges.filter(r => r !== range) },
        { definition: `(property) xy: ${type}`, ranges: [range] }
    ]);
}
