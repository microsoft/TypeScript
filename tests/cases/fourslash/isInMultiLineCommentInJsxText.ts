/// <reference path="fourslash.ts" />

// @Filename: file.jsx
//// <div>
//// // /*0*/
//// /* /*1*/ */
//// /**
////  * /*2*/
////  */
//// foo() /* /*3*/ */
//// // /*4*/
//// /* /*5*/ */
//// /**
////  * /*6*/
////  */
//// </div>
//// <div>
//// // /*7*/
//// /* /*8*/ */
//// /**
////  * /*9*/
////  */

for (let i = 0; i < 10; ++i) {
    goTo.marker(i.toString());
    verify.not.isInCommentAtPosition();
}
