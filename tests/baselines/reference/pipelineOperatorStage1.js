//// [pipelineOperatorStage1.ts]
declare const ar: Iterable<number>;
declare function map<T, U>(ar: Iterable<T>, fn: (v: T) => U): Iterable<U>;
declare function filter<T>(ar: Iterable<T>, fn: (v: T) => boolean): Iterable<T>;

const x = ar
    |> (_ => map(_, x => x + 1))
    |> (_ => filter(_, x => x > 2));


//// [pipelineOperatorStage1.js]
const x = (_a = ar, _a = (_ => map(_, x => x + 1))(_a), (_ => filter(_, x => x > 2))(_a));
var _a;
