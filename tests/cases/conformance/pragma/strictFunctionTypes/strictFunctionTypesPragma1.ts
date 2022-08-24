// @filename: file1.ts
// @ts-strictFunctionTypes
export let a = (arg: string) => 0;
export let b = (arg: unknown) => 0;

a = b;
b = a;

// @filename: file2.ts
// @ts-strictFunctionTypes true
export let a = (arg: string) => 0;
export let b = (arg: unknown) => 0;

a = b;
b = a;

// @filename: file3.ts
// @ts-strictFunctionTypes false
export let a = (arg: string) => 0;
export let b = (arg: unknown) => 0;

a = b;
b = a;

// @filename: file4.ts
export let a = (arg: string) => 0;
export let b = (arg: unknown) => 0;

a = b;
b = a;
