
// All the following types are explained here:
// https://medium.freecodecamp.org/typescript-curry-ramda-types-f747e99744ab
// https://github.com/pirix-gh/medium/blob/master/types-curry-ramda/src/index.ts
declare namespace Tools {
    type Head<T extends any[]> =
        T extends [any, ...any[]]
        ? T[0]
        : never;

    type Tail<T extends any[]> =
        ((...t: T) => any) extends ((_: any, ...tail: infer TT) => any)
        ? TT
        : [];

    type HasTail<T extends any[]> =
        T extends ([] | [any])
        ? false
        : true;

    type Last<T extends any[]> = {
        0: Last<Tail<T>>;
        1: Head<T>;
    }[
        HasTail<T> extends true
        ? 0
        : 1
    ];

    type Length<T extends any[]> =
        T['length'];

    type Prepend<E, T extends any[]> =
        ((head: E, ...args: T) => any) extends ((...args: infer U) => any)
        ? U
        : T;

    type Drop<N extends number, T extends any[], I extends any[] = []> = {
        0: Drop<N, Tail<T>, Prepend<any, I>>;
        1: T;
    }[
        Length<I> extends N
        ? 1
        : 0
    ];

    type Cast<X, Y> = X extends Y ? X : Y;

    type Pos<I extends any[]> =
        Length<I>;

    type Next<I extends any[]> =
        Prepend<any, I>;

    type Prev<I extends any[]> =
        Tail<I>;

    type Iterator<Index extends number = 0, From extends any[] = [], I extends any[] = []> = {
        0: Iterator<Index, Next<From>, Next<I>>;
        1: From;
    }[
        Pos<I> extends Index
        ? 1
        : 0
    ];

    type Reverse<T extends any[], R extends any[] = [], I extends any[] = []> = {
        0: Reverse<T, Prepend<T[Pos<I>], R>, Next<I>>;
        1: R;
    }[
        Pos<I> extends Length<T>
        ? 1
        : 0
    ];

    type Concat<T1 extends any[], T2 extends any[]> =
        Reverse<Reverse<T1> extends infer R ? Cast<R, any[]> : never, T2>;

    type Append<E, T extends any[]> =
        Concat<T, [E]>;

    type ValueOfRecord<R> = R extends Record<any, infer T> ? T : never;
}

declare namespace R {
    export type Placeholder = { __placeholder: void };
}

declare namespace Curry {
    type GapOf<T1 extends any[], T2 extends any[], TN extends any[], I extends any[]> =
        T1[Tools.Pos<I>] extends R.Placeholder
        ? Tools.Append<T2[Tools.Pos<I>], TN>
        : TN;

    interface GapsOfWorker<T1 extends any[], T2 extends any[], TN extends any[] = [], I extends any[] = []> {
        0: GapsOf<T1, T2, GapOf<T1, T2, TN, I> extends infer G ? Tools.Cast<G, any[]> : never, Tools.Next<I>>;
        1: Tools.Concat<TN, Tools.Drop<Tools.Pos<I>, T2> extends infer D ? Tools.Cast<D, any[]> : never>;
    }
    type GapsOf<T1 extends any[], T2 extends any[], TN extends any[] = [], I extends any[] = []> = GapsOfWorker<T1, T2, TN, I>[
        Tools.Pos<I> extends Tools.Length<T1>
        ? 1
        : 0
    ];

    type PartialGaps<T extends any[]> = {
        [K in keyof T]?: T[K] | R.Placeholder
    };

    type CleanedGaps<T extends any[]> = {
        [K in keyof T]: NonNullable<T[K]>
    };

    type Gaps<T extends any[]> = CleanedGaps<PartialGaps<T>>;

    type Curry<F extends ((...args: any) => any)> =
        <T extends any[]>(...args: Tools.Cast<Tools.Cast<T, Gaps<Parameters<F>>>, any[]>) =>
            GapsOf<T, Parameters<F>> extends [any, ...any[]]
            ? Curry<(...args: GapsOf<T, Parameters<F>> extends infer G ? Tools.Cast<G, any[]> : never) => ReturnType<F>>
            : ReturnType<F>;
}
