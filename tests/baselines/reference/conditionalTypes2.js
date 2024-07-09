//// [tests/cases/conformance/types/conditional/conditionalTypes2.ts] ////

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

// Repro from #28654

type MaybeTrue<T extends { b: boolean }> = true extends T["b"] ? "yes" : "no";

type T0 = MaybeTrue<{ b: never }>     // "no"
type T1 = MaybeTrue<{ b: false }>;    // "no"
type T2 = MaybeTrue<{ b: true }>;     // "yes"
type T3 = MaybeTrue<{ b: boolean }>;  // "yes"

// Repro from #28824

type Union = 'a' | 'b';
type Product<A extends Union, B> = { f1: A, f2: B};
type ProductUnion = Product<'a', 0> | Product<'b', 1>;

// {a: "b"; b: "a"}
type UnionComplement = {
  [K in Union]: Exclude<Union, K>
};
type UCA = UnionComplement['a'];
type UCB = UnionComplement['b'];

// {a: "a"; b: "b"}
type UnionComplementComplement = {
  [K in Union]: Exclude<Union, Exclude<Union, K>>
};
type UCCA = UnionComplementComplement['a'];
type UCCB = UnionComplementComplement['b'];

// {a: Product<'b', 1>; b: Product<'a', 0>}
type ProductComplement = {
  [K in Union]: Exclude<ProductUnion, { f1: K }>
};
type PCA = ProductComplement['a'];
type PCB = ProductComplement['b'];

// {a: Product<'a', 0>; b: Product<'b', 1>}
type ProductComplementComplement = {
  [K in Union]: Exclude<ProductUnion, Exclude<ProductUnion, { f1: K }>>
};
type PCCA = ProductComplementComplement['a'];
type PCCB = ProductComplementComplement['b'];

// Repro from #31326

type Hmm<T, U extends T> = U extends T ? { [K in keyof U]: number } : never;
type What = Hmm<{}, { a: string }>
const w: What = { a: 4 };

// Repro from #33568

declare function save(_response: IRootResponse<string>): void;

exportCommand(save);

declare function exportCommand<TResponse>(functionToCall: IExportCallback<TResponse>): void;

interface IExportCallback<TResponse> {
	(response: IRootResponse<TResponse>): void;
}

type IRootResponse<TResponse> =
	TResponse extends IRecord ? IRecordResponse<TResponse> : IResponse<TResponse>;

interface IRecord {
	readonly Id: string;
}

declare type IRecordResponse<T extends IRecord> = IResponse<T> & {
	sendRecord(): void;
};

declare type IResponse<T> = {
	sendValue(name: keyof GetAllPropertiesOfType<T, string>): void;
};

declare type GetPropertyNamesOfType<T, RestrictToType> = {
	[PropertyName in Extract<keyof T, string>]: T[PropertyName] extends RestrictToType ? PropertyName : never
}[Extract<keyof T, string>];

declare type GetAllPropertiesOfType<T, RestrictToType> = Pick<
	T,
	GetPropertyNamesOfType<Required<T>, RestrictToType>
>;

// Repro from #33568

declare function ff(x: Foo3<string>): void;
declare function gg<T>(f: (x: Foo3<T>) => void): void;
type Foo3<T> = T extends number ? { n: T } : { x: T };
gg(ff);

// Repro from #41613

type Wat<K extends string> = { x: { y: 0, z: 1 } } extends { x: { [P in K]: 0 } } ? true : false;
 
type Huh = Wat<"y">;  // true


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
var w = { a: 4 };
exportCommand(save);
gg(ff);


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
type Foo = {
    foo: string;
};
type Bar = {
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
type Extract2<T, U, V> = T extends U ? T extends V ? T : never : never;
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
type A<T, V, E> = T extends object ? {
    [Q in {
        [P in keyof T]: T[P] extends V ? P : P;
    }[keyof T]]: A<T[Q], V, E>;
} : T extends V ? T : never;
type B<T, V> = T extends object ? {
    [Q in {
        [P in keyof T]: T[P] extends V ? P : P;
    }[keyof T]]: B<T[Q], V>;
} : T extends V ? T : never;
type C<T, V, E> = {
    [Q in {
        [P in keyof T]: T[P] extends V ? P : P;
    }[keyof T]]: C<T[Q], V, E>;
};
type A2<T, V, E> = T extends object ? T extends any[] ? T : {
    [Q in keyof T]: A2<T[Q], V, E>;
} : T;
type B2<T, V> = T extends object ? T extends any[] ? T : {
    [Q in keyof T]: B2<T[Q], V>;
} : T;
type C2<T, V, E> = T extends object ? {
    [Q in keyof T]: C2<T[Q], V, E>;
} : T;
type MaybeTrue<T extends {
    b: boolean;
}> = true extends T["b"] ? "yes" : "no";
type T0 = MaybeTrue<{
    b: never;
}>;
type T1 = MaybeTrue<{
    b: false;
}>;
type T2 = MaybeTrue<{
    b: true;
}>;
type T3 = MaybeTrue<{
    b: boolean;
}>;
type Union = 'a' | 'b';
type Product<A extends Union, B> = {
    f1: A;
    f2: B;
};
type ProductUnion = Product<'a', 0> | Product<'b', 1>;
type UnionComplement = {
    [K in Union]: Exclude<Union, K>;
};
type UCA = UnionComplement['a'];
type UCB = UnionComplement['b'];
type UnionComplementComplement = {
    [K in Union]: Exclude<Union, Exclude<Union, K>>;
};
type UCCA = UnionComplementComplement['a'];
type UCCB = UnionComplementComplement['b'];
type ProductComplement = {
    [K in Union]: Exclude<ProductUnion, {
        f1: K;
    }>;
};
type PCA = ProductComplement['a'];
type PCB = ProductComplement['b'];
type ProductComplementComplement = {
    [K in Union]: Exclude<ProductUnion, Exclude<ProductUnion, {
        f1: K;
    }>>;
};
type PCCA = ProductComplementComplement['a'];
type PCCB = ProductComplementComplement['b'];
type Hmm<T, U extends T> = U extends T ? {
    [K in keyof U]: number;
} : never;
type What = Hmm<{}, {
    a: string;
}>;
declare const w: What;
declare function save(_response: IRootResponse<string>): void;
declare function exportCommand<TResponse>(functionToCall: IExportCallback<TResponse>): void;
interface IExportCallback<TResponse> {
    (response: IRootResponse<TResponse>): void;
}
type IRootResponse<TResponse> = TResponse extends IRecord ? IRecordResponse<TResponse> : IResponse<TResponse>;
interface IRecord {
    readonly Id: string;
}
declare type IRecordResponse<T extends IRecord> = IResponse<T> & {
    sendRecord(): void;
};
declare type IResponse<T> = {
    sendValue(name: keyof GetAllPropertiesOfType<T, string>): void;
};
declare type GetPropertyNamesOfType<T, RestrictToType> = {
    [PropertyName in Extract<keyof T, string>]: T[PropertyName] extends RestrictToType ? PropertyName : never;
}[Extract<keyof T, string>];
declare type GetAllPropertiesOfType<T, RestrictToType> = Pick<T, GetPropertyNamesOfType<Required<T>, RestrictToType>>;
declare function ff(x: Foo3<string>): void;
declare function gg<T>(f: (x: Foo3<T>) => void): void;
type Foo3<T> = T extends number ? {
    n: T;
} : {
    x: T;
};
type Wat<K extends string> = {
    x: {
        y: 0;
        z: 1;
    };
} extends {
    x: {
        [P in K]: 0;
    };
} ? true : false;
type Huh = Wat<"y">;
