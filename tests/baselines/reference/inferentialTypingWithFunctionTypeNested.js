//// [inferentialTypingWithFunctionTypeNested.ts]
declare function map<T, U>(x: T, f: () => { x: (s: T) => U }): U;
declare function identity<V>(y: V): V;

var s = map("", () => { return { x: identity }; });

//// [inferentialTypingWithFunctionTypeNested.js]
var s = map("", function () { return { x: identity }; });
