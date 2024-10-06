//// [tests/cases/conformance/types/typeParameters/typeParameterLists/varianceAnnotations.ts] ////

//// [varianceAnnotations.ts]
type Covariant<out T> = {
    x: T;
}

declare let super_covariant: Covariant<unknown>;
declare let sub_covariant: Covariant<string>;

super_covariant = sub_covariant;
sub_covariant = super_covariant;  // Error

type Contravariant<in T> = {
    f: (x: T) => void;
}

declare let super_contravariant: Contravariant<unknown>;
declare let sub_contravariant: Contravariant<string>;

super_contravariant = sub_contravariant;  // Error
sub_contravariant = super_contravariant;

type Invariant<in out T> = {
    f: (x: T) => T;
}

declare let super_invariant: Invariant<unknown>;
declare let sub_invariant: Invariant<string>;

super_invariant = sub_invariant;  // Error
sub_invariant = super_invariant;  // Error

// Variance of various type constructors

type T10<out T> = T;
type T11<in T> = keyof T;
type T12<out T, out K extends keyof T> = T[K];
type T13<in out T> = T[keyof T];

// Variance annotation errors

type Covariant1<in T> = {  // Error
    x: T;
}

type Contravariant1<out T> = keyof T;  // Error

type Contravariant2<out T> = {  // Error
    f: (x: T) => void;
}

type Invariant1<in T> = {  // Error
    f: (x: T) => T;
}

type Invariant2<out T> = {  // Error
    f: (x: T) => T;
}

// Variance in circular types

type Foo1<in T> = {  // Error
    x: T;
    f: FooFn1<T>;
}

type FooFn1<T> = (foo: Bar1<T[]>) => void;

type Bar1<T> = {
    value: Foo1<T[]>;
}

type Foo2<out T> = {  // Error
    x: T;
    f: FooFn2<T>;
}

type FooFn2<T> = (foo: Bar2<T[]>) => void;

type Bar2<T> = {
    value: Foo2<T[]>;
}

type Foo3<in out T> = {
    x: T;
    f: FooFn3<T>;
}

type FooFn3<T> = (foo: Bar3<T[]>) => void;

type Bar3<T> = {
    value: Foo3<T[]>;
}

// Wrong modifier usage

type T20<public T> = T;  // Error
type T21<in out in T> = T;  // Error
type T22<in out out T> = T;  // Error
type T23<out in T> = T;  // Error

declare function f1<in T>(x: T): void;  // Error
declare function f2<out T>(): T;  // Error

class C {
    in a = 0;  // Error
    out b = 0;  // Error
}

// Interface merging

interface Baz<out T> {}
interface Baz<in T> {}

declare let baz1: Baz<unknown>;
declare let baz2: Baz<string>;

baz1 = baz2;  // Error
baz2 = baz1;  // Error

// Repro from #44572

interface Parent<out A> {
    child: Child<A> | null;
    parent: Parent<A> | null;
}

interface Child<A, B = unknown> extends Parent<A> {
    readonly a: A;
    readonly b: B;
}

function fn<A>(inp: Child<A>) {
    const a: Child<unknown> = inp;
}

const pu: Parent<unknown> = { child: { a: 0, b: 0, child: null, parent: null }, parent: null };
const notString: Parent<string> = pu;  // Error

// Repro from comment in #44572

declare class StateNode<TContext, in out TEvent extends { type: string }> {
    _storedEvent: TEvent;
    _action: ActionObject<TEvent>;
    _state: StateNode<TContext, any>;
}

interface ActionObject<TEvent extends { type: string }> {
    exec: (meta: StateNode<any, TEvent>) => void;
}

declare function createMachine<TEvent extends { type: string }>(action: ActionObject<TEvent>): StateNode<any, any>;

declare function interpret<TContext>(machine: StateNode<TContext, any>): void;

const machine = createMachine({} as any);

interpret(machine);

declare const qq: ActionObject<{ type: "PLAY"; value: number }>;

createMachine<{ type: "PLAY"; value: number } | { type: "RESET" }>(qq);  // Error

// Repros from #48618

let Anon = class <out T> {
    foo(): InstanceType<(typeof Anon<T>)> {
        return this;
    }
}

let OuterC = class C<out T> {
    foo(): C<T> {
        return this;
    }
}


//// [varianceAnnotations.js]
"use strict";
super_covariant = sub_covariant;
sub_covariant = super_covariant; // Error
super_contravariant = sub_contravariant; // Error
sub_contravariant = super_contravariant;
super_invariant = sub_invariant; // Error
sub_invariant = super_invariant; // Error
var C = /** @class */ (function () {
    function C() {
        this.a = 0; // Error
        this.b = 0; // Error
    }
    return C;
}());
baz1 = baz2; // Error
baz2 = baz1; // Error
function fn(inp) {
    var a = inp;
}
var pu = { child: { a: 0, b: 0, child: null, parent: null }, parent: null };
var notString = pu; // Error
var machine = createMachine({});
interpret(machine);
createMachine(qq); // Error
// Repros from #48618
var Anon = /** @class */ (function () {
    function class_1() {
    }
    class_1.prototype.foo = function () {
        return this;
    };
    return class_1;
}());
var OuterC = /** @class */ (function () {
    function C() {
    }
    C.prototype.foo = function () {
        return this;
    };
    return C;
}());


//// [varianceAnnotations.d.ts]
type Covariant<out T> = {
    x: T;
};
declare let super_covariant: Covariant<unknown>;
declare let sub_covariant: Covariant<string>;
type Contravariant<in T> = {
    f: (x: T) => void;
};
declare let super_contravariant: Contravariant<unknown>;
declare let sub_contravariant: Contravariant<string>;
type Invariant<in out T> = {
    f: (x: T) => T;
};
declare let super_invariant: Invariant<unknown>;
declare let sub_invariant: Invariant<string>;
type T10<out T> = T;
type T11<in T> = keyof T;
type T12<out T, out K extends keyof T> = T[K];
type T13<in out T> = T[keyof T];
type Covariant1<in T> = {
    x: T;
};
type Contravariant1<out T> = keyof T;
type Contravariant2<out T> = {
    f: (x: T) => void;
};
type Invariant1<in T> = {
    f: (x: T) => T;
};
type Invariant2<out T> = {
    f: (x: T) => T;
};
type Foo1<in T> = {
    x: T;
    f: FooFn1<T>;
};
type FooFn1<T> = (foo: Bar1<T[]>) => void;
type Bar1<T> = {
    value: Foo1<T[]>;
};
type Foo2<out T> = {
    x: T;
    f: FooFn2<T>;
};
type FooFn2<T> = (foo: Bar2<T[]>) => void;
type Bar2<T> = {
    value: Foo2<T[]>;
};
type Foo3<in out T> = {
    x: T;
    f: FooFn3<T>;
};
type FooFn3<T> = (foo: Bar3<T[]>) => void;
type Bar3<T> = {
    value: Foo3<T[]>;
};
type T20<public T> = T;
type T21<in out in T> = T;
type T22<in out out T> = T;
type T23<out in T> = T;
declare function f1<in T>(x: T): void;
declare function f2<out T>(): T;
declare class C {
    in a: number;
    out b: number;
}
interface Baz<out T> {
}
interface Baz<in T> {
}
declare let baz1: Baz<unknown>;
declare let baz2: Baz<string>;
interface Parent<out A> {
    child: Child<A> | null;
    parent: Parent<A> | null;
}
interface Child<A, B = unknown> extends Parent<A> {
    readonly a: A;
    readonly b: B;
}
declare function fn<A>(inp: Child<A>): void;
declare const pu: Parent<unknown>;
declare const notString: Parent<string>;
declare class StateNode<TContext, in out TEvent extends {
    type: string;
}> {
    _storedEvent: TEvent;
    _action: ActionObject<TEvent>;
    _state: StateNode<TContext, any>;
}
interface ActionObject<TEvent extends {
    type: string;
}> {
    exec: (meta: StateNode<any, TEvent>) => void;
}
declare function createMachine<TEvent extends {
    type: string;
}>(action: ActionObject<TEvent>): StateNode<any, any>;
declare function interpret<TContext>(machine: StateNode<TContext, any>): void;
declare const machine: StateNode<any, any>;
declare const qq: ActionObject<{
    type: "PLAY";
    value: number;
}>;
declare let Anon: {
    new <out T>(): {
        foo(): InstanceType<(typeof Anon<T>)>;
    };
};
declare let OuterC: {
    new <out T>(): {
        foo(): /*elided*/ any;
    };
};
