//// [commentOnSignature1.ts]
/*! Keep this pinned comment */
function foo(n: number): void;
// Don't keep this comment.
function foo(s: string): void;
function foo(a: any): void {
}

//// [commentOnSignature1.js]
/*! Keep this pinned comment */

function foo(a) {
}
