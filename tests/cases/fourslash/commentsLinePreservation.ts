/// <reference path='fourslash.ts' />

/////** This is firstLine
////  * This is second Line
////  * 
////  * This is fourth Line
////  */
////var /*a*/a: string;
/////** 
////  * This is firstLine
////  * This is second Line
////  * 
////  * This is fourth Line
////  */
////var /*b*/b: string;
/////** 
////  * This is firstLine
////  * This is second Line
////  * 
////  * This is fourth Line
////  *
////  */
////var /*c*/c: string;
/////** 
////  * This is firstLine
////  * This is second Line
////  * @param param
////  * @random tag This should be third line
////  */
////function /*d*/d(param: string) { /*1*/param = "hello"; }
/////** 
////  * This is firstLine
////  * This is second Line
////  * @param param
////  */
////function /*e*/e(param: string) { /*2*/param = "hello"; }
/////** 
////  * This is firstLine
////  * This is second Line
////  * @param param1 first line of param
////  *
////  *  param information third line
////  * @random tag This should be third line
////  */
////function /*f*/f(param1: string) { /*3*/param1 = "hello"; }
/////** 
////  * This is firstLine
////  * This is second Line
////  * @param param1
////  *
////  *  param information first line
////  * @random tag This should be third line
////  */
////function /*g*/g(param1: string) { /*4*/param1 = "hello"; }
/////** 
////  * This is firstLine
////  * This is second Line
////  * @param param1
////  *
////  *  param information first line
////  *
////  *  param information third line
////  * @random tag This should be third line
////  */
////function /*h*/h(param1: string) { /*5*/param1 = "hello"; }
/////** 
////  * This is firstLine
////  * This is second Line
////  * @param param1
////  *
////  *  param information first line
////  *
////  *  param information third line
////  *
////  */
////function /*i*/i(param1: string) { /*6*/param1 = "hello"; }
/////** 
////  * This is firstLine
////  * This is second Line
////  * @param param1
////  *
////  *  param information first line
////  *
////  *  param information third line
////  */
////function /*j*/j(param1: string) { /*7*/param1 = "hello"; }
/////** 
////  * This is firstLine
////  * This is second Line
////  * @param param1 hello   @randomtag 
////  *
////  *  random information first line
////  *
////  *  random information third line
////  */
////function /*k*/k(param1: string) { /*8*/param1 = "hello"; }
/////** 
////  * This is firstLine
////  * This is second Line
////  * @param param1 first Line text
////  *
////  * @param param1 
////  *
////  * blank line that shouldnt be shown when starting this 
////  * second time information about the param again
////  */
////function /*l*/l(param1: string) { /*9*/param1 = "hello"; }
////     /** 
////       * This is firstLine
//// This is second Line
//// [1]: third * line
//// @param param1 first Line text
//// second line text
//// */
////function /*m*/m(param1: string) { /*10*/param1 = "hello"; }

verify.quickInfos({
    a: ["var a: string", "This is firstLine\nThis is second Line\n\nThis is fourth Line"],
    b: ["var b: string", "This is firstLine\nThis is second Line\n\nThis is fourth Line"],
    c: ["var c: string", "This is firstLine\nThis is second Line\n\nThis is fourth Line"],
 
    d: ["function d(param: string): void", "This is firstLine\nThis is second Line"],
    1: "(parameter) param: string",

    e: ["function e(param: string): void", "This is firstLine\nThis is second Line"],
    2: "(parameter) param: string",

    f: ["function f(param1: string): void", "This is firstLine\nThis is second Line"],
    3: ["(parameter) param1: string", "first line of param\n\nparam information third line"],

    g: ["function g(param1: string): void", "This is firstLine\nThis is second Line"],
    4: ["(parameter) param1: string", "param information first line"],

    h: ["function h(param1: string): void", "This is firstLine\nThis is second Line"],
    5: ["(parameter) param1: string", "param information first line\n\nparam information third line"],

    i: ["function i(param1: string): void", "This is firstLine\nThis is second Line"],
    6: ["(parameter) param1: string", "param information first line\n\nparam information third line"],

    j: ["function j(param1: string): void", "This is firstLine\nThis is second Line"],
    7: ["(parameter) param1: string", "param information first line\n\nparam information third line"],

    k: ["function k(param1: string): void", "This is firstLine\nThis is second Line"],
    8: ["(parameter) param1: string", "hello"],

    l: ["function l(param1: string): void", "This is firstLine\nThis is second Line"],
    9: ["(parameter) param1: string", "first Line text\nblank line that shouldnt be shown when starting this \nsecond time information about the param again"],

    m: ["function m(param1: string): void", "This is firstLine\nThis is second Line\n[1]: third * line"],
    10: ["(parameter) param1: string", "first Line text\nsecond line text"]
});
