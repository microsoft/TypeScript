/// <reference path='fourslash.ts' />

//// /**
////  * t comment
////  *@param {string} pa a str
////  */
//// var t = tt as ((pa: string) => void) & ((pa: string, pp: string) => void)
//// t(/*1*/
//// /**
////  * t comment
////  *@param {string} pa a str
////  */
//// var t1: ((pa: string) => void) & ((pa: string, pp: string) => void) = tt;
//// t1(/*2*/

goTo.marker('1');
verify.currentParameterHelpArgumentDocCommentIs("a str");

goTo.marker('2');
verify.currentParameterHelpArgumentDocCommentIs("a str");
