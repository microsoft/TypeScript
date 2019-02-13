// @strict: true
// @declaration: true

// #27118: Conditional types are now invariant in the check type.

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
    a = b;  // Error
    b = a;  // Error
}

function f2<A, B extends A>(a: Contravariant<A>, b: Contravariant<B>) {
    a = b;  // Error
    b = a;  // Error
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

// Repros from #27118

type MyElement<A> = [A] extends [[infer E]] ? E : never;
function oops<A, B extends A>(arg: MyElement<A>): MyElement<B> {
    return arg;  // Unsound, should be error
}

type MyAcceptor<A> = [A] extends [[infer E]] ? (arg: E) => void : never;
function oops2<A, B extends A>(arg: MyAcceptor<B>): MyAcceptor<A> {
    return arg;  // Unsound, should be error
}

type Dist<T> = T extends number ? number : string;
type Aux<A extends { a: unknown }> = A["a"] extends number ? number : string;
type Nondist<T> = Aux<{a: T}>;
function oops3<T>(arg: Dist<T>): Nondist<T> {
    return arg;  // Unsound, should be error
}
