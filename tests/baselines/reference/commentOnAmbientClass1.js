//// [tests/cases/compiler/commentOnAmbientClass1.ts] ////

//// [a.ts]
/*!=========
    Keep this pinned comment
   =========
*/

/*! Don't keep this pinned comment */
declare class C {
}

// Don't keep this comment.
declare class D {
}

//// [b.ts]
///<reference path="a.ts"/>
declare class E extends C {
}

//// [a.js]
/*!=========
    Keep this pinned comment
   =========
*/
//// [b.js]
///<reference path="a.ts"/>
