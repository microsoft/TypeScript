//// [tests/cases/compiler/commentOnElidedModule1.ts] ////

//// [a.ts]
/*!=================
    Keep this pinned
   =================
*/

/*! Don't keep this pinned comment */
namespace ElidedModule {
}

// Don't keep this comment.
namespace ElidedModule2 {
}

//// [b.ts]
///<reference path="a.ts"/>
namespace ElidedModule3 {
}

//// [a.js]
/*!=================
    Keep this pinned
   =================
*/
//// [b.js]
///<reference path="a.ts"/>
