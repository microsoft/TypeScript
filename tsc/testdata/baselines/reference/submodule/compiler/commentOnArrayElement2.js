//// [tests/cases/compiler/commentOnArrayElement2.ts] ////

//// [commentOnArrayElement2.ts]
const array = [
    /* element 1*/
    1 /* end of element 1 */,
    2
    /* end of element 2 */
];

//// [commentOnArrayElement2.js]
const array = [
    1,
    2
];
