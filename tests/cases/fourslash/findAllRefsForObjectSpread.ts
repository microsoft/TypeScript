/// <reference path='fourslash.ts'/>

////interface A1 { readonly /*0*/a: string };
////interface A2 { /*1*/a?: number };
////let a1: A1;
////let a2: A2;
////let a12 = { ...a1, ...a2 };
////a12./*2*/a;
////a1./*3*/a;

const [r0Def, r0, r1Def, r1, r2, r3] = test.ranges();

verify.baselineFindAllReferences('0', '1', '2', '3')
