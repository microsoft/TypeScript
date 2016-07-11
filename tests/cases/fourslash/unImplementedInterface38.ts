/// <reference path='fourslash.ts' />

//// abstract class C2 {
////     abstract f1<T extends number>();
//// }
////
//// var x: C2 = { [|  |] }

verify.codeFixAtPosition(`f1<T extends number>(){
    throw new Error('Method not Implemented');
}`);
