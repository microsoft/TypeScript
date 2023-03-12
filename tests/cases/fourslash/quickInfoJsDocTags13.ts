/// <reference path="fourslash.ts" />

/////**
//// * @param a - a param
//// * @param bindingelement1 - for { b, c }
//// * @param b - b param
//// * @param bindingelement2 - for { e }
//// * @param c - c param
//// * @param d - d param
//// */
////function foo(a: string, { b, c }: { b: string, c: string }, d: string, { e }: { e: string }) {
////    a/*1*/
////    b/*2*/
////    c/*3*/
////    d/*4*/
////    e/*5*/
////}

verify.baselineQuickInfo();
