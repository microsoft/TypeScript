/// <reference path="fourslash.ts" />

////`/*0*/ /*1*/$ /*2*/{ /*3*/$/*4*/{ 10 + 1.1 }/*5*/ 12312/*6*/`
////
////`asdasd$/*7*/{ 2 + 1.1 }/*8*/ 12312 /*9*/{/*10*/

verify.completions({ marker: test.markers(), exact: undefined });
