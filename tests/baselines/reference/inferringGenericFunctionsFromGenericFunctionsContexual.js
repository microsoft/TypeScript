//// [inferringGenericFunctionsFromGenericFunctionsContexual.ts]
export {}

declare function identity1<T, U>(f: (t: T) => U): (t2: T) => U
const id1 = identity1(x => x)


declare function identity2<T extends number, U>(f: (t: T) => U): (t2: T) => U
const id2 = identity2(x => x)


// compose<D, E extends string, F> is just something I put in to make sure the contextual types handle multiple signatures.
declare function compose<D, E extends string, F>(f: (d: D) => E, g: (e: E) => F): (d2: D) => [D, F];
declare function compose<A, B, C>(f: (a1: A) => B, g: (b1: B) => C): (a2: A) => C;

{
    let composed1 = compose(x => x, x2 => x2)
    const expectedComposed1: <U>(u: U) => U = composed1;
    const callComposed1 = composed1("test");
    const expectedCallComposed1 : string = callComposed1;
}

{
    let composed2 = compose(x => x, x2 => [x2])
    const expectedComposed2: <U>(u: U) => U[] = composed2;
    const callComposed2 = composed2("test");
    const expectedCallComposed2: string[] = callComposed2;
}

{
    let composed3 = compose(x => [x], x2 => x2)
    const expectedComposed3: <U>(u: U) => U[] = composed3;
    const callComposed3 = composed3("test");
    const expectedCallComposed3 : string[] = callComposed3;
}

{
    let composed4 = compose(x => [x], x2 => ({ boxed: x2 }));
    const expectedComposed4: <U>(u: U) => {boxed: U[]} = composed4;
    const callComposed4 = composed4("test");
    const expectedCallComposed4 : {boxed: string[]} = callComposed4;
}

{
    let composed5 = compose(x => "" + x, x2 => ({ boxed: x2 }));
    const expectedComposed5: <U>(u: U) => [U, {boxed: string}] = composed5;
    const callComposed5 = composed5(123456);
    const expectedCallComposed5 : [number, {boxed: string}] = callComposed5;
}


declare function composeReverse<D, E extends string, F>(g: (e: E) => F, f: (d: D) => E): (d2: D) => [D, F];
declare function composeReverse<A, B, C>(g: (b1: B) => C, f: (a1: A) => B): (a2: A) => C;


{
    let composed1 = composeReverse(x => x, x2 => x2)
    const expectedComposed1: <U>(u: U) => U = composed1;
    const callComposed1 = composed1("test");
    const expectedCallComposed1 : string = callComposed1;
}

{
    let composed2 = composeReverse( x2 => [x2], x => x)
    const expectedComposed2: <U>(u: U) => U[] = composed2;
    const callComposed2 = composed2("test");
    const expectedCallComposed2: string[] = callComposed2;
}

{
    let composed3 = composeReverse( x2 => x2, x => [x])
    const expectedComposed3: <U>(u: U) => U[] = composed3;
    const callComposed3 = composed3("test");
    const expectedCallComposed3 : string[] = callComposed3;
}

{
    let composed4 = composeReverse( x2 => ({ boxed: x2 }), x => [x]);
    const expectedComposed4: <U>(u: U) => {boxed: U[]} = composed4;
    const callComposed4 = composed4("test");
    const expectedCallComposed4 : {boxed: string[]} = callComposed4;
}

{
    let composed5 = composeReverse( x2 => ({ boxed: x2 }), x => "" + x);
    const expectedComposed5: <U>(u: U) => [U, {boxed: string}] = composed5;
    const callComposed5 = composed5(123456);
    const expectedCallComposed5 : [number, {boxed: string}] = callComposed5;
}


//// [inferringGenericFunctionsFromGenericFunctionsContexual.js]
"use strict";
exports.__esModule = true;
var id1 = identity1(function (x) { return x; });
var id2 = identity2(function (x) { return x; });
{
    var composed1 = compose(function (x) { return x; }, function (x2) { return x2; });
    var expectedComposed1 = composed1;
    var callComposed1 = composed1("test");
    var expectedCallComposed1 = callComposed1;
}
{
    var composed2 = compose(function (x) { return x; }, function (x2) { return [x2]; });
    var expectedComposed2 = composed2;
    var callComposed2 = composed2("test");
    var expectedCallComposed2 = callComposed2;
}
{
    var composed3 = compose(function (x) { return [x]; }, function (x2) { return x2; });
    var expectedComposed3 = composed3;
    var callComposed3 = composed3("test");
    var expectedCallComposed3 = callComposed3;
}
{
    var composed4 = compose(function (x) { return [x]; }, function (x2) { return ({ boxed: x2 }); });
    var expectedComposed4 = composed4;
    var callComposed4 = composed4("test");
    var expectedCallComposed4 = callComposed4;
}
{
    var composed5 = compose(function (x) { return "" + x; }, function (x2) { return ({ boxed: x2 }); });
    var expectedComposed5 = composed5;
    var callComposed5 = composed5(123456);
    var expectedCallComposed5 = callComposed5;
}
{
    var composed1 = composeReverse(function (x) { return x; }, function (x2) { return x2; });
    var expectedComposed1 = composed1;
    var callComposed1 = composed1("test");
    var expectedCallComposed1 = callComposed1;
}
{
    var composed2 = composeReverse(function (x2) { return [x2]; }, function (x) { return x; });
    var expectedComposed2 = composed2;
    var callComposed2 = composed2("test");
    var expectedCallComposed2 = callComposed2;
}
{
    var composed3 = composeReverse(function (x2) { return x2; }, function (x) { return [x]; });
    var expectedComposed3 = composed3;
    var callComposed3 = composed3("test");
    var expectedCallComposed3 = callComposed3;
}
{
    var composed4 = composeReverse(function (x2) { return ({ boxed: x2 }); }, function (x) { return [x]; });
    var expectedComposed4 = composed4;
    var callComposed4 = composed4("test");
    var expectedCallComposed4 = callComposed4;
}
{
    var composed5 = composeReverse(function (x2) { return ({ boxed: x2 }); }, function (x) { return "" + x; });
    var expectedComposed5 = composed5;
    var callComposed5 = composed5(123456);
    var expectedCallComposed5 = callComposed5;
}
