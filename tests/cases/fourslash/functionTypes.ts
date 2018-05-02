/// <reference path='fourslash.ts'/>

////var f: Function;
////function g() { }
////
////class C {
////    h: () => void ;
////    i(): number { return 5; }
////    static j = (e) => e;
////    static k() { return 'hi';}
////}
////var l = () => void 0;
////var z = new C;
////
////f./*1*/apply(this, [1]);
////g./*2*/arguments;
////z.h./*3*/bind(undefined, 1, 2);
////z.i./*4*/call(null)
////C.j./*5*/length === 1;
////typeof C.k./*6*/caller === 'function';
////l./*7*/prototype = Object.prototype;

verify.noErrors();
verify.completionsAt(test.markerNames(), ["apply", "call", "bind", "toString", "prototype", "length", "arguments", "caller" ]);
