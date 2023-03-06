/// <reference path="fourslash.ts"/>

// @filename: a.ts
////interface I {
////    m2(): void;
////    m3(): void;
////}
////
////type T1 = I;
////export interface A1 extends T1 {
////    m1(): void;
////}
////export class A1 {}
////
////type T2 = Partial<I>
////export interface A2 extends T2 {
////    m1(): void;
////}
////export class A2 {}
////
////type T3 = Pick<I, "m3">
////export interface A3 extends T3 {
////    m1(): void;
////}
////export class A3 {}

// @filename: b.ts
////import { A1, A2, A3 } from './a';
////class B1 extends A1 {
////    /*1*/
////}
////class B2 extends A2 {
////    /*2*/
////}
////class B3 extends A3 {
////    /*3*/
////}

verify.completions(
    { marker: "1", unsorted: ["m1", "m2", "m3", ...completion.classElementKeywords], isNewIdentifierLocation: true },
    { marker: "2", unsorted: ["m1", "m2", "m3", ...completion.classElementKeywords], isNewIdentifierLocation: true },
    { marker: "3", unsorted: ["m1", "m3", ...completion.classElementKeywords], isNewIdentifierLocation: true }
);
