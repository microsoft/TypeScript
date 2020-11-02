/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true

////import d from "foo";
////import d2, { used1 } from "foo";
////import { x } from "foo";
////import { x2, used2 } from "foo";
////used1; used2;
////
////function f(a, b) {
////    const x = 0;
////}
////function g(a, b, c) { return a; }
////f; g;
////
////interface I {
////    m(x: number): void;
////}
////
////class C implements I {
////    m(x: number): void {} // Does not remove 'x', which is inherited
////    n(x: number): void {}
////    private ["o"](): void {}
////}
////C;
////
////declare function takesCb(cb: (x: number, y: string) => void): void;
////takesCb((x, y) => {});
////takesCb((x, y) => { x; });
////takesCb((x, y) => { y; });
////
////function fn1(x: number, y: string): void {}
////takesCb(fn1);
////
////function fn2(x: number, y: string): void { x; }
////takesCb(fn2);
////
////function fn3(x: number, y: string): void { y; }
////takesCb(fn3);
////
////x => {
////    const y = 0;
////};
////
////{
////    let a, b;
////}
////for (let i = 0, j = 0; ;) {}
////for (const x of []) {}
////for (const y in {}) {}
////
////export type First<T, U> = T;
////export interface ISecond<T, U> { u: U; }
////export const cls = class<T, U> { u: U; };
////export class Ctu<T, U> {}
////export type Length<T> = T extends ArrayLike<infer U> ? number : never; // Not affected, can't delete

verify.codeFixAll({
    fixId: "unusedIdentifier_deleteImports",
    fixAllDescription: ts.Diagnostics.Delete_all_unused_imports.message,
    newFileContent:
`import { used1 } from "foo";
import { used2 } from "foo";
used1; used2;

function f(a, b) {
    const x = 0;
}
function g(a, b, c) { return a; }
f; g;

interface I {
    m(x: number): void;
}

class C implements I {
    m(x: number): void {} // Does not remove 'x', which is inherited
    n(x: number): void {}
    private ["o"](): void {}
}
C;

declare function takesCb(cb: (x: number, y: string) => void): void;
takesCb((x, y) => {});
takesCb((x, y) => { x; });
takesCb((x, y) => { y; });

function fn1(x: number, y: string): void {}
takesCb(fn1);

function fn2(x: number, y: string): void { x; }
takesCb(fn2);

function fn3(x: number, y: string): void { y; }
takesCb(fn3);

x => {
    const y = 0;
};

{
    let a, b;
}
for (let i = 0, j = 0; ;) {}
for (const x of []) {}
for (const y in {}) {}

export type First<T, U> = T;
export interface ISecond<T, U> { u: U; }
export const cls = class<T, U> { u: U; };
export class Ctu<T, U> {}
export type Length<T> = T extends ArrayLike<infer U> ? number : never; // Not affected, can't delete`,
});
