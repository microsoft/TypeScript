/// <reference path='fourslash.ts'/>

// @module: esnext
// @filename: /0.ts
//// export type Apple = {
////     a: number;
////     b: string;
//// }
//// export const a: Apple = { a: 1, b: "2"};
//// export enum Color {
////     Red,
////     Green,
////     Blue,
//// }

// @filename: /1.ts
//// import * as zero from "./0";
//// const b/*b*/ = zero;

// @filename: /2.ts
//// import { a/*a*/ } from "./0";
//// import { Color/*c*/ } from "./0";

// @filename: /3.ts
//// export default class {
////     a: boolean;
//// }

// @filename: /4.ts
//// import Foo/*d*/ from "./3";
//// const f/*e*/ = new Foo/*f*/();

verify.baselineQuickInfo({
    b: [0, 1, 2],
    a: [0, 1],
    c: [0, 1],
    d: [0],
    e: [0, 1],
    f: [0, 1],
});