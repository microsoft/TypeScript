//// [conditionalTypeAssignabilityWhenDeferred.ts]
// #29505

export type FilterPropsByType<T, TT> = {
    [K in keyof T]: T[K] extends TT ? K : never
}[keyof T];

function select<
    T extends string | number,
    TList extends object,
    TValueProp extends FilterPropsByType<TList, T>
>(property: T, list: TList[], valueProp: TValueProp) {}

<XX extends string>(x: XX, tipos: { value: XX }[]) => {
    select(x, tipos, "value");
};

// #29662

declare function onlyNullablePlease<T extends null extends T ? any : never>(
    value: T
): void;

declare function onlyNullablePlease2<
    T extends [null] extends [T] ? any : never
>(value: T): void;

declare var z: string | null;
onlyNullablePlease(z); // works as expected
onlyNullablePlease2(z); // works as expected

declare var y: string;
onlyNullablePlease(y); // error as expected
onlyNullablePlease2(y); // error as expected

<T>(t: T) => {
    var x: T | null = Math.random() > 0.5 ? null : t;
    onlyNullablePlease(x); // should work
    onlyNullablePlease2(x); // should work
};

<T>(t1: { x: T; y: T }, t2: T extends T ? { x: T; y: T } : never) => {
    t1 = t2; // OK
    t2 = t1; // should fail
};

type Foo<T> = T extends true ? string : "a";

<T>(x: Foo<T>, s: string) => {
    x = "a"; // Currently an error, should be ok
    x = s; // Error
};

// #26933

type Distributive<T> = T extends { a: number } ? { a: number } : { b: number };
<T>() => {
    const o = { a: 1, b: 2 };
    const x: [T] extends [string]
        ? { y: number }
        : { a: number; b: number } = undefined!;
    // Simple case: OK
    const o1: [T] extends [number] ? { a: number } : { b: number } = o;
    // Simple case where source happens to be a conditional type: also OK
    const x1: [T] extends [number]
        ? ([T] extends [string] ? { y: number } : { a: number })
        : ([T] extends [string] ? { y: number } : { b: number }) = x;
    // Infer type parameters: no good
    const o2: [T] extends [[infer U]] ? U : { b: number } = o;

    // The next 4 are arguable - if you choose to ignore the `never` distribution case,
    // then they're all good. The `never` case _is_ a bit of an outlier - we say distributive types
    // look approximately like the sum of their branches, but the `never` case bucks that.
    // There's an argument for the result of dumping `never` into a distributive conditional
    // being not `never`, but instead the intersection of the branches - a much more precise bound
    // on that "impossible" input.

    // Distributive where T might instantiate to never: no good
    const o3: Distributive<T> = o;
    // Distributive where T & string might instantiate to never: also no good
    const o4: Distributive<T & string> = o;
    // Distributive where {a: T} cannot instantiate to never: OK
    const o5: Distributive<{ a: T }> = o;
    // Distributive where check type is a conditional which returns a non-never type upon instantiation with `never` but can still return never otherwise: no good
    const o6: Distributive<[T] extends [never] ? { a: number } : never> = o;
};

type Wrapped<T> = { ___secret: T };
type Unwrap<T> = T extends Wrapped<infer U> ? U : T;

declare function set<T, K extends keyof T>(
    obj: T,
    key: K,
    value: Unwrap<T[K]>
): Unwrap<T[K]>;

class Foo2 {
    prop!: Wrapped<string>;

    method() {
        set(this, "prop", "hi"); // <-- type error
    }
}

set(new Foo2(), "prop", "hi"); // <-- typechecks

type InferBecauseWhyNot<T> = [T] extends [(p: infer P1) => any]
    ? P1 | T
    : never;

<Q extends (arg: any) => any>(x: Q): InferBecauseWhyNot<Q> => {
    return x;
};

type InferBecauseWhyNotDistributive<T> = T extends (p: infer P1) => any
    ? P1 | T
    : never;

<Q extends (arg: any) => any>(
    x: Q
): InferBecauseWhyNotDistributive<Q> => {
    return x; // should fail
};

let t: true;
let f: false;

let a: "a" extends "a" ? true : false = undefined!;
let b: "a" extends "b" ? true : false = undefined!;

t = a;
f = a; // !!! error TS2322: Type 'true' is not assignable to type 'false'.
t = b; // !!! error TS2322: Type 'false' is not assignable to type 'true'.
f = b;

a = true;
a = false; // !!! error TS2322: Type 'false' is not assignable to type 'true'.
b = true; // !!! error TS2322: Type 'true' is not assignable to type 'false'.
b = false;

// #23132

<T extends "a">() => {
    let a: T extends "a" ? true : false = undefined!;
    let b: T extends "b" ? true : false = undefined!;

    t = a;
    f = a; // !!! error TS2322: Type 'T extends "a" ? true : false' is not assignable to type 'false'.
    t = b; // !!! error TS2322: Type 'T extends "b" ? true : false' is not assignable to type 'true'.
    f = b;

    a = true;
    a = false; // !!! error TS2322: Type 'false' is not assignable to type 'T extends "a" ? true : false'.
    b = true; // !!! error TS2322: Type 'true' is not assignable to type 'T extends "b" ? true : false'.
    b = false;
};


//// [conditionalTypeAssignabilityWhenDeferred.js]
"use strict";
// #29505
exports.__esModule = true;
function select(property, list, valueProp) { }
(function (x, tipos) {
    select(x, tipos, "value");
});
onlyNullablePlease(z); // works as expected
onlyNullablePlease2(z); // works as expected
onlyNullablePlease(y); // error as expected
onlyNullablePlease2(y); // error as expected
(function (t) {
    var x = Math.random() > 0.5 ? null : t;
    onlyNullablePlease(x); // should work
    onlyNullablePlease2(x); // should work
});
(function (t1, t2) {
    t1 = t2; // OK
    t2 = t1; // should fail
});
(function (x, s) {
    x = "a"; // Currently an error, should be ok
    x = s; // Error
});
(function () {
    var o = { a: 1, b: 2 };
    var x = undefined;
    // Simple case: OK
    var o1 = o;
    // Simple case where source happens to be a conditional type: also OK
    var x1 = x;
    // Infer type parameters: no good
    var o2 = o;
    // The next 4 are arguable - if you choose to ignore the `never` distribution case,
    // then they're all good. The `never` case _is_ a bit of an outlier - we say distributive types
    // look approximately like the sum of their branches, but the `never` case bucks that.
    // There's an argument for the result of dumping `never` into a distributive conditional
    // being not `never`, but instead the intersection of the branches - a much more precise bound
    // on that "impossible" input.
    // Distributive where T might instantiate to never: no good
    var o3 = o;
    // Distributive where T & string might instantiate to never: also no good
    var o4 = o;
    // Distributive where {a: T} cannot instantiate to never: OK
    var o5 = o;
    // Distributive where check type is a conditional which returns a non-never type upon instantiation with `never` but can still return never otherwise: no good
    var o6 = o;
});
var Foo2 = /** @class */ (function () {
    function Foo2() {
    }
    Foo2.prototype.method = function () {
        set(this, "prop", "hi"); // <-- type error
    };
    return Foo2;
}());
set(new Foo2(), "prop", "hi"); // <-- typechecks
(function (x) {
    return x;
});
(function (x) {
    return x; // should fail
});
var t;
var f;
var a = undefined;
var b = undefined;
t = a;
f = a; // !!! error TS2322: Type 'true' is not assignable to type 'false'.
t = b; // !!! error TS2322: Type 'false' is not assignable to type 'true'.
f = b;
a = true;
a = false; // !!! error TS2322: Type 'false' is not assignable to type 'true'.
b = true; // !!! error TS2322: Type 'true' is not assignable to type 'false'.
b = false;
// #23132
(function () {
    var a = undefined;
    var b = undefined;
    t = a;
    f = a; // !!! error TS2322: Type 'T extends "a" ? true : false' is not assignable to type 'false'.
    t = b; // !!! error TS2322: Type 'T extends "b" ? true : false' is not assignable to type 'true'.
    f = b;
    a = true;
    a = false; // !!! error TS2322: Type 'false' is not assignable to type 'T extends "a" ? true : false'.
    b = true; // !!! error TS2322: Type 'true' is not assignable to type 'T extends "b" ? true : false'.
    b = false;
});
