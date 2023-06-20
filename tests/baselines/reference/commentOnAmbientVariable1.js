//// [tests/cases/compiler/commentOnAmbientVariable1.ts] ////

//// [commentOnAmbientVariable1.ts]
/*!=========
    Keep this pinned comment
   =========
*/

/*! Don't keep this pinned comment */
declare var v: number;

// Don't keep this comment.
declare var y: number;

//// [commentOnAmbientVariable1.js]
/*!=========
    Keep this pinned comment
   =========
*/
