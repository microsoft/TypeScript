// @target: es6
// inspired by a comment in https://github.com/Microsoft/TypeScript/issues/4196

type AnyPromiseLikeObject = object & MyPromiseLike<any, any>;
interface MyPromiseLike<T extends not AnyPromiseLikeObject, E = Error> {
	then(onResolve: (value: T) => any, onReject: (error: E) => any): any;
}
    
type AwaitValue<T, E = any> = T extends MyPromiseLike<infer U, E> ? U : T; 

type CoercePromiseLike<T> = MyPromise<T extends MyPromiseLike<any, any> ? AwaitValue<T> : T, never>;

interface MyPromiseConstructor {
	resolve<T>(value: T): CoercePromiseLike<T>;
	reject<E = Error>(value: E): MyPromise<never, E>;
	all<T, E = Error>(values: Iterable<T>): MyPromise<AwaitValue<T>[] & not AnyPromiseLikeObject, E>;
	race<T, E = Error>(values: Iterable<T>): MyPromise<AwaitValue<T>, E>;
}
declare var MyPromise: MyPromiseConstructor;

interface MyPromise<T extends not AnyPromiseLikeObject, E = Error> {
	then(onResolve?: not Function, onReject?: not Function): MyPromise<T, E>;
	catch(onReject?: not Function): MyPromise<T, E>;
	then<U, F = E>(
		onResolve: (value: AwaitValue<T>) => U,
		onReject?: not Function,
	): MyPromise<AwaitValue<U, F>, E | F>;
	then<U, F = E>(
		onResolve: not Function,
		onReject: (error: E) => U,
	): MyPromise<T | AwaitValue<U, F>, F>;
	then<U, F = E>(
		onResolve: (value: AwaitValue<T>) => U,
		onReject: (error: E) => AwaitValue<U, F>,
	): MyPromise<AwaitValue<U, F>, F>;
	catch<U, F = E>(
		onReject: (error: E) => U,
	): MyPromise<T | AwaitValue<U, F>, F>;
	finally(onSettled: () => AnyPromiseLikeObject): MyPromise<T, E>;
}

const a = MyPromise.resolve(0);

const b = MyPromise.resolve(MyPromise.resolve(0));

const d = MyPromise.resolve(MyPromise.resolve(MyPromise.resolve(0)));

const e = MyPromise.resolve(0).then(x => "ok");

const f = MyPromise.all([1, 2, 3, Promise.resolve("ok")]);

const g = MyPromise.race([1, 2, 3, Promise.resolve("ok")]);
