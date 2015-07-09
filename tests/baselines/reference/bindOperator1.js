//// [bindOperator1.ts]
declare var a: { b(): number; c(): { b(): boolean; }; };
declare function b(): string;
declare class C { b(): boolean; }

let z = a::b;
let y = a::b();
let x = a::a.b;
let w = a::a.b();
let v = a::a["b"];
let u = a::a["b"]();
let t = a.b::b;
let s = a.b::b();
let r = a["b"]::b;
let q = a["b"]::b();
let p = ::a.b;
let o = ::a.b();
let n = ::a["b"];
let m = ::a["b"]();
let l = a.c()::b;
let k = a.c()::b();
let j = a.c()::a.b;
let i = a.c()::a.b();
let h = a.c()::new C().b;

//// [bindOperator1.js]
var z = (_a = a, b).bind(_a);
var y = (_b = a, b).call(_b);
var x = (_c = a, a.b).bind(_c);
var w = (_d = a, a.b).call(_d);
var v = (_e = a, a["b"]).bind(_e);
var u = (_f = a, a["b"]).call(_f);
var t = (_g = a.b, b).bind(_g);
var s = (_h = a.b, b).call(_h);
var r = (_j = a["b"], b).bind(_j);
var q = (_k = a["b"], b).call(_k);
var p = (_l = a).b.bind(_l);
var o = a.b();
var n = (_m = a)["b"].bind(_m);
var m = a["b"]();
var l = (_o = a.c(), b).bind(_o);
var k = (_p = a.c(), b).call(_p);
var j = (_q = a.c(), a.b).bind(_q);
var i = (_r = a.c(), a.b).call(_r);
var h = (_s = a.c(), new C().b).bind(_s);
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
