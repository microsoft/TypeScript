//// [tests/cases/compiler/commentOnElidedModule1.ts] ////

//// [a.ts]
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

//// [b.ts]
///<reference path="a.ts"/>
module ElidedModule3 {
}


//// [a.js]
/*!=================
    Keep this pinned
   =================
*/
// Keep this comment.
//// [b.js]
///<reference path="a.ts"/>
