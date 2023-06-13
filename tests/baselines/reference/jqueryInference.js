//// [tests/cases/compiler/jqueryInference.ts] ////

//// [jqueryInference.ts]
// #22362
interface MyPromise<T, U> {
    then(cb: (t: T) => void): void;
    thenUnion(cb: (t: T | U) => void): this;
}

interface DoNothingAlias<T, U> extends MyPromise<T, U> { }

declare function shouldBeIdentity<T, U>(p: DoNothingAlias<T, U>): MyPromise<T, U>;

declare const p1: MyPromise<boolean, any>;
var p2 = shouldBeIdentity(p1);
var p2: MyPromise<boolean, any>;


//// [jqueryInference.js]
var p2 = shouldBeIdentity(p1);
var p2;
