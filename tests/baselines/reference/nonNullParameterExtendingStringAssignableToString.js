//// [nonNullParameterExtendingStringAssignableToString.ts]
declare function foo(p: string): void;

function fn<T extends string | undefined, U extends string>(one: T, two: U) {
    let three = Boolean() ? one : two;
    foo(one!);
    foo(two!);
    foo(three!); // this line is the important one
}

//// [nonNullParameterExtendingStringAssignableToString.js]
"use strict";
function fn(one, two) {
    var three = Boolean() ? one : two;
    foo(one);
    foo(two);
    foo(three); // this line is the important one
}
