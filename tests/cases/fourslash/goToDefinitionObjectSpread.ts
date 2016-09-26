/// <reference path='fourslash.ts'/>

////interface A1 { /*1*/a: number };
////interface A2 { /*2*/a?: number };
////let a12: { ...A1, ...A2 };
////a12.a/*3*/;
verify.goToDefinition('3', [ '1', '2' ]);
