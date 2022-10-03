//// [tupleTypeInference.ts]
declare var $q: IQService;

interface IQService {
    all<T1, T2, T3>(x: [IPromise<T1>, IPromise<T2>, IPromise<T3>]): IPromise<[T1, T2, T3]>;
    all<T1, T2>(x: [IPromise<T1>, IPromise<T2>]): IPromise<[T1, T2]>;
    all<T1>(x: [IPromise<T1>]): IPromise<[T1]>;
    when<T>(t?: T): IPromise<T>;
}

interface IPromise<T> {
    then<TResult>(callback: (t: T) => TResult): IPromise<TResult>;
}

// Implicit different types
var a = $q.all([$q.when<string>(), $q.when<number>()]);

// Explicit different types
var b = $q.all<string, number>([$q.when<string>(), $q.when<number>()]);

// Implicit identical types
var c = $q.all([$q.when<string>(), $q.when<string>()]);


//// [tupleTypeInference.js]
// Implicit different types
var a = $q.all([$q.when(), $q.when()]);
// Explicit different types
var b = $q.all([$q.when(), $q.when()]);
// Implicit identical types
var c = $q.all([$q.when(), $q.when()]);
