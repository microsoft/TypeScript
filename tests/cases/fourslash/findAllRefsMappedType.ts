/// <reference path='fourslash.ts'/>

////interface T { /*1*/a: number; }
////type U = { readonly [K in keyof T]?: string };
////declare const t: T;
////t./*2*/a;
////declare const u: U;
////u./*3*/a;

verify.baselineFindAllReferences('1', '2', '3');
