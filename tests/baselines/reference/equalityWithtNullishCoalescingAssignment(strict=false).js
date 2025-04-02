//// [tests/cases/conformance/types/typeRelationships/comparable/equalityWithtNullishCoalescingAssignment.ts] ////

//// [equalityWithtNullishCoalescingAssignment.ts]
function f1(a?: boolean): void {
    a ??= true;

    if (a === false) {
        console.log(a);
    }
}
f1(false);

function f2() {
    let x: 0 | 1 | 2 | 3 = 0 as any;
    x ??= 1;
    if (x === 0) {
        console.log(x);
    }
}


//// [equalityWithtNullishCoalescingAssignment.js]
function f1(a) {
    a !== null && a !== void 0 ? a : (a = true);
    if (a === false) {
        console.log(a);
    }
}
f1(false);
function f2() {
    var x = 0;
    x !== null && x !== void 0 ? x : (x = 1);
    if (x === 0) {
        console.log(x);
    }
}
