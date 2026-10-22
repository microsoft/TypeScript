// @strict: true
// @noEmit: true

// The base constraint of Collect<F, unknown> is circular, since its
// constraint includes Collect<F, F>, whose constraint includes itself.
// Distributing Parameters over that constraint leads back into the
// circularity, so Parameters<Collect<F, unknown>> must instead have the
// constraint of its branches, unknown[], and be spreadable.

type Collect<F, Result> =
    Result & F extends (arg: infer A) => infer R
        ? Collect<F, F> | (() => R)
        : never;

function pipe<F extends (...args: any) => unknown>(args: Parameters<Collect<F, unknown>>, f: F) {
    f(...args);
}
