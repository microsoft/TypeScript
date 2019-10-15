// ! this library is mostly used with ramda

import {I, T, Test} from "ts-toolbelt";

const {check, checks} = Test;

// iterates over `T` and returns the `Iteration` position when finished
type StdRecursiveIteration<T extends any[], I extends I.Iteration = I.IterationOf<'0'>> = {
    0: StdRecursiveIteration<T, I.Next<I>>;
    1: I.Pos<I>;
}[
    I.Pos<I> extends T.Length<T> // this form of recursion is preferred
    ? 1                          // because it will let the user know if                   
    : 0                          // the instantiation depth has been hit
];                               // (but error is sometimes swallowed (?))

checks([
    check<StdRecursiveIteration<[
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]>, 40, Test.Pass>(), // max length is 40
]);

// iterates over `T` and returns the `Iteration` position when finished
type SafeRecursiveIteration<T extends any[], I extends I.Iteration = I.IterationOf<'0'>> = {
    0: SafeRecursiveIteration<T, I.Next<I>>;
    1: I.Pos<I>;
}[
    I.Key<I> extends T.Length<T, 's'> // this form of recursion is the safest
    ? 1                               // because `T.Length<T, 's'>` will force
    : 0                               // the length to comply with the limits
];                                    // => won't compute if excessive length                           

checks([
    check<SafeRecursiveIteration<[
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]>, 0, Test.Pass>() // did not compute
]);
