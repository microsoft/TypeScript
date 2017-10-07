//// [emitter.pipelineOperatorStage1.es2015.ts]
declare const ar: Iterable<number>;
declare function map<T, U>(ar: Iterable<T>, fn: (v: T) => U): Iterable<U>;
declare function identity<T>(value: T): T;

const x = ar |> (_ => map(_, x => x + 1));
const y = ar |> identity;


//// [emitter.pipelineOperatorStage1.es2015.js]
const x = (_a = ar, (_ => map(_, x => x + 1))(_a));
const y = (_b = ar, identity(_b));
var _a, _b;
