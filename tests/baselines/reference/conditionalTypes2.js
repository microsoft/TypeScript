//// [conditionalTypes2.ts]
interface Covariant<T> {
    foo: T extends string ? T : number;
}

interface Contravariant<T> {
    foo: T extends string ? keyof T : number;
}

interface Invariant<T> {
    foo: T extends string ? keyof T : T;
}

function f1<A, B extends A>(a: Covariant<A>, b: Covariant<B>) {
    a = b;
    b = a;  // Error
}

function f2<A, B extends A>(a: Contravariant<A>, b: Contravariant<B>) {
    a = b;  // Error
    b = a;
}

function f3<A, B extends A>(a: Invariant<A>, b: Invariant<B>) {
    a = b;  // Error
    b = a;  // Error
}

// Extract<T, Function> is a T that is known to be a Function
function isFunction<T>(value: T): value is Extract<T, Function> {
    return typeof value === "function";
}

function getFunction<T>(item: T) {
    if (isFunction(item)) {
        return item;
    }
    throw new Error();
}

function f10<T>(x: T) {
    if (isFunction(x)) {
        const f: Function = x;
        const t: T = x;
    }
}

function f11(x: string | (() => string) | undefined) {
    if (isFunction(x)) {
        x();
    }
}

function f12(x: string | (() => string) | undefined) {
    const f = getFunction(x);  // () => string
    f();
}

type Foo = { foo: string };
type Bar = { bar: string };

declare function fooBar(x: { foo: string, bar: string }): void;
declare function fooBat(x: { foo: string, bat: string }): void;

type Extract2<T, U, V> = T extends U ? T extends V ? T : never : never;

function f20<T>(x: Extract<Extract<T, Foo>, Bar>, y: Extract<T, Foo & Bar>, z: Extract2<T, Foo, Bar>) {
    fooBar(x);
    fooBar(y);
    fooBar(z);
}

function f21<T>(x: Extract<Extract<T, Foo>, Bar>, y: Extract<T, Foo & Bar>, z: Extract2<T, Foo, Bar>) {
    fooBat(x);  // Error
    fooBat(y);  // Error
    fooBat(z);  // Error
}

// Repros from #22860

class Opt<T> {
    toVector(): Vector<T> {
        return <any>undefined;
    }
}

interface Seq<T> {
    tail(): Opt<Seq<T>>;
}

class Vector<T> implements Seq<T> {
    tail(): Opt<Vector<T>> {
        return <any>undefined;
    }
    partition2<U extends T>(predicate:(v:T)=>v is U): [Vector<U>,Vector<Exclude<T, U>>];
    partition2(predicate:(x:T)=>boolean): [Vector<T>,Vector<T>];
    partition2<U extends T>(predicate:(v:T)=>boolean): [Vector<U>,Vector<any>] {
        return <any>undefined;
    }
}

interface A1<T> {
    bat: B1<A1<T>>;
}

interface B1<T> extends A1<T> {
    bat: B1<B1<T>>;
    boom: T extends any ? true : true
}

// Repro from #22899

declare function toString1(value: object | Function): string ;
declare function toString2(value: Function): string ;

function foo<T>(value: T) {
    if (isFunction(value)) {
        toString1(value);
        toString2(value);
    }
}

// Repro from #23052

type A<T, V, E> =
  T extends object
    ? { [Q in { [P in keyof T]: T[P] extends V ? P : P; }[keyof T]]: A<T[Q], V, E>; }
    : T extends V ? T : never;

type B<T, V> =
  T extends object
    ? { [Q in { [P in keyof T]: T[P] extends V ? P : P; }[keyof T]]: B<T[Q], V>; }
    : T extends V ? T : never;

type C<T, V, E> =
  { [Q in { [P in keyof T]: T[P] extends V ? P : P; }[keyof T]]: C<T[Q], V, E>; };

// Repro from #23100

type A2<T, V, E> =
    T extends object ? T extends any[] ? T : { [Q in keyof T]: A2<T[Q], V, E>; } : T;

type B2<T, V> =
    T extends object ? T extends any[] ? T : { [Q in keyof T]: B2<T[Q], V>; } : T;

type C2<T, V, E> =
    T extends object ? { [Q in keyof T]: C2<T[Q], V, E>; } : T;

// #26933

type Distributive<T> = T extends {a: number} ? { a: number } : { b: number };

function testAssignabilityToConditionalType<T>() {
    const o = { a: 1, b: 2 };
    const x: [T] extends [string] ? { y: number } : { a: number, b: number } = undefined!;
    // Simple case: OK
    const o1: [T] extends [number] ? { a: number } : { b: number } = o;
    // Simple case where source happens to be a conditional type: also OK
    const x1: [T] extends [number]
        ? ([T] extends [string] ? { y: number } : { a: number })
        : ([T] extends [string] ? { y: number } : { b: number })
        = x;
    // Infer type parameters: no good
    const o2: [T] extends [[infer U]] ? U : { b: number } = o;
    // Distributive where T might instantiate to never: no good
    const o3: Distributive<T> = o;
    // Distributive where T & string might instantiate to never: also no good
    const o4: Distributive<T & string> = o;
    // Distributive where {a: T} cannot instantiate to never: OK
    const o5: Distributive<{a: T}> = o;
}


//// [conditionalTypes2.js]
"use strict";
function f1(a, b) {
    a = b;
    b = a; // Error
}
function f2(a, b) {
    a = b; // Error
    b = a;
}
function f3(a, b) {
    a = b; // Error
    b = a; // Error
}
// Extract<T, Function> is a T that is known to be a Function
function isFunction(value) {
    return typeof value === "function";
}
function getFunction(item) {
    if (isFunction(item)) {
        return item;
    }
    throw new Error();
}
function f10(x) {
    if (isFunction(x)) {
        var f = x;
        var t = x;
    }
}
function f11(x) {
    if (isFunction(x)) {
        x();
    }
}
function f12(x) {
    var f = getFunction(x); // () => string
    f();
}
function f20(x, y, z) {
    fooBar(x);
    fooBar(y);
    fooBar(z);
}
function f21(x, y, z) {
    fooBat(x); // Error
    fooBat(y); // Error
    fooBat(z); // Error
}
// Repros from #22860
var Opt = /** @class */ (function () {
    function Opt() {
    }
    Opt.prototype.toVector = function () {
        return undefined;
    };
    return Opt;
}());
var Vector = /** @class */ (function () {
    function Vector() {
    }
    Vector.prototype.tail = function () {
        return undefined;
    };
    Vector.prototype.partition2 = function (predicate) {
        return undefined;
    };
    return Vector;
}());
function foo(value) {
    if (isFunction(value)) {
        toString1(value);
        toString2(value);
    }
}
function testAssignabilityToConditionalType() {
    var o = { a: 1, b: 2 };
    var x = undefined;
    // Simple case: OK
    var o1 = o;
    // Simple case where source happens to be a conditional type: also OK
    var x1 = x;
    // Infer type parameters: no good
    var o2 = o;
    // Distributive where T might instantiate to never: no good
    var o3 = o;
    // Distributive where T & string might instantiate to never: also no good
    var o4 = o;
    // Distributive where {a: T} cannot instantiate to never: OK
    var o5 = o;
}


//// [conditionalTypes2.d.ts]
interface Covariant<T> {
    foo: T extends string ? T : number;
}
interface Contravariant<T> {
    foo: T extends string ? keyof T : number;
}
interface Invariant<T> {
    foo: T extends string ? keyof T : T;
}
declare function f1<A, B extends A>(a: Covariant<A>, b: Covariant<B>): void;
declare function f2<A, B extends A>(a: Contravariant<A>, b: Contravariant<B>): void;
declare function f3<A, B extends A>(a: Invariant<A>, b: Invariant<B>): void;
declare function isFunction<T>(value: T): value is Extract<T, Function>;
declare function getFunction<T>(item: T): Extract<T, Function>;
declare function f10<T>(x: T): void;
declare function f11(x: string | (() => string) | undefined): void;
declare function f12(x: string | (() => string) | undefined): void;
declare type Foo = {
    foo: string;
};
declare type Bar = {
    bar: string;
};
declare function fooBar(x: {
    foo: string;
    bar: string;
}): void;
declare function fooBat(x: {
    foo: string;
    bat: string;
}): void;
declare type Extract2<T, U, V> = T extends U ? T extends V ? T : never : never;
declare function f20<T>(x: Extract<Extract<T, Foo>, Bar>, y: Extract<T, Foo & Bar>, z: Extract2<T, Foo, Bar>): void;
declare function f21<T>(x: Extract<Extract<T, Foo>, Bar>, y: Extract<T, Foo & Bar>, z: Extract2<T, Foo, Bar>): void;
declare class Opt<T> {
    toVector(): Vector<T>;
}
interface Seq<T> {
    tail(): Opt<Seq<T>>;
}
declare class Vector<T> implements Seq<T> {
    tail(): Opt<Vector<T>>;
    partition2<U extends T>(predicate: (v: T) => v is U): [Vector<U>, Vector<Exclude<T, U>>];
    partition2(predicate: (x: T) => boolean): [Vector<T>, Vector<T>];
}
interface A1<T> {
    bat: B1<A1<T>>;
}
interface B1<T> extends A1<T> {
    bat: B1<B1<T>>;
    boom: T extends any ? true : true;
}
declare function toString1(value: object | Function): string;
declare function toString2(value: Function): string;
declare function foo<T>(value: T): void;
declare type A<T, V, E> = T extends object ? {
    [Q in {
        [P in keyof T]: T[P] extends V ? P : P;
    }[keyof T]]: A<T[Q], V, E>;
} : T extends V ? T : never;
declare type B<T, V> = T extends object ? {
    [Q in {
        [P in keyof T]: T[P] extends V ? P : P;
    }[keyof T]]: B<T[Q], V>;
} : T extends V ? T : never;
declare type C<T, V, E> = {
    [Q in {
        [P in keyof T]: T[P] extends V ? P : P;
    }[keyof T]]: C<T[Q], V, E>;
};
declare type A2<T, V, E> = T extends object ? T extends any[] ? T : {
    [Q in keyof T]: A2<T[Q], V, E>;
} : T;
declare type B2<T, V> = T extends object ? T extends any[] ? T : {
    [Q in keyof T]: B2<T[Q], V>;
} : T;
declare type C2<T, V, E> = T extends object ? {
    [Q in keyof T]: C2<T[Q], V, E>;
} : T;
declare type Distributive<T> = T extends {
    a: number;
} ? {
    a: number;
} : {
    b: number;
};
declare function testAssignabilityToConditionalType<T>(): void;
