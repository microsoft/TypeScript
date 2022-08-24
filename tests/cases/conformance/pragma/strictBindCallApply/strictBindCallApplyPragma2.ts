// @strictBindCallApply: true
// @filename: file1.ts
// @ts-strictBindCallApply
export function f1(x: string) {}
f1.call(undefined, 42); // wrong
f1.call(undefined, "ok"); // right

// @filename: file2.ts
// @ts-strictBindCallApply true
export function f1(x: string) {}
f1.call(undefined, 42); // wrong
f1.call(undefined, "ok"); // right

// @filename: file3.ts
// @ts-strictBindCallApply false
export function f1(x: string) {}
f1.call(undefined, 42); // wrong
f1.call(undefined, "ok"); // right

// @filename: file4.ts
export function f1(x: string) {}
f1.call(undefined, 42); // wrong
f1.call(undefined, "ok"); // right
