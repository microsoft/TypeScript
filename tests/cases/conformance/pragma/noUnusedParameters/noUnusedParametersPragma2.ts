// @noUnusedParameters: true
// @filename: file1.ts
// @ts-noUnusedParameters
export function f1(x: number) {}

// @filename: file2.ts
// @ts-noUnusedParameters true
export function f1(x: number) {}

// @filename: file3.ts
// @ts-noUnusedParameters false
export function f1(x: number) {}

// @filename: file4.ts
export function f1(x: number) {}
