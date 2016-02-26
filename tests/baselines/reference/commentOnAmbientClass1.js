//// [tests/cases/compiler/commentOnAmbientClass1.ts] ////

//// [a.ts]
/*!=========
    Keep this pinned comment
   =========
*/

/*! Don't keep this pinned comment */
declare class C {
}

// Keep this comment.
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
// Keep this comment.
//// [b.js]
///<reference path="a.ts"/>
