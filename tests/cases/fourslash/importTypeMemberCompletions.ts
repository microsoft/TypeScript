/// <reference path="fourslash.ts" />

// @Filename: /ns.ts
////export namespace Foo {
////    export namespace Bar {
////        export class Baz {}
////        export interface Bat {}
////        export const a: number;
////        const b: string;
////    }
////}

// @Filename: /top.ts
////export interface Bat {}
////export const a: number;

// @Filename: /equals.ts
////class Foo {
//// public static bar: string;
//// private static baz: number;
////}
////export = Foo;

// @Filename: /usage1.ts
////type A = typeof import("./ns")./*1*/
// @Filename: /usage2.ts
////type B = typeof import("./ns").Foo./*2*/
// @Filename: /usage3.ts
////type C = typeof import("./ns").Foo.Bar./*3*/
// @Filename: /usage4.ts
////type D = import("./ns")./*4*/
// @Filename: /usage5.ts
////type E = import("./ns").Foo./*5*/
// @Filename: /usage6.ts
////type F = import("./ns").Foo.Bar./*6*/
// @Filename: /usage7.ts
////type G = typeof import("./top")./*7*/
// @Filename: /usage8.ts
////type H = import("./top")./*8*/
// @Filename: /usage9.ts
////type H = typeof import("./equals")./*9*/

verify.completions(
    { marker: "1", exact: "Foo" },
    { marker: "2", exact: "Bar" },
    { marker: "3", exact: ["a", "Baz"] },
    { marker: "4", exact: "Foo" },
    { marker: "5", exact: "Bar" },
    { marker: "6", exact: ["Bat", "Baz"] },
    { marker: "7", exact: "a" },
    { marker: "8", exact: "Bat" },
    { marker: "9", exact: ["bar", "prototype"] },
);
