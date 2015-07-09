// @target: es5
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