/// <reference path="fourslash.ts" />

// @Filename: file.jsx
//// `
//// // /*0*/
//// /* /*1*/ */
//// /**
////  * /*2*/
////  */
//// foo()
//// // /*3*/
//// /* /*4*/ */
//// /**
////  * /*5*/
////  */
//// `
//// `
//// // /*6*/
//// /* /*7*/ */
//// /**
////  * /*8*/
////  */

for (let i = 0; i < 9; ++i) {
    goTo.marker(i.toString());
    verify.not.isInCommentAtPosition();
}