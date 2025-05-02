//// [tests/cases/compiler/typeInferenceCacheInvalidation.ts] ////

//// [typeInferenceCacheInvalidation.ts]
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


//// [typeInferenceCacheInvalidation.js]
"use strict";
// Repro from #32230
example(42, function (foo, bar) { return ({
    t: function () {
        var s = bar;
    }
}); }, '42');
example(42, function (foo, bar) { return ({
    t: function () {
        var s = bar;
    }
}); }, '42');
