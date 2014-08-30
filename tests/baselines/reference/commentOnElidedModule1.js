//// [tests/cases/compiler/commentOnElidedModule1.ts] ////

//// [a.ts]
/*! Keep this pinned comment */
module ElidedModule {
}

// Don't keep this comment.
module ElidedModule2 {
}

//// [b.ts]
///<reference path="a.ts"/>
module ElidedModule3 {
}

//// [a.js]
/*! Keep this pinned comment */
//// [b.js]
///<reference path="a.ts"/>
