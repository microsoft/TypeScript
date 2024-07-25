///<reference path="fourslash.ts" />

// @allowJs: true

// @Filename: a.ts
//// /**
////  * @para/*0*/
////  */
//// function printValue(value, maximumFractionDigits) {}
////
//// /**
////  * @p/*a*/
////  */
//// function aa({ a = 1 }, b: string) {
////     a;
//// }
////
//// /**
////  * /*b*/
////  */
//// function bb(b: string) {}
////
//// /**
////  * 
////  * @p/*c*/
////  */
//// function cc({ b: { a, c } = { a: 1, c: 3 } }) {
////
//// }
////
//// /**
////  * 
////  * @p/*d*/
////  */
//// function dd({ a: { b, c }, d: [e, f] }: { a: { b: number, c: number }, d: [string, string] }) {
////
//// }

// @Filename: b.js
//// /**
////  * @p/*ja*/
////  */
//// function aa({ a = 1 }, b) {
////     a;
//// }
////
//// /**
////  * /*jb*/
////  */
//// function bb(b) {}
////
//// /**
////  * 
////  * @p/*jc*/
////  */
//// function cc({ b: { a, c } = { a: 1, c: 3 } }) {
////
//// }
////
//// /**
////  * 
////  * @p/*jd*/
////  */
//// function dd({ a: { b, c }, d: [e, f] }) {
////
//// }
////
//// const someconst = "aa";
//// /**
////  * 
////  * @p/*je*/
////  */
//// function ee({ [someconst]: b }) {
////
//// }
////
//// /**
////  * 
////  * @p/*jf*/
////  */
//// function ff({ "a": b }) {
////
//// }
////
//// /**
////  * 
////  * @p/*jg*/
////  */
//// function gg(a, { b }) {
////
//// }
////
//// /**
////  * 
////  * @param {boolean} a a's description
////  * @p/*jh*/
////  */
//// function hh(a, { b }) {
////    
//// }
//// /**
////  * 
////  * @p/*ji*/
////  */
//// function ii({ b, ...c }, ...a) {}
////
//// /**
////  * 
////  * @p/*jj*/
////  */
//// function jj(...{ length }) {}
////
//// /**
////  * 
////  * @p/*jk*/
////  */
//// function kk(...a) {}
////
//// function reallylongfunctionnameabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijkl(a) {}
//// /**
////  *
////  * @p/*jl*/
////  */
//// function ll(a = reallylongfunctionnameabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijkl("")) {}
////}

verify.baselineCompletions();