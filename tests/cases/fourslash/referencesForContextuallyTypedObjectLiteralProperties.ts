/// <reference path='fourslash.ts'/>

////interface IFoo { /*xy*/xy: number; }
////
////// Assignment
////var a1: IFoo = { xy: 0 };
////var a2: IFoo = { xy: 0 };
////
////// Function call
////function consumer(f: IFoo) { }
////consumer({ xy: 1 });
////
////// Type cast
////var c = <IFoo>{ xy: 0 };
////
////// Array literal
////var ar: IFoo[] = [{ xy: 1 }, { xy: 2 }];
////
////// Nested object literal
////var ob: { ifoo: IFoo } = { ifoo: { xy: 0 } };
////
////// Widened type
////var w: IFoo = { xy: undefined };
////
////// Untped -- should not be included
////var u = { xy: 0 };

verify.baselineFindAllReferences('xy')
