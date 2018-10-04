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
////// Untped -- should not be included
////var u = { xy: 0 };

verify.singleReferenceGroup("(property) IFoo.xy: number");
