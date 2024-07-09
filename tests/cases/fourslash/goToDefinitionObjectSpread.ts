/// <reference path='fourslash.ts'/>

////interface A1 { /*1*/a: number };
////interface A2 { /*2*/a?: number };
////let a1: A1;
////let a2: A2;
////let a12 = { ...a1, ...a2 };
////a12.[|a/*3*/|];
verify.baselineGoToDefinition('3');
