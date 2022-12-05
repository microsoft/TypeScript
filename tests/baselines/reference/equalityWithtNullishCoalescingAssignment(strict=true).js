//// [equalityWithtNullishCoalescingAssignment.ts]
function foo(a?: boolean): void {
    a ??= true;

    if (a === false) {
        console.log(a);
    }
}

foo(false);


//// [equalityWithtNullishCoalescingAssignment.js]
"use strict";
function foo(a) {
    a !== null && a !== void 0 ? a : (a = true);
    if (a === false) {
        console.log(a);
    }
}
foo(false);
