//@filename: a.ts
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

//@filename: b.ts
///<reference path="a.ts"/>
namespace ElidedModule3 {
}