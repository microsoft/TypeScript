// @noPropertyAccessFromIndexSignature: true
// @filename: file1.ts
// @ts-noPropertyAccessFromIndexSignature
interface A {
    [idx: string]: string;
}
declare var a: A;
export const b = a.something;

// @filename: file2.ts
// @ts-noPropertyAccessFromIndexSignature true
interface A {
    [idx: string]: string;
}
declare var a: A;
export const b = a.something;

// @filename: file3.ts
// @ts-noPropertyAccessFromIndexSignature false
interface A {
    [idx: string]: string;
}
declare var a: A;
export const b = a.something;

// @filename: file4.ts
interface A {
    [idx: string]: string;
}
declare var a: A;
export const b = a.something;
