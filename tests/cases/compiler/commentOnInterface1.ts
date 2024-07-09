//@filename: a.ts
/*!=================
    Keep this pinned
   =================
*/

/*! Don't keep this pinned comment */
interface I {
}

// Don't keep this comment.
interface I2 {
}

//@filename: b.ts
///<reference path='a.ts'/>
interface I3 {
}