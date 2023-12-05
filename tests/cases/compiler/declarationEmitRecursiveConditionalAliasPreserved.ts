// @declaration: true
// @filename: input.d.ts

type _BuildPowersOf2LengthArrays<
    Length extends number,
    AccumulatedArray extends never[][],
> = AccumulatedArray[0][Length] extends never
    ? AccumulatedArray
    : _BuildPowersOf2LengthArrays<
        Length,
        [[...AccumulatedArray[0], ...AccumulatedArray[0]], ...AccumulatedArray]
    >;

type _ConcatLargestUntilDone<
    Length extends number,
    AccumulatedArray extends never[][],
    NextArray extends never[],
> = NextArray['length'] extends Length
    ? NextArray
    : [...AccumulatedArray[0], ...NextArray][Length] extends never
    ? _ConcatLargestUntilDone<
        Length,
        AccumulatedArray extends [AccumulatedArray[0], ...infer U]
        ? U extends never[][]
        ? U
        : never
        : never,
        NextArray
    >
    : _ConcatLargestUntilDone<
        Length,
        AccumulatedArray extends [AccumulatedArray[0], ...infer U]
        ? U extends never[][]
        ? U
        : never
        : never,
        [...AccumulatedArray[0], ...NextArray]
    >

type _Replace<R extends unknown[], T> = { [K in keyof R]: T };

export type TupleOf<Type, Length extends number> = number extends Length
    ? Type[]
    : {
        // in case Length is a union
        [LengthKey in Length]: _BuildPowersOf2LengthArrays<
            LengthKey,
            [[never]]
        > extends infer TwoDimensionalArray
        ? TwoDimensionalArray extends never[][]
        ? _Replace<_ConcatLargestUntilDone<LengthKey, TwoDimensionalArray, []>, Type>
        : never
        : never
    }[Length];

export type Subtract<N1 extends number, N2 extends number> = TupleOf<never, N1> extends [
    ...TupleOf<never, N2>,
    ...infer R,
]
    ? R['length']
    : never;

export type Decrement<T extends number> = Subtract<T, 1>;

export type Add<N1 extends number, N2 extends number> = [
    ...TupleOf<never, N1>,
    ...TupleOf<never, N2>,
]['length'] &
    // intersection to suppress compiler narrowing bug
    number;

type _MultiAdd<
    Num extends number,
    Accumulator extends number,
    IterationsLeft extends number,
> = IterationsLeft extends 0
    ? Accumulator
    : _MultiAdd<Num, Add<Num, Accumulator>, Decrement<IterationsLeft>>

export type Multiply<N1 extends number, N2 extends number> = number extends N1 | N2
    ? number
    : {
        [K2 in N2]: { [K1 in N1]: _MultiAdd<K1, 0, N2> }[N1]
    }[N2]

type PowerTailRec<
    Num extends number,
    PowerOf extends number,
    Result extends number,
> = number extends PowerOf
    ? number
    : PowerOf extends 0
    ? Result
    : PowerTailRec<Num, Decrement<PowerOf>, Multiply<Result, Num>>;

export type Power<Num extends number, PowerOf extends number> = PowerTailRec<Num, PowerOf, 1>;

// @filename: a.tsx
import { Power } from "./input";

export const power = <Num extends number, PowerOf extends number>(
    num: Num,
    powerOf: PowerOf
): Power<Num, PowerOf> => (num ** powerOf) as never;