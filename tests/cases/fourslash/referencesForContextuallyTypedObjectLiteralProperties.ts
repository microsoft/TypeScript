/// <reference path='fourslash.ts'/>

////interface IFoo { [|[|{| "isDefinition": true, "contextRangeIndex": 0 |}xy|]: number;|] }
////
////// Assignment
////var a1: IFoo = { [|[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}xy|]: 0|] };
////var a2: IFoo = { [|[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 4 |}xy|]: 0|] };
////
////// Function call
////function consumer(f: IFoo) { }
////consumer({ [|[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 6 |}xy|]: 1|] });
////
////// Type cast
////var c = <IFoo>{ [|[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 8 |}xy|]: 0|] };
////
////// Array literal
////var ar: IFoo[] = [{ [|[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 10 |}xy|]: 1|] }, { [|[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 12 |}xy|]: 2|] }];
////
////// Nested object literal
////var ob: { ifoo: IFoo } = { ifoo: { [|[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 14 |}xy|]: 0|] } };
////
////// Widened type
////var w: IFoo = { [|[|{| "isWriteAccess": true, "isDefinition": true, "type": "undefined", "contextRangeIndex": 16 |}xy|]: undefined|] };
////
////// Untped -- should not be included
////var u = { xy: 0 };

verify.singleReferenceGroup("(property) IFoo.xy: number", "xy");
