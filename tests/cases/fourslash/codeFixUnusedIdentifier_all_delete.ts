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
    fixId: "unusedIdentifier_delete",
    fixAllDescription: "Delete all unused declarations",
    newFileContent:
`import { used1 } from "foo";
import { used2 } from "foo";
used1; used2;

function f() {
}
function g(a) { return a; }
f; g;

interface I {
    m(x: number): void;
}

class C implements I {
    m(x: number): void {} // Does not remove 'x', which is inherited
    n(): void {}
}
C;

declare function takesCb(cb: (x: number, y: string) => void): void;
takesCb(() => {});
takesCb((x) => { x; });
takesCb((x, y) => { y; });

{
}
for (; ;) {}
for (const {} of []) {}
for (const {} in {}) {}

export type First<T> = T;
export interface ISecond<U> { u: U; }
export const cls = class<U> { u: U; };
export class Ctu {}
export type Length<T> = T extends ArrayLike<infer U> ? number : never; // Not affected, can't delete`,
});
