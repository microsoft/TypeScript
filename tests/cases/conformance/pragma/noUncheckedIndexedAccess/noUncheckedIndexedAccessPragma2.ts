// @strict: true
// @noUncheckedIndexedAccess: true
// @filename: file1.ts
// @ts-noUncheckedIndexedAccess
interface A {
    [index: string]: string;
}
declare var a: A;
export const x: string = a.something;

// @filename: file2.ts
// @ts-noUncheckedIndexedAccess true
interface A {
    [index: string]: string;
}
declare var a: A;
export const x: string = a.something;

// @filename: file3.ts
// @ts-noUncheckedIndexedAccess false
interface A {
    [index: string]: string;
}
declare var a: A;
export const x: string = a.something;

// @filename: file4.ts
interface A {
    [index: string]: string;
}
declare var a: A;
export const x: string = a.something;
