/// <reference path="./fourslash.ts"/>

////interface I { m(): void; }
////declare const o: { [K in keyof I]: number };
////o.m/*0*/;
////
////declare const p: { [K in keyof I]: I[K] };
////p.m/*1*/;

verify.quickInfoAt("0", "(property) m: number");
verify.quickInfoAt("1", "(method) m(): void");
