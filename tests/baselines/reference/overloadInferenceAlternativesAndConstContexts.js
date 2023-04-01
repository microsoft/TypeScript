//// [overloadInferenceAlternativesAndConstContexts.ts]
declare function sfc<T1>(props: { x: T1, y: T1 }): 1;
declare function sfc<const T2>(props: { a: T2, b: T2 }): T2;
declare function sfc<T3>(props: { q: T3, t: T3 }): 3;

declare function factory<
    TProps,
    TResult
>(tag: (props: TProps) => TResult, props: TProps, key?: string): TResult;

const result = factory(sfc, {a: 0, b: 0});
const result2 = factory<{a: 0, b: 0}, 0>(sfc, {a: 0, b: 0});


//// [overloadInferenceAlternativesAndConstContexts.js]
"use strict";
var result = factory(sfc, { a: 0, b: 0 });
var result2 = factory(sfc, { a: 0, b: 0 });
