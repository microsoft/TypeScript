//// [emitter.pipelineOperatorStage1.es5.ts]
declare const ar: Iterable<number>;
declare function map<T, U>(ar: Iterable<T>, fn: (v: T) => U): Iterable<U>;
declare function identity<T>(value: T): T;

const x = ar |> (_ => map(_, x => x + 1));
const y = ar |> identity;


//// [emitter.pipelineOperatorStage1.es5.js]
var x = (_a = ar, (function (_) { return map(_, function (x) { return x + 1; }); })(_a));
var y = (_b = ar, identity(_b));
var _a, _b;
