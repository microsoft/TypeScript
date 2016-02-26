//@filename: a.ts
/*!=================
    Keep this pinned
   =================
*/

/*! Don't keep this pinned comment */
module ElidedModule {
}

// Keep this comment.
module ElidedModule2 {
}

//@filename: b.ts
///<reference path="a.ts"/>
module ElidedModule3 {
}
