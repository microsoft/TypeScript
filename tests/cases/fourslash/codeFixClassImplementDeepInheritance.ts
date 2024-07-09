/// <reference path='fourslash.ts' />

////// Referenced throughout the inheritance chain.
////interface I0 { a: number }
////
////class C1 implements I0 { a: number }
////interface I1 { b: number }
////interface I2 extends C1, I1 {}
////
////class C2 { c: number }
////interface I3 {d: number}
////class C3 extends C2 implements I0, I2, I3 {
////    a: number;
////    b: number;
////    d: number;
////}
////
////interface I4 { e: number }
////interface I5 { f: number }
////class C4 extends C3 implements I0, I4, I5 {
////    e: number;
////    f: number;
////}
////
////interface I6 extends C4 {}
////class C5 implements I6 {}

/**
 * We want to check whether the search for member to replace actually searches through
 * the various possible paths of the inheritance chain correctly, and that We
 * don't issue duplicates for the same member.
 *
 * Our class DAG:
 *
 * C5
 * |-I6
 *   |-C4
 *     |-I4
 *     |-I5
 *     |------------------------ I0
 *     |-C3
 *       |-I2
 *         |-I1
 *         |-C1
 *           |-------------------I0
 *       |-I3
 *       |-----------------------I0
 *       |-C2
 */

verify.codeFix({
    description: "Implement interface 'I6'",
    newFileContent:
`// Referenced throughout the inheritance chain.
interface I0 { a: number }

class C1 implements I0 { a: number }
interface I1 { b: number }
interface I2 extends C1, I1 {}

class C2 { c: number }
interface I3 {d: number}
class C3 extends C2 implements I0, I2, I3 {
    a: number;
    b: number;
    d: number;
}

interface I4 { e: number }
interface I5 { f: number }
class C4 extends C3 implements I0, I4, I5 {
    e: number;
    f: number;
}

interface I6 extends C4 {}
class C5 implements I6 {
    e: number;
    f: number;
    a: number;
    b: number;
    d: number;
    c: number;
}`,
});
