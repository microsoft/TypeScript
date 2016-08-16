/// <reference path="../fourslash.ts"/>

////interface I1 {}
////[|class c1<T extends string , U> extends I1|]{public x: T; public y: U; }

verify.codeFixAtPosition("class c1<T extends string , U> implements I1");