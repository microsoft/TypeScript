// @filename: a.ts
/*!=================
    Keep this pinned
   =================
*/

/*! Don't keep this pinned comment */
function foo(n: number): void;
// Don't keep this comment.
function foo(s: string): void;
function foo(a: any): void {
}

class c {
    // dont keep this comment
    constructor(a: string);
    /*! keep this pinned comment */
    constructor(a: number);
    constructor(a: any) {
    }

    // dont keep this comment
    foo(a: string);
    /*! keep this pinned comment */
    foo(a: number);
    foo(a: any) {
    }
}

//@filename:b.ts
///<reference path='a.ts'/>
function foo2(n: number): void;
// Don't keep this comment.
function foo2(s: string): void;
function foo2(a: any): void {
}