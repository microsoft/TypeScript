//// [partiallyNamedTuples.ts]
type NamedAndAnonymous = [a: string, number];

function fa1(...args: NamedAndAnonymous) {}
function fa2(a: NamedAndAnonymous, ...args: NamedAndAnonymous) {}

type NamedAnonymousMixed = [a: string, number, c: number, NamedAndAnonymous];

function fb1(...args: NamedAnonymousMixed) {}
function fb2(a: NamedAnonymousMixed, ...args: NamedAnonymousMixed) {}
function fb3(a: NamedAnonymousMixed, ...args: NamedAnonymousMixed[3]) {}

type ToAnonymousTuple<T extends unknown[]> = {
  [K in keyof T]: [K, T[K], keyof T, T];
};

type AnonymousToAnonymous = ToAnonymousTuple<[boolean, number]>;
type MixedToAnonymous = ToAnonymousTuple<[boolean, second: number]>;
type NamedToAnonymous = ToAnonymousTuple<[first: boolean, second: number]>;

type ToMixedTuple<T extends unknown[]> = {
  [K in keyof T]: [K, second: T[K], keyof T, fourth: T];
};

type AnonymousToMixed = ToMixedTuple<[boolean, number]>;
type MixedToMixed = ToMixedTuple<[boolean, second: number]>;
type NamedToMixed = ToMixedTuple<[first: boolean, second: number]>;

type MixedSpread = [first: boolean, ...[second: string]];


//// [partiallyNamedTuples.js]
function fa1() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
}
function fa2(a) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
}
function fb1() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
}
function fb2(a) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
}
function fb3(a) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
}
