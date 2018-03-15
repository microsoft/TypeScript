//// [recursiveMappedTypeAssignability.ts]
type D<U> = { [P in keyof U]: D<U[P]> };
<T>(t: T, dt: D<T>) => { dt = t };
type DR<U> = { readonly [P in keyof U]: DR<U[P]> };
<T>(t: T, dt: DR<T>) => { dt = t };
type DP<U> = { [P in keyof U]?: DP<U[P]> };
<T>(t: T, dt: DP<T>) => { dt = t };
type DAP<U> = { [P in keyof U]?: DAP<U[P]> & U[P] };
<T>(t: T, dt: DAP<T>) => { dt = t };

// #21592
// doesn't work because aliasSymbol isn't set on the literal type
// since it's not top-level -- the union is.
type SafeAny<T> = {
    [K in keyof T]?: SafeAny<T[K]>
} | boolean | number | string | symbol | null | undefined
type DataValidator<T> = {
    [K in keyof T]?: (v: SafeAny<T[K]>) => v is T[K]
}

// modified repro with top-level mapped type, which works
// because the literal type has aliasSymbol set
type SafeAnyMap<T> = {
    [K in keyof T]?: SafeAny2<T[K]>
}
type SafeAny2<T> = SafeAnyMap<T> | boolean | number | string | symbol | null | undefined
<T>(t: T, sat: SafeAny2<T>) => { sat = t }


const fn = <T>(arg: T) => {
    ((arg2: RecursivePartial<T>) => {
        // ...
    })(arg);
};

type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};


//// [recursiveMappedTypeAssignability.js]
"use strict";
(function (t, dt) { dt = t; });
(function (t, dt) { dt = t; });
(function (t, dt) { dt = t; });
(function (t, dt) { dt = t; });
(function (t, sat) { sat = t; });
var fn = function (arg) {
    (function (arg2) {
        // ...
    })(arg);
};
