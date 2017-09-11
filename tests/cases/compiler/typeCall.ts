// @allowSyntheticDefaultImports: true
// @strictNullChecks: true
// @noimplicitany: true

type F1 = () => 1;
type a = F1();

type F2 = (a: string) => 1;
type b = F2('foo');

interface F3 {
    (): 1;
    (a: number): 2;
    (a: string): 3;
}
type c = F3();
type d = F3(123);
type e = F3('foo');

declare function f4(a: string): 1;
let a = 'foo';
type f = typeof f4(typeof a);

type g = (() => 1)();

type Id = <T>(v: T) => T;
type h = Id(123);

type Wrap<T> = Id(T);
type i = Wrap<123>;

type F5 = () => () => { a: () => 1; };
type j = F5()()['a']();

interface IsPrimitive {
  (o: object): '0';
  (o: any): '1';
}
type stringIsPrimitive = IsPrimitive(string);
type regexpIsPrimitive = IsPrimitive(RegExp);

// alternative, pass as parameters
type genericIsPrimitive3 = <T>(v: T) => IsPrimitive(T);
type stringIsPrimitive3 = genericIsPrimitive3(string);
type regexpIsPrimitive3 = genericIsPrimitive3(RegExp)

declare function angularFactory<G extends (...args: any[]) => R, R extends <T>(foo: T) => T[]>(g: G): R(123);
angularFactory((...args: any[]) => <T>(foo: T) => [foo] as [T])

interface BoolToString {
    (v: false): 'false';
    (v: true): 'true';
}
type strTrue = BoolToString(true);
type strFalse = BoolToString(false);
type strEither = BoolToString(true | false);
type strBool = BoolToString(boolean);
type strAny = BoolToString(any);

declare function safeDivide<
  B extends number,
  NotZero = ((v: '1') => 'whatever')({
    (v: 0): '0';
    (v: number): '1';
  }(B))
>(a: number, b: B): number;
safeDivide(3, 1);
safeDivide(3, 0); // fails, should error but doesn't

type map = <Fn extends (v: T) => any, O extends { [k: string]: T }, T>(fn: Fn, obj: O) => { [P in keyof O]: Fn(O[P]) };
type z = map(<T>(v: T) => [T], { a: 1, b: 2, c: 3 });
declare function map<Fn extends (v: T) => any, O extends { [k: string]: T }, T>(fn: Fn, obj: O): map(Fn, O);
// let z = map(<T>(v: T) => [T], { a: 1, b: 2, c: 3 });
// // fails with error: Cannot read property 'parent' of undefined at createDiagnosticForNodeFromMessageChain

type Inc = { [k: string]: string; 0:'1', 1:'2', 2:'3', 3:'4', 4:'5', 5:'6', 6:'7', 7:'8', 8:'9' };
type StringToNumber = { [k: string]: number; 0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8};
type TupleHasIndex<Arr extends any[], I extends string> = ({[K in keyof Arr]: '1' } & { [k: string]: '0' })[I];
type PathFn<T extends { [k: string]: any }, R extends Array<string>, I extends string = '0'> =
    { 1: PathFn<T[R[StringToNumber[I]]], R, Inc[I]>, 0: T }[TupleHasIndex<R, I>];
type PathTest = PathFn<{ a: { b: ['c', { d: 'e' }] } }, ['a', 'b', '1', 'd']>;
declare function path<T extends { [k: string]: any }, R extends Array<string>>(obj: T, path: R): PathFn<T, R>;
const obj = null! as { a: { b: ['c', { d: 'e' }] } };
const keys = null! as ['a', 'b', '1', 'd'];
const pathTest = path(obj, keys);
// "e"

// type Reduce<
//     Fn extends (previousValue: T, currentValue: R[number], currentIndex?: number, array?: R) => any,
//     T,
//     R extends any[],
//     I extends string = '0'
// > = { 1: Reduce<Fn(T, R[StringToNumber[I]], I, R), R, Inc[I]>, 0: T }[TupleHasIndex<R, I>];
// // fails with error: Cannot read property 'kind' of undefined at resolveCall
// declare function reduce<
//     Fn extends (previousValue: any, currentValue: R[number], currentIndex?: number, array?: R) => any,
//     R extends any[],
//     U,
//     I extends string = '0'
// >(callbackfn: Fn, initialValue: U, array: R): Reduce<Fn, U, R>;
// declare function path2<T extends { [k: string]: any }, R extends Array<string>>(obj: T, path: R):
//     Reduce<<Prev, Curr>(previousValue: Prev, currentValue: Curr, currentIndex?: number, array?: any[]) => Prev[Curr], T, R>;
// const pathTest2 = path2(obj, keys);
// // "e"

// binary function composition
type Fn1 = <T1 extends number>(v1: T1[]) => { [k: string]: T1 };
type Fn2 = <T2>(v2: { [k: string]: T2 }) => ReadonlyArray<T2>;
let fn1 = null! as Fn1;
let fn2 = null! as Fn2;
type Fn3 = <T3 extends number[]>(v3: T3) => Fn2(Fn1(T3));
let ones = null! as 1[];
type Fn4b = Fn3(typeof ones);
// FAILS, wanted `ReadonlyArray<1>`, got `ReadonlyArray<{}>`.
type Fn4c = Fn3(1[]);
// FAILS, wanted `ReadonlyArray<1>`, got `ReadonlyArray<{}>`.
let y = fn2(fn1(ones));
type Y = Fn2(Fn1(1[]));

interface isT<T> {
  (v: never): '0';
  (v: T): '1';
  (v: any): '0';
}
type Matches<V, T> = isT<T>(V);
type isBool = isT<boolean>;
let falseBool: isBool(false); // 1
let trueBool: isBool(true); // 1
let strBool: isBool(string); // 0
let anyBool: isBool(any); // 0
let neverBool: isBool(never); // 0

type Assert<T> = (<U>(v: U | null | undefined) => U)(T);
let assert: Assert<string | undefined>; // string

type Minus<A, B> = (<U>(v: U | B) => U)(A);
let noNumbers: Minus<string | number, number>; // string

interface UnwrapPromise {
  <U>(v: PromiseLike<U>): UnwrapPromise(U);
  <U>(v: U): U;
};
declare const testUnwrap1: UnwrapPromise(string);
declare const testUnwrap2: UnwrapPromise(Promise<string>);
declare const testUnwrap3: UnwrapPromise(boolean | Promise<string>);
declare function myThen<T, TResult1 = T, TResult2 = never>(
        prom: Promise<T>,
        onfulfilled?: ((value: T) => TResult1) | undefined | null, 
        onrejected?: ((reason: any) => TResult2) | undefined | null
    ): Promise<UnwrapPromise(TResult1) | UnwrapPromise(TResult2)>;
declare const pr: Promise<number>;
declare function f(x: number): Promise<string>;
declare function g(x: number): number | Promise<boolean>;
const testThen = myThen(pr, f, g);

interface Promise<T> {
    then<TResult1 = T, TResult2 = never>(
        onfulfilled?: ((value: T) => TResult1) | undefined | null, 
        onrejected?: ((reason: any) => TResult2) | undefined | null
    ): Promise<UnwrapPromise(TResult1) | UnwrapPromise(TResult2)>;
}
// prevents error: Argument of type '(x: number) => number | Promise<string>' is not assignable to parameter of type '(value: number) => string | PromiseLike<string>';
const tryProm = pr.then((x: number) => { 
    if (x < 0) return f(x);
    return x;
});

interface ObjectHasStringIndex {
  // <T extends { [k: string]: any }>(o: T): T[string];
  (o: { [k: string]: any }): '1';
  (o: {}): '0';
}
let ObjectHasStringIndexTestT: ObjectHasStringIndex({ [k: string]: 123 }); // '1'
let ObjectHasStringIndexTestF: ObjectHasStringIndex({ a: 123 }); // wanted '0', got '1'... so can't match for index, and erroring RHS yields `any`. ouch.

type IndexCall<T extends () => { [k: string]: any }, K extends keyof (T())> = T()[K];
type CallMember<T extends { [k: string]: () => any }, K extends keyof T> = T[K]();
type MappedMemberCall<T extends { [k: string]: () => any }> = { [K in keyof T]: T[K]() };

type HasKey<T, Key extends string> = (
  { [K in keyof T]: 'true' } &
  { [key: string]: 'false' }
)[Key];

type HasKindKey<T extends () => any> = HasKey<T(), 'kind'>;
type MapHasKey<T extends { [k: string]: () => any }, Key extends string> = {
    [K in keyof T]: HasKey<T[K](), Key>
};

type KeyOfCall<T extends () => any> = keyof (T());

type Strip1<T extends () => any> = { [K in keyof (T())]: T()[K] };
type Strip2<T extends () => { [k: string]: () => any }> = { [K in keyof (T())]: T()[K]() };

type Obj = {
    x: () => number,
    z: () => { kind: 'Just', value: string }
}

type T1 = (() => number)();
type T7 = CallMember<Obj, 'x'>;
type T8 = IndexCall<() => Obj, 'x'>;
type T9 = MappedMemberCall<Obj>; // fails, unresolved, want { x: number, z: { kind: 'Just', value: string } }
type T13 = keyof (() => Obj)();
type T14 = KeyOfCall<() => Obj>;
type T15 = Obj['z']()['kind'];
type T16 = MapHasKey<Obj, 'kind'>; // fails, unresolved, want { x: 'false', z: 'true' }
type T17 = Strip1<() => Obj>; // fails, unresolved, want { x: () => number, z: () => { kind: 'Just', value: string } }
type T19 = Strip2<() => Obj>; // fails, unresolved, want { x: number, z: { kind: 'Just', value: string } }

let a1: () => string;
let b1: typeof a1();
type Abc<T extends () => any> = T();
let c1: Abc<typeof a1>;

declare function infer1<T extends () => any>(x: T): T();
infer1(null! as () => number);

declare function infer2<T extends () => any>(x: { a: T }): T();
infer2(null! as { a: () => number });

declare function infer3<T>(x: { a: () => T }): T;
infer3(null! as { a: () => number });
const res3: number = infer3(null! as { a: () => number });

declare function infer4<T>(x: T, y: () => T): void;
infer4(5, () => 5);

function assignability<T>(x: T, y: () => T) {
    const a: T = x;
    const b: T = y();
}

// function mappedAssignability<T>(x: T, y: CallMember<T>) {
//     const d: T() = y;
// }

// function mappedComparability<T>(x: T, y: CallMember<T>) {
//     x === x;
//     y === y;
//     x === y;
// }

// type IdMapped<T> = { [K in keyof T]: T[K] }

// function mappedRelations<T>(x: IdMapped<T>, y: Partial<T>, z: CallMember<T>) {
//     x === z;
//     y === z;

//     const a: IdMapped<T> = z;
//     const b: Partial<T> = z;
// }

// mappedRelations(null! as Obj, null! as Partial<Obj>, null! as CallMember<Obj>);
// mappedRelations(null! as CallMember<Obj>, null! as CallMember<Obj>, null! as CallMember<Obj>);
