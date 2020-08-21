// @pedanticSafeAny: true

declare const a: any

a.a;
a["a"];
a.a.a;

a.a = 1;
a["a"] = 1;
a.a.a = 1;