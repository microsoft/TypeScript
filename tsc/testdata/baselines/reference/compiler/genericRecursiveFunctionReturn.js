//// [tests/cases/compiler/genericRecursiveFunctionReturn.ts] ////

//// [genericRecursiveFunctionReturn.ts]
// https://github.com/microsoft/TypeScript/issues/63990
const f = <T>(a: T, p: number) => {
    if (!p) return a;
    // this recursive call can't be ignored as that would lead to inferring T when the number return type is possible here
    return f(p, p - 1);
};

const x = f("foo", 5);

declare const condition: boolean;

function g<T extends number>(value: T) {
    if (condition) return value;
    // this recursive call can't be ignored as that would lead to inferring T when the number return type is possible here
    return g<number>(value);
}

function h<T>(value: T, count: number) {
    if (!count) return value;
    // this recursive call can be ignored because its arguments are assignable to the current generic signature
    return h(value, count - 1);
}

const y = h("foo", 1);

function nested<T>(value: T) {
    if (condition) return value;
    // this recursive call can't be ignored as that would lead to inferring T when the T[] return type is possible here
    return nested([value]);
}

function swap<T, U>(left: T, right: U, shouldSwap: boolean) {
    if (!shouldSwap) return [left, right] as const;
    // this recursive call can't be ignored as that would lead to inferring readonly [T, U] when the readonly [U, T] return type is possible here
    return swap(right, left, false);
}


//// [genericRecursiveFunctionReturn.js]
"use strict";
// https://github.com/microsoft/TypeScript/issues/63990
const f = (a, p) => {
    if (!p)
        return a;
    // this recursive call can't be ignored as that would lead to inferring T when the number return type is possible here
    return f(p, p - 1);
};
const x = f("foo", 5);
function g(value) {
    if (condition)
        return value;
    // this recursive call can't be ignored as that would lead to inferring T when the number return type is possible here
    return g(value);
}
function h(value, count) {
    if (!count)
        return value;
    // this recursive call can be ignored because its arguments are assignable to the current generic signature
    return h(value, count - 1);
}
const y = h("foo", 1);
function nested(value) {
    if (condition)
        return value;
    // this recursive call can't be ignored as that would lead to inferring T when the T[] return type is possible here
    return nested([value]);
}
function swap(left, right, shouldSwap) {
    if (!shouldSwap)
        return [left, right];
    // this recursive call can't be ignored as that would lead to inferring readonly [T, U] when the readonly [U, T] return type is possible here
    return swap(right, left, false);
}
