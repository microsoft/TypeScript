/// <reference path="fourslash.ts" />

//// {
////     /*1*//**
////      * Some doc comment
////      *//*2*/
////     const a = 1;
//// }
////
//// while (true) {
//// /*3*//**
////  * Some doc comment
////  *//*4*/
//// }

format.selection("1", "2");
verify.currentFileContentIs(
`{
    /**
     * Some doc comment
     */
    const a = 1;
}

while (true) {
/**
 * Some doc comment
 */
}`);

format.selection("3", "4");
verify.currentFileContentIs(
`{
    /**
     * Some doc comment
     */
    const a = 1;
}

while (true) {
    /**
     * Some doc comment
     */
}`);
