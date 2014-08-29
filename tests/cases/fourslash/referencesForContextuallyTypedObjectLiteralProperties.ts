/// <reference path='fourslash.ts'/>

////interface IFoo { /*1*/xy: number; }
////
////// Assignment
////var a1: IFoo = { /*2*/xy: 0 };
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
////var ar: IFoo[] = [{ xy: 1 }, { /*3*/xy: 2 }];
////
////// Nested object literal
////var ob: { ifoo: IFoo } = { ifoo: { xy: 0 } };
////
////// Widened type
////var w: IFoo = { /*4*/xy: undefined };
////
////// Untped -- should not be included
////var u = { xy: 0 };


test.markers().forEach((m) => {
    goTo.position(m.position, m.fileName);
    verify.referencesCountIs(9);
});
