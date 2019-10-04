import {I, T, Test} from "ts-toolbelt";

const {check, checks} = Test;

// iterates over `T` and returns the `Iteration` position when finished
type RecursiveIteration<T extends any[], I extends I.Iteration = I.IterationOf<'0'>> = {
    0: RecursiveIteration<T, I.Next<I>>;
    1: I.Pos<I>;
}[
    T.Length<T> extends I.Pos<I>
    ? 1
    : 0
];

checks([
    check<RecursiveIteration<[
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]>, 40, Test.Pass>(), // max length is 40
    check<RecursiveIteration<[
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]>, number, Test.Pass>() // it overflowed
]);
