/// <reference path='fourslash.ts' />

// @lib: es2017

//// /** asdf */
//// interface I {
////     1;
////     2;
////     3;
////     4;
////     5;
////     6;
////     7;
////     8;
////     9;
////     10;
////     11;
////     12;
////     13;
////     14;
////     15;
////     16;
////     17;
////     18;
////     19;
////     20;
////     21;
////     22;
////     /** a nice safe prime */
////     23;
//// }
//// class C implements I {[| |]}

verify.rangeAfterCodeFix(`
    1: any;
    2: any;
    3: any;
    4: any;
    5: any;
    6: any;
    7: any;
    8: any;
    9: any;
    10: any;
    11: any;
    12: any;
    13: any;
    14: any;
    15: any;
    16: any;
    17: any;
    18: any;
    19: any;
    20: any;
    21: any;
    22: any;
    23: any;
`);
