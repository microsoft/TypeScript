//// [intersectionTypeInference2.ts]
declare function f<T>(x: { prop: T }): T;

declare const a: { prop: string } & { prop: number };
declare const b: { prop: string & number };

f(a);  // never
f(b);  // never

// Repro from #18354

declare function f2<T, Key extends keyof T>(obj: {[K in keyof T]: T[K]}, key: Key): T[Key];

declare const obj: { a: string } & { b: string };
f2(obj, 'a');
f2(obj, 'b');


//// [intersectionTypeInference2.js]
f(a); // never
f(b); // never
f2(obj, 'a');
f2(obj, 'b');
