//// [nonPrimitiveConstraintOfIndexAccessType.ts]
// test for #15371
function f<T extends object, P extends keyof T>(s: string, tp: T[P]): void {
    tp = s;
}
function g<T extends null, P extends keyof T>(s: string, tp: T[P]): void {
    tp = s;
}
function h<T extends undefined, P extends keyof T>(s: string, tp: T[P]): void {
    tp = s;
}
function i<T extends void, P extends keyof T>(s: string, tp: T[P]): void {
    tp = s;
}
function j<T extends never, P extends keyof T>(s: string, tp: T[P]): void {
    tp = s;
}
function k<T extends number, P extends keyof T>(s: string, tp: T[P]): void {
    tp = s;
}
function o<T extends string, P extends keyof T>(s: string, tp: T[P]): void {
    tp = s;
}
function l<T extends {}, P extends keyof T>(s: string, tp: T[P]): void {
    tp = s;
}
function m<T extends { a: number }, P extends keyof T>(s: string, tp: T[P]): void {
    tp = s;
}
function n<T extends { [s: string]: number }, P extends keyof T>(s: string, tp: T[P]): void {
    tp = s;
}


//// [nonPrimitiveConstraintOfIndexAccessType.js]
"use strict";
// test for #15371
function f(s, tp) {
    tp = s;
}
function g(s, tp) {
    tp = s;
}
function h(s, tp) {
    tp = s;
}
function i(s, tp) {
    tp = s;
}
function j(s, tp) {
    tp = s;
}
function k(s, tp) {
    tp = s;
}
function o(s, tp) {
    tp = s;
}
function l(s, tp) {
    tp = s;
}
function m(s, tp) {
    tp = s;
}
function n(s, tp) {
    tp = s;
}
