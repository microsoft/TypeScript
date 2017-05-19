//@filename: a.ts
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

// Don't keep this comment.
declare enum D {
}

//@filename: b.ts
///<reference path="a.ts"/>
declare enum E {
}