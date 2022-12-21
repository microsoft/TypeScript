//// [neverIntersectionNotCallable.ts]
declare const f: { (x: string): number, a: "" } & { a: number }
f()


//// [neverIntersectionNotCallable.js]
f();
