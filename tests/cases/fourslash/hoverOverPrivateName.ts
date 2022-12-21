/// <reference path="fourslash.ts" />

//// class A {
////     #f/*1*/oo = 3;
////     #b/*2*/ar: number;
////     #b/*3*/az = () => "hello";
////     #q/*4*/ux(n: number): string {
////         return "" + n;
////     }
////     static #staticF/*5*/oo = 3;
////     static #staticB/*6*/ar: number;
////     static #staticB/*7*/az = () => "hello";
////     static #staticQ/*8*/ux(n: number): string {
////         return "" + n;
////     }
//// }

verify.quickInfos({
    1: "(property) A.#foo: number",
    2: "(property) A.#bar: number",
    3: "(property) A.#baz: () => string",
    4: "(method) A.#qux(n: number): string",
    5: "(property) A.#staticFoo: number",
    6: "(property) A.#staticBar: number",
    7: "(property) A.#staticBaz: () => string",
    8: "(method) A.#staticQux(n: number): string",
});
