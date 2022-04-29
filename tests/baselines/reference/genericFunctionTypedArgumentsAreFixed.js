//// [genericFunctionTypedArgumentsAreFixed.ts]
declare function map<T, U>(f: (x: T) => U, xs: T[]): U[];
map((a) => a.length, [1]);

//// [genericFunctionTypedArgumentsAreFixed.js]
map(function (a) { return a.length; }, [1]);
