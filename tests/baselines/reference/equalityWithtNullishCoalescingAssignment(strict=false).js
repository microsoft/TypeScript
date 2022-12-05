//// [equalityWithtNullishCoalescingAssignment.ts]
function foo(a?: boolean): void {
    a ??= true;

    if (a === false) {
        console.log(a);
    }
}

foo(false);


//// [equalityWithtNullishCoalescingAssignment.js]
function foo(a) {
    a !== null && a !== void 0 ? a : (a = true);
    if (a === false) {
        console.log(a);
    }
}
foo(false);
