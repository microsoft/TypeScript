//// [tests/cases/compiler/commentOnAmbientEnum.ts] ////

//// [a.ts]
/*!=========
    Keep this pinned comment
   =========
*/

/*! Don't keep this pinned comment */
declare enum C {
    a,
    b,
    c
}

// Keep this comment.
declare enum D {
}

//// [b.ts]
///<reference path="a.ts"/>
declare enum E {
}


//// [a.js]
/*!=========
    Keep this pinned comment
   =========
*/
// Keep this comment.
//// [b.js]
///<reference path="a.ts"/>
