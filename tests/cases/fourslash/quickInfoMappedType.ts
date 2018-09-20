/// <reference path="./fourslash.ts"/>

////interface I {
////  /** m documentation */ m(): void;
////}
////declare const o: { [K in keyof I]: number };
////o.m/*0*/;
////
////declare const p: { [K in keyof I]: I[K] };
////p.m/*1*/;
////
////declare const q: Pick<I, "m">;
////q.m/*2*/;

verify.quickInfoAt("0", "(property) m: number", "m documentation");
verify.quickInfoAt("1", "(method) m(): void", "m documentation");
verify.quickInfoAt("2", "(method) m(): void", "m documentation");
