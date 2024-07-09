//@filename: a.ts
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

//@filename: b.ts
///<reference path="a.ts"/>
declare class E extends C {
}