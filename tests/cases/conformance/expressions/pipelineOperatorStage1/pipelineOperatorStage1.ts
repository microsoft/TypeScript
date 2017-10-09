// @experimentalPipelineStage1: true
// @target: es2015
declare const ar: Iterable<number>;
declare function map<T, U>(ar: Iterable<T>, fn: (v: T) => U): Iterable<U>;
declare function filter<T>(ar: Iterable<T>, fn: (v: T) => boolean): Iterable<T>;

const x = ar
    |> (_ => map(_, x => x + 1))
    |> (_ => filter(_, x => x > 2));
