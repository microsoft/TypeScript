//// [tests/cases/compiler/genericContextualComposition.ts] ////

//// [genericContextualComposition.ts]
type Enhancer<Extension extends {} = {}> = <Next extends {}>(next: Next) => Next & Extension;
declare function compose<A, Args extends any[], Result>(first: (value: A) => Result, second: (...args: Args) => A): (...args: Args) => Result;
declare function compose<Result>(...functions: Function[]): (...args: any[]) => Result;
declare const instrument: Enhancer<{ extra: unknown }>, persist: Enhancer;
const enhancer: Enhancer = compose(instrument, persist);


//// [genericContextualComposition.js]
"use strict";
const enhancer = compose(instrument, persist);
