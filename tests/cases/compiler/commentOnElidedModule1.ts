//@filename: a.ts
/*! Keep this pinned comment */
module ElidedModule {
}

// Don't keep this comment.
module ElidedModule2 {
}

//@filename: b.ts
///<reference path="a.ts"/>
module ElidedModule3 {
}