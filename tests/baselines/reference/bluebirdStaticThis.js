//// [bluebirdStaticThis.ts]
// This version is reduced from the full d.ts by removing almost all the tests
// and all the comments.
// Then it adds explicit `this` arguments to the static members.
// Tests by: Bart van der Schoor <https://github.com/Bartvds>
export declare class Promise<R> implements Promise.Thenable<R> {
	constructor(callback: (resolve: (thenableOrResult: R | Promise.Thenable<R>) => void, reject: (error: any) => void) => void);
    static try<R>(dit: typeof Promise, fn: () => Promise.Thenable<R>, args?: any[], ctx?: any): Promise<R>;
    static try<R>(dit: typeof Promise, fn: () => R, args?: any[], ctx?: any): Promise<R>;

    static attempt<R>(dit: typeof Promise, fn: () => Promise.Thenable<R>, args?: any[], ctx?: any): Promise<R>;
    static attempt<R>(dit: typeof Promise, fn: () => R, args?: any[], ctx?: any): Promise<R>;

    static method(dit: typeof Promise, fn: Function): Function;

    static resolve(dit: typeof Promise): Promise<void>;
    static resolve<R>(dit: typeof Promise, value: Promise.Thenable<R>): Promise<R>;
    static resolve<R>(dit: typeof Promise, value: R): Promise<R>;

    static reject(dit: typeof Promise, reason: any): Promise<any>;
    static reject<R>(dit: typeof Promise, reason: any): Promise<R>;

    static defer<R>(dit: typeof Promise): Promise.Resolver<R>;

    static cast<R>(dit: typeof Promise, value: Promise.Thenable<R>): Promise<R>;
    static cast<R>(dit: typeof Promise, value: R): Promise<R>;

    static bind(dit: typeof Promise, thisArg: any): Promise<void>;

    static is(dit: typeof Promise, value: any): boolean;

    static longStackTraces(dit: typeof Promise): void;

    static delay<R>(dit: typeof Promise, value: Promise.Thenable<R>, ms: number): Promise<R>;
    static delay<R>(dit: typeof Promise, value: R, ms: number): Promise<R>;
    static delay(dit: typeof Promise, ms: number): Promise<void>;

    static promisify(dit: typeof Promise, nodeFunction: Function, receiver?: any): Function;

    static promisifyAll(dit: typeof Promise, target: Object): Object;

    static coroutine<R>(dit: typeof Promise, generatorFunction: Function): Function;

    static spawn<R>(dit: typeof Promise, generatorFunction: Function): Promise<R>;

    static noConflict(dit: typeof Promise): typeof Promise;

    static onPossiblyUnhandledRejection(dit: typeof Promise, handler: (reason: any) => any): void;

    static all<R>(dit: typeof Promise, values: Promise.Thenable<Promise.Thenable<R>[]>): Promise<R[]>;
    static all<R>(dit: typeof Promise, values: Promise.Thenable<R[]>): Promise<R[]>;
    static all<R>(dit: typeof Promise, values: Promise.Thenable<R>[]): Promise<R[]>;
    static all<R>(dit: typeof Promise, values: R[]): Promise<R[]>;

    static props(dit: typeof Promise, object: Promise<Object>): Promise<Object>;
    static props(dit: typeof Promise, object: Object): Promise<Object>;

    static settle<R>(dit: typeof Promise, values: Promise.Thenable<Promise.Thenable<R>[]>): Promise<Promise.Inspection<R>[]>;
    static settle<R>(dit: typeof Promise, values: Promise.Thenable<R[]>): Promise<Promise.Inspection<R>[]>;
    static settle<R>(dit: typeof Promise, values: Promise.Thenable<R>[]): Promise<Promise.Inspection<R>[]>;
    static settle<R>(dit: typeof Promise, values: R[]): Promise<Promise.Inspection<R>[]>;

    static any<R>(dit: typeof Promise, values: Promise.Thenable<Promise.Thenable<R>[]>): Promise<R>;
    static any<R>(dit: typeof Promise, values: Promise.Thenable<R[]>): Promise<R>;
    static any<R>(dit: typeof Promise, values: Promise.Thenable<R>[]): Promise<R>;
    static any<R>(dit: typeof Promise, values: R[]): Promise<R>;

    static race<R>(dit: typeof Promise, values: Promise.Thenable<Promise.Thenable<R>[]>): Promise<R>;
    static race<R>(dit: typeof Promise, values: Promise.Thenable<R[]>): Promise<R>;
    static race<R>(dit: typeof Promise, values: Promise.Thenable<R>[]): Promise<R>;
    static race<R>(dit: typeof Promise, values: R[]): Promise<R>;

    static some<R>(dit: typeof Promise, values: Promise.Thenable<Promise.Thenable<R>[]>, count: number): Promise<R[]>;
    static some<R>(dit: typeof Promise, values: Promise.Thenable<R[]>, count: number): Promise<R[]>;
    static some<R>(dit: typeof Promise, values: Promise.Thenable<R>[], count: number): Promise<R[]>;
    static some<R>(dit: typeof Promise, values: R[], count: number): Promise<R[]>;

    static join<R>(dit: typeof Promise, ...values: Promise.Thenable<R>[]): Promise<R[]>;
    static join<R>(dit: typeof Promise, ...values: R[]): Promise<R[]>;

    static map<R, U>(dit: typeof Promise, values: Promise.Thenable<Promise.Thenable<R>[]>, mapper: (item: R, index: number, arrayLength: number) => Promise.Thenable<U>): Promise<U[]>;
    static map<R, U>(dit: typeof Promise, values: Promise.Thenable<Promise.Thenable<R>[]>, mapper: (item: R, index: number, arrayLength: number) => U): Promise<U[]>;
    static map<R, U>(dit: typeof Promise, values: Promise.Thenable<R[]>, mapper: (item: R, index: number, arrayLength: number) => Promise.Thenable<U>): Promise<U[]>;
    static map<R, U>(dit: typeof Promise, values: Promise.Thenable<R[]>, mapper: (item: R, index: number, arrayLength: number) => U): Promise<U[]>;
    static map<R, U>(dit: typeof Promise, values: Promise.Thenable<R>[], mapper: (item: R, index: number, arrayLength: number) => Promise.Thenable<U>): Promise<U[]>;
    static map<R, U>(dit: typeof Promise, values: Promise.Thenable<R>[], mapper: (item: R, index: number, arrayLength: number) => U): Promise<U[]>;
    static map<R, U>(dit: typeof Promise, values: R[], mapper: (item: R, index: number, arrayLength: number) => Promise.Thenable<U>): Promise<U[]>;
    static map<R, U>(dit: typeof Promise, values: R[], mapper: (item: R, index: number, arrayLength: number) => U): Promise<U[]>;

    static reduce<R, U>(dit: typeof Promise, values: Promise.Thenable<Promise.Thenable<R>[]>, reducer: (total: U, current: R, index: number, arrayLength: number) => Promise.Thenable<U>, initialValue?: U): Promise<U>;
    static reduce<R, U>(dit: typeof Promise, values: Promise.Thenable<Promise.Thenable<R>[]>, reducer: (total: U, current: R, index: number, arrayLength: number) => U, initialValue?: U): Promise<U>;

    static reduce<R, U>(dit: typeof Promise, values: Promise.Thenable<R[]>, reducer: (total: U, current: R, index: number, arrayLength: number) => Promise.Thenable<U>, initialValue?: U): Promise<U>;
    static reduce<R, U>(dit: typeof Promise, values: Promise.Thenable<R[]>, reducer: (total: U, current: R, index: number, arrayLength: number) => U, initialValue?: U): Promise<U>;

    static reduce<R, U>(dit: typeof Promise, values: Promise.Thenable<R>[], reducer: (total: U, current: R, index: number, arrayLength: number) => Promise.Thenable<U>, initialValue?: U): Promise<U>;
    static reduce<R, U>(dit: typeof Promise, values: Promise.Thenable<R>[], reducer: (total: U, current: R, index: number, arrayLength: number) => U, initialValue?: U): Promise<U>;

    static reduce<R, U>(dit: typeof Promise, values: R[], reducer: (total: U, current: R, index: number, arrayLength: number) => Promise.Thenable<U>, initialValue?: U): Promise<U>;
    static reduce<R, U>(dit: typeof Promise, values: R[], reducer: (total: U, current: R, index: number, arrayLength: number) => U, initialValue?: U): Promise<U>;

    static filter<R>(dit: typeof Promise, values: Promise.Thenable<Promise.Thenable<R>[]>, filterer: (item: R, index: number, arrayLength: number) => Promise.Thenable<boolean>): Promise<R[]>;
    static filter<R>(dit: typeof Promise, values: Promise.Thenable<Promise.Thenable<R>[]>, filterer: (item: R, index: number, arrayLength: number) => boolean): Promise<R[]>;
    static filter<R>(dit: typeof Promise, values: Promise.Thenable<R[]>, filterer: (item: R, index: number, arrayLength: number) => Promise.Thenable<boolean>): Promise<R[]>;
    static filter<R>(dit: typeof Promise, values: Promise.Thenable<R[]>, filterer: (item: R, index: number, arrayLength: number) => boolean): Promise<R[]>;
    static filter<R>(dit: typeof Promise, values: Promise.Thenable<R>[], filterer: (item: R, index: number, arrayLength: number) => Promise.Thenable<boolean>): Promise<R[]>;
    static filter<R>(dit: typeof Promise, values: Promise.Thenable<R>[], filterer: (item: R, index: number, arrayLength: number) => boolean): Promise<R[]>;
    static filter<R>(dit: typeof Promise, values: R[], filterer: (item: R, index: number, arrayLength: number) => Promise.Thenable<boolean>): Promise<R[]>;
    static filter<R>(dit: typeof Promise, values: R[], filterer: (item: R, index: number, arrayLength: number) => boolean): Promise<R[]>;
}

export declare module Promise {
	export interface Thenable<R> {
		then<U>(onFulfilled: (value: R) => Thenable<U>, onRejected: (error: any) => Thenable<U>): Thenable<U>;
		then<U>(onFulfilled: (value: R) => Thenable<U>, onRejected?: (error: any) => U): Thenable<U>;
		then<U>(onFulfilled: (value: R) => U, onRejected: (error: any) => Thenable<U>): Thenable<U>;
		then<U>(onFulfilled?: (value: R) => U, onRejected?: (error: any) => U): Thenable<U>;
	}

}

interface Foo {
    a: number;
    b: string;
}
var x: any;
var arr: any[];
var foo: Foo;
var fooProm: Promise<Foo>;

fooProm = Promise.try(Promise, () => {
	return foo;
});
fooProm = Promise.try(Promise, () => {
	return foo;
}, arr);
fooProm = Promise.try(Promise, () => {
	return foo;
}, arr, x);

//// [bluebirdStaticThis.js]
"use strict";
exports.__esModule = true;
var x;
var arr;
var foo;
var fooProm;
fooProm = Promise["try"](Promise, function () {
    return foo;
});
fooProm = Promise["try"](Promise, function () {
    return foo;
}, arr);
fooProm = Promise["try"](Promise, function () {
    return foo;
}, arr, x);
