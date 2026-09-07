// @strict: true

// Regression test for #63271: `Dec<2>` is `any`, so `Recur` produces both conditional branches and
// keeps tail-recursing forever. The checker must report an error instead of building an unbounded
// template literal type.

type Dec<N extends number> =
    N extends 5 ? 4 : N extends 4 ? 3 : N extends 3 ? 2 :
    N extends 2 ? any :
    N extends 1 ? 0 : 0;

type Recur<N extends number, S extends string> =
    N extends 0 ? S : Recur<Dec<N>, `${S}_${S}`>;

// The string literal doubles on every iteration.
type Explode = {
    [P in Recur<5, "a"> as `${P}_key`]: any;
};

// The number of placeholders doubles on every iteration.
type ExplodeSpans = {
    [P in Recur<5, string> as `${P}_key`]: any;
};
