// @strict: true

// Repro from #32230

type Callback<TFoo, TBar> = (foo: TFoo, bar: TBar) => any

declare function example<TFoo, TBar, TCallback extends Callback<TFoo, TBar>>(
    foo: TFoo,
    callback: TCallback,
    bar: TBar,
): TCallback

example(42, (foo, bar) => ({
    t: () => {
        let s: string = bar;
    }
}), '42');

example(42, (foo, bar) => ({
    t() {
        let s: string = bar;
    }
}), '42');
