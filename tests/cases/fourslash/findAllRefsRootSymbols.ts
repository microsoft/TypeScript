/// <reference path="fourslash.ts" />

////interface I { /*0*/x: {}; }
////interface J { /*1*/x: {}; }
////declare const o: (I | J) & { /*2*/x: string };
////o./*3*/x;

verify.baselineFindAllReferences('0', '1', '2', '3')
