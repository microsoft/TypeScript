/// <reference path='fourslash.ts'/>

// @filename: /1.ts
//// export {};
//// class Foo<T> {
////     y: string;
//// }
//// namespace Foo/*1*/ {
////     export var y: number = 1;
////     export var x: string = "hello";
////     export var w = "world";
////     var z = 2;
//// }

// @filename: /2.ts
//// export namespace Foo {
////     export var y: number = 1;
////     export var x: string = "hello";
//// }

// @filename: /3.ts
//// import * as Foo_1 from "./b";
//// export declare namespace ns/*2*/ {
////     import Foo = Foo_1.Foo;
////     export { Foo };
////     export const c: number;
////     export const d = 1;
////     let e: Apple;
////     export let f: Apple;
//// }
//// interface Apple {
////     a: string;
//// }

// @filename: /4.ts
//// class Foo<T> {
////     y!: T;
//// }
//// namespace Two/*3*/ {
////     export const f = new Foo<number>();
//// }

// @filename: /5.ts
//// namespace Two {
////     export const g = new Foo<string>();
//// }

// @filename: /6.ts
//// namespace OnlyLocal/*4*/ {
////     const bar: number;
//// }

// @filename: foo.ts
//// export function foo() { return "foo"; }
//// import("/*5*/./foo")
//// var x = import("./foo")

verify.baselineQuickInfo({
    1: [0, 1],
    2: [0, 1, 2],
    3: [0, 1, 2],
    4: [0, 1],
    5: [0, 1],
})
