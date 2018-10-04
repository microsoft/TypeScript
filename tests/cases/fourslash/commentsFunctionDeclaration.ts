/// <reference path='fourslash.ts' />

/////** This comment should appear for foo*/
////function f/*1*/oo() {
////}
////f/*2*/oo/*3*/(/*4*/);
/////** This is comment for function signature*/
////function fo/*5*/oWithParameters(/** this is comment about a*/a: string,
////    /** this is comment for b*/
////    b: number) {
////    var /*6*/d = /*7*/a;
////}
////fooWithParam/*8*/eters/*9*/(/*10*/"a",/*11*/10);

// ambient declaration
/////**
////* Does something
////* @param a a string
////*/
////declare function fn(a: string);
////fn(/*12*/"hello");

verify.quickInfoAt("1", "function foo(): void", "This comment should appear for foo");

verify.quickInfoAt("2", "function foo(): void", "This comment should appear for foo");

goTo.marker('3');
verify.completionListContains('foo', 'function foo(): void', 'This comment should appear for foo');

verify.signatureHelp({ marker: "4", docComment: "This comment should appear for foo" });

verify.quickInfoAt("5", "function fooWithParameters(a: string, b: number): void", "This is comment for function signature");

verify.quickInfoAt("6", "(local var) d: string");

goTo.marker('7');
verify.completionListContains('a', '(parameter) a: string', 'this is comment about a');
verify.completionListContains('b', '(parameter) b: number', 'this is comment for b');

verify.quickInfoAt("8", "function fooWithParameters(a: string, b: number): void", "This is comment for function signature");

goTo.marker('9');
verify.completionListContains('fooWithParameters', 'function fooWithParameters(a: string, b: number): void', 'This is comment for function signature');

verify.signatureHelp(
    { marker: "10", docComment: "This is comment for function signature", parameterDocComment: "this is comment about a" },
    { marker: "11", docComment: "This is comment for function signature", parameterDocComment: "this is comment for b" },
    {
        marker: "12",
        docComment: "Does something",
        parameterDocComment: "a string",
        tags: [{ name: "param", text: "a a string" }],
    },
);
