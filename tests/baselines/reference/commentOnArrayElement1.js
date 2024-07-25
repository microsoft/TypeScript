//// [tests/cases/compiler/commentOnArrayElement1.ts] ////

//// [commentOnArrayElement1.ts]
const array = [
    /* element 1*/
    1
    /* end of element 1 */,
    2
    /* end of element 2 */
];

//// [commentOnArrayElement1.js]
var array = [
    /* element 1*/
    1
    /* end of element 1 */ ,
    2
    /* end of element 2 */
];
