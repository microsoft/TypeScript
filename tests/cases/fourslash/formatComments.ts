/// <reference path="fourslash.ts"/>

////_.chain()
////// wow/*callChain1*/
////  .then()
////// waa/*callChain2*/
////    .then();
////wow(
////  3,
////// uaa/*argument1*/
////    4
////// wua/*argument2*/
////);

format.document();

goTo.marker("callChain1");
verify.currentLineContentIs("    // wow");
goTo.marker("callChain2");
verify.currentLineContentIs("    // waa");
goTo.marker("argument1");
verify.currentLineContentIs("    // uaa");
goTo.marker("argument2");
verify.currentLineContentIs("    // wua");