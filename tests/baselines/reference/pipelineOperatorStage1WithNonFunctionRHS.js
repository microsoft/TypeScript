//// [pipelineOperatorStage1WithNonFunctionRHS.ts]
declare const ar: Iterable<number>;
declare function map<T, U>(ar: Iterable<T>, fn: (v: T) => U): Iterable<U>;
declare function filter<T>(ar: Iterable<T>, fn: (v: T) => boolean): Iterable<T>;

const x = ar
    |> 1;


//// [pipelineOperatorStage1WithNonFunctionRHS.js]
const x = (_a = ar, 1(_a));
var _a;
