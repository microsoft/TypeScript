// @strict: true

// Repro from GH#62345 - silentNeverType should not leak from anonymous non-aliased object type instantiations.
// All foo1-foo5 should consistently produce errors with resolve typed as (value: unknown) => void,
// not just foo2/foo3 which use type aliases or tuples.

interface P<T> {
    then: (onfulfilled: (value: T) => unknown) => unknown;
}

interface PConstructor {
    new <T>(executor: (resolve: (value: T) => void) => void): P<T>;
}

declare var P: PConstructor;

declare function foo1<T>(x: () => P<{ default: T }>): T;

const result1 = foo1(() => {
    return new P((resolve) => {
        resolve;
    });
});

type WithDefault<T> = { default: T };

declare function foo2<T>(x: () => P<WithDefault<T>>): T;

const result2 = foo2(() => {
    return new P((resolve) => {
        resolve;
    });
});

declare function foo3<T>(x: () => P<[T]>): T;

const result3 = foo3(() => {
    return new P((resolve) => {
        resolve;
    });
});

declare function foo4<T>(x: () => P<{ default: { prop: T } }>): T;

const result4 = foo4(() => {
    return new P((resolve) => {
        resolve;
    });
});

declare function foo5<T>(x: () => P<{ default: [T] }>): T;

const result5 = foo5(() => {
    return new P((resolve) => {
        resolve;
    });
});
