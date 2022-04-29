/// <reference path='fourslash.ts'/>

//// declare function f<T = boolean, U = string>(x: T, y: U): T;
//// f<number, string>(/*1*/);
//// f(/*2*/);
//// f<number>(/*3*/);
//// f<number, string, boolean>(/*4*/);

//// interface A { a: number }
//// interface B extends A { b: string }
//// declare function g<T, U, V extends A = B>(x: T, y: U, z: V): T;
//// declare function h<T, U, V extends A>(x: T, y: U, z: V): T;
//// declare function j<T, U, V = B>(x: T, y: U, z: V): T;
//// g(/*5*/);
//// h(/*6*/);
//// j(/*7*/);
//// g<number>(/*8*/);
//// h<number>(/*9*/);
//// j<number>(/*10*/);

verify.signatureHelp(
    { marker: "1", text: "f(x: number, y: string): number" },
    { marker: "2", text: "f(x: boolean, y: string): boolean" },
    // too few -- fill in rest with default
    { marker: "3", text: "f(x: number, y: string): number" },
    // too many -- ignore extra type arguments
    { marker: "4", text: "f(x: number, y: string): number" },

    // not matched signature and no type arguments
    { marker: "5", text: "g(x: unknown, y: unknown, z: B): unknown" },
    { marker: "6", text: "h(x: unknown, y: unknown, z: A): unknown" },
    { marker: "7", text: "j(x: unknown, y: unknown, z: B): unknown" },
    // not matched signature and too few type arguments
    { marker: "8", text: "g(x: number, y: unknown, z: B): number" },
    { marker: "9", text: "h(x: number, y: unknown, z: A): number" },
    { marker: "10", text: "j(x: number, y: unknown, z: B): number" },
);
