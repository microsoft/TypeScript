//// [pedanticSafeAny1.ts]
declare const a: any

a.a;
a["a"];
a.a.a;

a.a = 1;
a["a"] = 1;
a.a.a = 1;

//// [pedanticSafeAny1.js]
a.a;
a["a"];
a.a.a;
a.a = 1;
a["a"] = 1;
a.a.a = 1;
