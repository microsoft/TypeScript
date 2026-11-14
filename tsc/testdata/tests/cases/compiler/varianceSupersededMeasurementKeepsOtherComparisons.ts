// @strict: true
// @noEmit: true
// @checkOrder: default,typesfirst

// Reduced from zod v4 with LangGraph's `register` augmentation
// (langchain-ai/openwiki). Measuring the variance of B reaches A, which is
// smaller, so the measurement is superseded and measured again from A. While
// it finishes, comparing the parameters of `m` re-enters B, and its return
// type resolves `Check<B<number>>`, whose comparison is not part of the
// measurement. It must still compare as it would from scratch, as the
// resolved conditional type is kept.

declare let b1: B<string>;
declare let b2: B<"s">;
b1 = b2;

interface A<T> { m(x: B<T>): Check<B<number>>; }
interface B<T> { a: A<T>; }
type Check<U> = U extends { a: unknown } ? "yes" : "no";

const v: Check<B<number>> = "yes";
