/// <reference path='fourslash.ts' />

// @lib: es2017

/////** asdf */
////interface I {
////    1;
////    2;
////    3;
////    4;
////    5;
////    6;
////    7;
////    8;
////    9;
////    10;
////    11;
////    12;
////    13;
////    14;
////    15;
////    16;
////    17;
////    18;
////    19;
////    20;
////    21;
////    22;
////    /** a nice safe prime */
////    23;
////}
////class C implements I {}

verify.codeFix({
    description: "Implement interface 'I'",
    // TODO: GH#18445
    newFileContent:
`/** asdf */
interface I {
    1;
    2;
    3;
    4;
    5;
    6;
    7;
    8;
    9;
    10;
    11;
    12;
    13;
    14;
    15;
    16;
    17;
    18;
    19;
    20;
    21;
    22;
    /** a nice safe prime */
    23;
}
class C implements I {\r
    1: any;\r
    2: any;\r
    3: any;\r
    4: any;\r
    5: any;\r
    6: any;\r
    7: any;\r
    8: any;\r
    9: any;\r
    10: any;\r
    11: any;\r
    12: any;\r
    13: any;\r
    14: any;\r
    15: any;\r
    16: any;\r
    17: any;\r
    18: any;\r
    19: any;\r
    20: any;\r
    21: any;\r
    22: any;\r
    /** a nice safe prime */\r
    23: any;\r
}`,
});
