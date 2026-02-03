//// [tests/cases/compiler/commentOnArrayElement12.ts] ////

//// [commentOnArrayElement12.ts]
const array = [
    ,, /* comment */
];


//// [commentOnArrayElement12.js]
var array = [
    ,
    , /* comment */
];
