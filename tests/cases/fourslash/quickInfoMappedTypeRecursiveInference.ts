/// <reference path="fourslash.ts" />
// @Filename: test.ts
//// interface A { a: A }
//// declare let a: A;
//// type Deep<T> = { [K in keyof T]: Deep<T[K]> }
//// declare function foo<T>(deep: Deep<T>): T;
//// const out/*1*/ = foo/*2*/(a);
//// out.a/*3*/
//// out.a.a/*4*/
//// out.a.a.a.a.a.a.a/*5*/
////
//// interface B { [s: string]: B }
//// declare let b: B;
//// const oub/*6*/ = foo/*7*/(b);
//// oub.b/*8*/
//// oub.b.b/*9*/
//// oub.b.a.n.a.n.a/*10*/

verify.quickInfoAt('1', `const out: {
    a: {
        a: any;
    };
}`);
verify.quickInfoAt('2', `function foo<{
    a: {
        a: any;
    };
}>(deep: Deep<{
    a: {
        a: any;
    };
}>): {
    a: {
        a: any;
    };
}`);
verify.quickInfoAt('3', `(property) a: {
    a: {
        a: any;
    };
}`);
verify.quickInfoAt('4', `(property) a: {
    a: {
        a: any;
    };
}`);
verify.quickInfoAt('5', `(property) a: {
    a: {
        a: any;
    };
}`);
verify.quickInfoAt('6', `const oub: {
    [x: string]: any;
}`);
verify.quickInfoAt('7', `function foo<{
    [x: string]: any;
}>(deep: Deep<{
    [x: string]: any;
}>): {
    [x: string]: any;
}`);
verify.quickInfoAt('8', `{
    [x: string]: any;
}`);
verify.quickInfoAt('9', `{
    [x: string]: any;
}`);
verify.quickInfoAt('10', `{
    [x: string]: any;
}`);
