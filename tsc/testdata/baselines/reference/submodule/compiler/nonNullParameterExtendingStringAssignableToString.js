//// [tests/cases/compiler/nonNullParameterExtendingStringAssignableToString.ts] ////

//// [nonNullParameterExtendingStringAssignableToString.ts]
declare function foo(p: string): void;

function fn<T extends string | undefined, U extends string>(one: T, two: U) {
    let three = Boolean() ? one : two;
    foo(one!);
    foo(two!);
    foo(three!); // this line is the important one
}

//// [nonNullParameterExtendingStringAssignableToString.js]
function fn(one, two) {
    let three = Boolean() ? one : two;
    foo(one);
    foo(two);
    foo(three);
}
