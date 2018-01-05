/// <reference path='fourslash.ts' />

//// // /*0_0*/
//// /* /*0_1*/
////  some text /*0_2*/
//// some text /*1_0*/
//// * some text /*0_3*/
//// /*0_4*/
////  */
//// function foo() {
////     // /*4_0*/
////     /** /*4_1*/
////      * /*4_2*/
////         * /*4_3*/
//// /*7_0*/
////      */
////     /* /*4_4*/ */
//// }

for (let i = 0; i < 5; ++i) {
    goTo.marker(`0_${i}`);
    verify.indentationIs(0);

    goTo.marker(`4_${i}`);
    verify.indentationIs(4);
}

goTo.marker(`1_0`);
verify.indentationIs(1);

goTo.marker(`7_0`);
verify.indentationIs(7);
