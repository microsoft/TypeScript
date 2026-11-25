//// [tests/cases/conformance/types/mapped/isomorphicMappedTypeInference.ts] ////

//// [isomorphicMappedTypeInference.ts]
type Box<T> = {
    value: T;
}

type Boxified<T> = {
    [P in keyof T]: Box<T[P]>;
}

function box<T>(x: T): Box<T> {
    return { value: x };
}

function unbox<T>(x: Box<T>): T {
    return x.value;
}

function boxify<T>(obj: T): Boxified<T> {
    let result = {} as Boxified<T>;
    for (let k in obj) {
        result[k] = box(obj[k]);
    }
    return result;
}

function unboxify<T extends object>(obj: Boxified<T>): T {
    let result = {} as T;
    for (let k in obj) {
        result[k] = unbox(obj[k]);
    }
    return result;
}

function assignBoxified<T>(obj: Boxified<T>, values: T) {
    for (let k in values) {
        obj[k].value = values[k];
    }
}

function f1() {
    let v = {
        a: 42,
        b: "hello",
        c: true
    };
    let b = boxify(v);
    let x: number = b.a.value;
}

function f2() {
    let b = {
        a: box(42),
        b: box("hello"),
        c: box(true)
    };
    let v = unboxify(b);
    let x: number = v.a;
}

function f3() {
    let b = {
        a: box(42),
        b: box("hello"),
        c: box(true)
    };
    assignBoxified(b, { c: false });
}

function f4() {
    let b = {
        a: box(42),
        b: box("hello"),
        c: box(true)
    };
    b = boxify(unboxify(b));
    b = unboxify(boxify(b));
}

function makeRecord<T, K extends string>(obj: { [P in K]: T }) {
    return obj;
}

function f5(s: string) {
    let b = makeRecord({
        a: box(42),
        b: box("hello"),
        c: box(true)
    });
    let v = unboxify(b);
    let x: string | number | boolean = v.a;
}

function makeDictionary<T>(obj: { [x: string]: T }) {
    return obj;
}

function f6(s: string) {
    let b = makeDictionary({
        a: box(42),
        b: box("hello"),
        c: box(true)
    });
    let v = unboxify(b);
    let x: string | number | boolean = v[s];
}

declare function validate<T>(obj: { [P in keyof T]?: T[P] }): T;
declare function clone<T>(obj: { readonly [P in keyof T]: T[P] }): T;
declare function validateAndClone<T>(obj: { readonly [P in keyof T]?: T[P] }): T;

type Foo = {
    a?: number;
    readonly b: string;
}

function f10(foo: Foo) {
    let x = validate(foo);  // { a: number, readonly b: string }
    let y = clone(foo);  // { a?: number, b: string }
    let z = validateAndClone(foo);  // { a: number, b: string }
}

// Repro from #12606

type Func<T> = (...args: any[]) => T;
type Spec<T> = {
    [P in keyof T]: Func<T[P]> | Spec<T[P]> ;
};

/**
 * Given a spec object recursively mapping properties to functions, creates a function
 * producing an object of the same structure, by mapping each property to the result
 * of calling its associated function with the supplied arguments.
 */
declare function applySpec<T>(obj: Spec<T>): (...args: any[]) => T;

// Infers g1: (...args: any[]) => { sum: number, nested: { mul: string } }
var g1 = applySpec({
    sum: (a: any) => 3,
    nested: {
        mul: (b: any) => "n"
    }
});

// Infers g2: (...args: any[]) => { foo: { bar: { baz: boolean } } }
var g2 = applySpec({ foo: { bar: { baz: (x: any) => true } } });

// Repro from #12633

const foo = <T>(object: T, partial: Partial<T>) => object;
let o = {a: 5, b: 7};
foo(o, {b: 9});
o = foo(o, {b: 9});

// Inferring to { [P in K]: X }, where K extends keyof T, produces same inferences as
// inferring to { [P in keyof T]: X }.

declare function f20<T, K extends keyof T>(obj: Pick<T, K>): T;
declare function f21<T, K extends keyof T>(obj: Pick<T, K>): K;
declare function f22<T, K extends keyof T>(obj: Boxified<Pick<T, K>>): T;
declare function f23<T, U extends keyof T, K extends U>(obj: Pick<T, K>): T;
declare function f24<T, U, K extends keyof T | keyof U>(obj: Pick<T & U, K>): T & U;

let x0 = f20({ foo: 42, bar: "hello" });
let x1 = f21({ foo: 42, bar: "hello" });
let x2 = f22({ foo: { value: 42} , bar: { value: "hello" } });
let x3 = f23({ foo: 42, bar: "hello" });
let x4 = f24({ foo: 42, bar: "hello" });

// Repro from #29765

function getProps<T, K extends keyof T>(obj: T, list: K[]): Pick<T, K> {
    return {} as any;
}

const myAny: any = {};

const o1 = getProps(myAny, ['foo', 'bar']);

const o2: { foo: any; bar: any } = getProps(myAny, ['foo', 'bar']);

// Inference between homomorphic mapped types should infer the original type
// parameter, not its distributed representation.
declare function inferFromMapped<T>(value: { [P in keyof T]: T[P] }): T;

function f30<U>(value: { [P in keyof U]: U[P] }, ordinary: U) {
    const inferred = inferFromMapped(value);
    const accept: typeof inferred = ordinary;
}

// Inference to homomorphic mapped types nested in conditional types

declare function inferInNonDistributive<T>(x: [T] extends [object] ? { [K in keyof T]: () => T[K] } : never): T;
const inferredInNonDistributive = inferInNonDistributive({ a: () => 1 });

declare function inferInDistributive<T>(x: T extends unknown ? { [K in keyof T]: () => T[K] } : never): T;
const inferredInDistributive = inferInDistributive({ a: () => 1 });

declare function inferFromMappedSelf<T>(value: { [P in keyof T]: T }): T;
function f40<U>(value: { [P in keyof U]: U }, ordinary: U) {
    const inferred = inferFromMappedSelf(value);
    const accept: typeof inferred = ordinary;
}

declare function inferFromMappedBox<X, T>(value: { [P in keyof X]: Box<T> }): T;
function f41<U>(value: { [P in keyof U]: Box<U> }, ordinary: U) {
    const inferred = inferFromMappedBox(value);
    const accept: typeof inferred = ordinary;
}

declare function inferFromMappedInlineObject<X, T>(value: { [P in keyof X]: { value: T } }): T;
function f42<U>(value: { [P in keyof U]: { value: U } }, ordinary: U) {
    const inferred = inferFromMappedInlineObject(value);
    const accept: typeof inferred = ordinary;
}

declare function inferFromMappedInlineFunction<X, T>(value: { [P in keyof X]: (arg: T) => T }): T;
function f43<U>(value: { [P in keyof U]: (arg: U) => U }, ordinary: U) {
    const inferred = inferFromMappedInlineFunction(value);
    const accept: typeof inferred = ordinary;
}

declare function inferFromMappedInlineIntersection<X, T>(value: { [P in keyof X]: { a: T } & { b: T } }): T;
function f44<U>(value: { [P in keyof U]: { a: U } & { b: U } }, ordinary: U) {
    const inferred = inferFromMappedInlineIntersection(value);
    const accept: typeof inferred = ordinary;
}

declare function inferFromMappedConditional<X, T>(value: { [P in keyof X]: X[P] extends string ? { value: T } : never }): T;
function f45<U>(value: { [P in keyof U]: U[P] extends string ? { value: U } : never }, ordinary: U) {
    const inferred = inferFromMappedConditional(value);
    const accept: typeof inferred = ordinary;
}

declare function inferFromPlainTargetOfMapped<T>(value: { a: { value: T } }): T;
function f46<U extends { a: unknown }>(value: { [P in keyof U]: { value: U } }, ordinary: U) {
    const inferred = inferFromPlainTargetOfMapped(value);
    const accept: typeof inferred = ordinary;
}

declare function inferFromWrappedMapped<X, T>(value: { wrap: { [P in keyof X]: { value: T } } }): T;
function f47<U>(value: { wrap: { [P in keyof U]: { value: U } } }, ordinary: U) {
    const inferred = inferFromWrappedMapped(value);
    const accept: typeof inferred = ordinary;
}

declare function inferFromMappedCallbackParameter<X, T>(cb: (arg: { [P in keyof X]: { value: T } }) => void): T;
function f48<U>(cb: (arg: { [P in keyof U]: { value: U } }) => void, ordinary: U) {
    const inferred = inferFromMappedCallbackParameter(cb);
    const accept: typeof inferred = ordinary;
}

declare function inferFromDeeplyNestedMapped<X, T>(value: { [P in keyof X]: { a: { b: [() => T] } } }): T;
function f49<U>(value: { [P in keyof U]: { a: { b: [() => U] } } }, ordinary: U) {
    const inferred = inferFromDeeplyNestedMapped(value);
    const accept: typeof inferred = ordinary;
}


//// [isomorphicMappedTypeInference.js]
"use strict";
function box(x) {
    return { value: x };
}
function unbox(x) {
    return x.value;
}
function boxify(obj) {
    let result = {};
    for (let k in obj) {
        result[k] = box(obj[k]);
    }
    return result;
}
function unboxify(obj) {
    let result = {};
    for (let k in obj) {
        result[k] = unbox(obj[k]);
    }
    return result;
}
function assignBoxified(obj, values) {
    for (let k in values) {
        obj[k].value = values[k];
    }
}
function f1() {
    let v = {
        a: 42,
        b: "hello",
        c: true
    };
    let b = boxify(v);
    let x = b.a.value;
}
function f2() {
    let b = {
        a: box(42),
        b: box("hello"),
        c: box(true)
    };
    let v = unboxify(b);
    let x = v.a;
}
function f3() {
    let b = {
        a: box(42),
        b: box("hello"),
        c: box(true)
    };
    assignBoxified(b, { c: false });
}
function f4() {
    let b = {
        a: box(42),
        b: box("hello"),
        c: box(true)
    };
    b = boxify(unboxify(b));
    b = unboxify(boxify(b));
}
function makeRecord(obj) {
    return obj;
}
function f5(s) {
    let b = makeRecord({
        a: box(42),
        b: box("hello"),
        c: box(true)
    });
    let v = unboxify(b);
    let x = v.a;
}
function makeDictionary(obj) {
    return obj;
}
function f6(s) {
    let b = makeDictionary({
        a: box(42),
        b: box("hello"),
        c: box(true)
    });
    let v = unboxify(b);
    let x = v[s];
}
function f10(foo) {
    let x = validate(foo); // { a: number, readonly b: string }
    let y = clone(foo); // { a?: number, b: string }
    let z = validateAndClone(foo); // { a: number, b: string }
}
// Infers g1: (...args: any[]) => { sum: number, nested: { mul: string } }
var g1 = applySpec({
    sum: (a) => 3,
    nested: {
        mul: (b) => "n"
    }
});
// Infers g2: (...args: any[]) => { foo: { bar: { baz: boolean } } }
var g2 = applySpec({ foo: { bar: { baz: (x) => true } } });
// Repro from #12633
const foo = (object, partial) => object;
let o = { a: 5, b: 7 };
foo(o, { b: 9 });
o = foo(o, { b: 9 });
let x0 = f20({ foo: 42, bar: "hello" });
let x1 = f21({ foo: 42, bar: "hello" });
let x2 = f22({ foo: { value: 42 }, bar: { value: "hello" } });
let x3 = f23({ foo: 42, bar: "hello" });
let x4 = f24({ foo: 42, bar: "hello" });
// Repro from #29765
function getProps(obj, list) {
    return {};
}
const myAny = {};
const o1 = getProps(myAny, ['foo', 'bar']);
const o2 = getProps(myAny, ['foo', 'bar']);
function f30(value, ordinary) {
    const inferred = inferFromMapped(value);
    const accept = ordinary;
}
const inferredInNonDistributive = inferInNonDistributive({ a: () => 1 });
const inferredInDistributive = inferInDistributive({ a: () => 1 });
function f40(value, ordinary) {
    const inferred = inferFromMappedSelf(value);
    const accept = ordinary;
}
function f41(value, ordinary) {
    const inferred = inferFromMappedBox(value);
    const accept = ordinary;
}
function f42(value, ordinary) {
    const inferred = inferFromMappedInlineObject(value);
    const accept = ordinary;
}
function f43(value, ordinary) {
    const inferred = inferFromMappedInlineFunction(value);
    const accept = ordinary;
}
function f44(value, ordinary) {
    const inferred = inferFromMappedInlineIntersection(value);
    const accept = ordinary;
}
function f45(value, ordinary) {
    const inferred = inferFromMappedConditional(value);
    const accept = ordinary;
}
function f46(value, ordinary) {
    const inferred = inferFromPlainTargetOfMapped(value);
    const accept = ordinary;
}
function f47(value, ordinary) {
    const inferred = inferFromWrappedMapped(value);
    const accept = ordinary;
}
function f48(cb, ordinary) {
    const inferred = inferFromMappedCallbackParameter(cb);
    const accept = ordinary;
}
function f49(value, ordinary) {
    const inferred = inferFromDeeplyNestedMapped(value);
    const accept = ordinary;
}


//// [isomorphicMappedTypeInference.d.ts]
type Box<T> = {
    value: T;
};
type Boxified<T> = {
    [P in keyof T]: Box<T[P]>;
};
declare function box<T>(x: T): Box<T>;
declare function unbox<T>(x: Box<T>): T;
declare function boxify<T>(obj: T): Boxified<T>;
declare function unboxify<T extends object>(obj: Boxified<T>): T;
declare function assignBoxified<T>(obj: Boxified<T>, values: T): void;
declare function f1(): void;
declare function f2(): void;
declare function f3(): void;
declare function f4(): void;
declare function makeRecord<T, K extends string>(obj: {
    [P in K]: T;
}): { [P in K]: T; };
declare function f5(s: string): void;
declare function makeDictionary<T>(obj: {
    [x: string]: T;
}): {
    [x: string]: T;
};
declare function f6(s: string): void;
declare function validate<T>(obj: {
    [P in keyof T]?: T[P];
}): T;
declare function clone<T>(obj: {
    readonly [P in keyof T]: T[P];
}): T;
declare function validateAndClone<T>(obj: {
    readonly [P in keyof T]?: T[P];
}): T;
type Foo = {
    a?: number;
    readonly b: string;
};
declare function f10(foo: Foo): void;
type Func<T> = (...args: any[]) => T;
type Spec<T> = {
    [P in keyof T]: Func<T[P]> | Spec<T[P]>;
};
/**
 * Given a spec object recursively mapping properties to functions, creates a function
 * producing an object of the same structure, by mapping each property to the result
 * of calling its associated function with the supplied arguments.
 */
declare function applySpec<T>(obj: Spec<T>): (...args: any[]) => T;
declare var g1: (...args: any[]) => {
    sum: number;
    nested: {
        mul: string;
    };
};
declare var g2: (...args: any[]) => {
    foo: {
        bar: {
            baz: boolean;
        };
    };
};
declare const foo: <T>(object: T, partial: Partial<T>) => T;
declare let o: {
    a: number;
    b: number;
};
declare function f20<T, K extends keyof T>(obj: Pick<T, K>): T;
declare function f21<T, K extends keyof T>(obj: Pick<T, K>): K;
declare function f22<T, K extends keyof T>(obj: Boxified<Pick<T, K>>): T;
declare function f23<T, U extends keyof T, K extends U>(obj: Pick<T, K>): T;
declare function f24<T, U, K extends keyof T | keyof U>(obj: Pick<T & U, K>): T & U;
declare let x0: {
    foo: number;
    bar: string;
};
declare let x1: "bar" | "foo";
declare let x2: {
    foo: number;
    bar: string;
};
declare let x3: {
    foo: number;
    bar: string;
};
declare let x4: {
    foo: number;
    bar: string;
} & {
    foo: number;
    bar: string;
};
declare function getProps<T, K extends keyof T>(obj: T, list: K[]): Pick<T, K>;
declare const myAny: any;
declare const o1: Pick<any, "bar" | "foo">;
declare const o2: {
    foo: any;
    bar: any;
};
declare function inferFromMapped<T>(value: {
    [P in keyof T]: T[P];
}): T;
declare function f30<U>(value: {
    [P in keyof U]: U[P];
}, ordinary: U): void;
declare function inferInNonDistributive<T>(x: [T] extends [object] ? {
    [K in keyof T]: () => T[K];
} : never): T;
declare const inferredInNonDistributive: {
    a: number;
};
declare function inferInDistributive<T>(x: T extends unknown ? {
    [K in keyof T]: () => T[K];
} : never): T;
declare const inferredInDistributive: {
    a: number;
};
declare function inferFromMappedSelf<T>(value: {
    [P in keyof T]: T;
}): T;
declare function f40<U>(value: {
    [P in keyof U]: U;
}, ordinary: U): void;
declare function inferFromMappedBox<X, T>(value: {
    [P in keyof X]: Box<T>;
}): T;
declare function f41<U>(value: {
    [P in keyof U]: Box<U>;
}, ordinary: U): void;
declare function inferFromMappedInlineObject<X, T>(value: {
    [P in keyof X]: {
        value: T;
    };
}): T;
declare function f42<U>(value: {
    [P in keyof U]: {
        value: U;
    };
}, ordinary: U): void;
declare function inferFromMappedInlineFunction<X, T>(value: {
    [P in keyof X]: (arg: T) => T;
}): T;
declare function f43<U>(value: {
    [P in keyof U]: (arg: U) => U;
}, ordinary: U): void;
declare function inferFromMappedInlineIntersection<X, T>(value: {
    [P in keyof X]: {
        a: T;
    } & {
        b: T;
    };
}): T;
declare function f44<U>(value: {
    [P in keyof U]: {
        a: U;
    } & {
        b: U;
    };
}, ordinary: U): void;
declare function inferFromMappedConditional<X, T>(value: {
    [P in keyof X]: X[P] extends string ? {
        value: T;
    } : never;
}): T;
declare function f45<U>(value: {
    [P in keyof U]: U[P] extends string ? {
        value: U;
    } : never;
}, ordinary: U): void;
declare function inferFromPlainTargetOfMapped<T>(value: {
    a: {
        value: T;
    };
}): T;
declare function f46<U extends {
    a: unknown;
}>(value: {
    [P in keyof U]: {
        value: U;
    };
}, ordinary: U): void;
declare function inferFromWrappedMapped<X, T>(value: {
    wrap: {
        [P in keyof X]: {
            value: T;
        };
    };
}): T;
declare function f47<U>(value: {
    wrap: {
        [P in keyof U]: {
            value: U;
        };
    };
}, ordinary: U): void;
declare function inferFromMappedCallbackParameter<X, T>(cb: (arg: {
    [P in keyof X]: {
        value: T;
    };
}) => void): T;
declare function f48<U>(cb: (arg: {
    [P in keyof U]: {
        value: U;
    };
}) => void, ordinary: U): void;
declare function inferFromDeeplyNestedMapped<X, T>(value: {
    [P in keyof X]: {
        a: {
            b: [() => T];
        };
    };
}): T;
declare function f49<U>(value: {
    [P in keyof U]: {
        a: {
            b: [() => U];
        };
    };
}, ordinary: U): void;
