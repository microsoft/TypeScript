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

// type k1 = Id<string>('foo');
// ^ errors, `<string>` is part of the type reference, not the function call
type k2 = Id<><string>('foo'); // ok, `string`

declare function id<T>(v: T): T;
let l = id<string>('foo');

interface IsPrimitive {
  (o: object): '0';
  (o: any): '1';
}
type stringIsPrimitive = IsPrimitive(string); // '1', ok
type regexpIsPrimitive = IsPrimitive(RegExp); // '0', ok

// explicit type arguments need to go after the type arguments of the type reference, empty `<>` if n/a
type genericIsPrimitive = <T>() => IsPrimitive(T);
type stringIsPrimitive2 = genericIsPrimitive<><string>(); // '1', ok
type regexpIsPrimitive2 = genericIsPrimitive<><RegExp>();
// fails, see #17471, '1' instead of '0', should delay overload selection until type argument is known

// alternative, pass as parameters
type genericIsPrimitive3 = <T>(v: T) => IsPrimitive(T);
type stringIsPrimitive3 = genericIsPrimitive3(string); // '1', ok
type regexpIsPrimitive3 = genericIsPrimitive3(RegExp)
// fails, see #17471, '1' instead of '0', should delay overload selection until type argument is known

type map = <Fn extends (v: T) => any, O extends { [k: string]: T }, T>(fn: Fn, obj: O) => { [P in keyof O]: Fn(O[P]) };
type z = map(<T>(v: T) => [T], { a: 1, b: 2, c: 3 });
// FAILS!, wanted `{ a: [1], b: [2], c: [3] }`, got `{ a: any; b: any; c: any; }`.

// binary function composition
type Fn1 = <T1 extends number>(v1: T1[]) => { [k: string]: T1 };
type Fn2 = <T2>(v2: { [k: string]: T2 }) => ReadonlyArray<T2>;
let fn1 = null! as Fn1;
let fn2 = null! as Fn2;
type Fn3 = <T3 extends number[]>(v3: T3) => Fn2(Fn1(T3));
// type Fn4 = Fn3(1); // errors, ok
let ones = null! as 1[];
type Fn4b = Fn3(typeof ones);
// FAILS, wanted `ReadonlyArray<1>`, got `ReadonlyArray<number>`.
type Fn4c = Fn3(1[]);
// FAILS, wanted `ReadonlyArray<1>`, got `ReadonlyArray<number>`.
// let x = fn2(fn1(1)); // errors with not assignable, ok
// type X = Fn2(Fn1(1)); // errors with not assignable, ok
let y = fn2(fn1(ones));
type Y = Fn2(Fn1(1[]));

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
type T7 = CallMember<Obj, 'x'>; // fails, got any, want number
type T8 = IndexCall<() => Obj, 'x'>; // fails, got any, want () => number
type T9 = MappedMemberCall<Obj>; // fails, unresolved, want { x: number, z: { kind: 'Just', value: string } }
type T13 = keyof (() => Obj)();
type T14 = KeyOfCall<() => Obj>; // fails, got string, want 'x' | 'y'
type T15 = Obj['z']()['kind'];
type T16 = MapHasKey<Obj, 'kind'>; // fails, unresolved, want { x: 'false', z: 'true' }
type T17 = Strip1<() => Obj>; // fails, unresolved, want { x: () => number, z: () => { kind: 'Just', value: string } }
type T19 = Strip2<() => Obj>; // fails, unresolved, want { x: number, z: { kind: 'Just', value: string } }

let a1: () => string;
let b1: typeof a1();
type Assert<T extends () => any> = T(); // fails, eagerly resolved to any
let c1: Assert<typeof a1>; // fails, got any, want string

declare function infer1<T extends () => any>(x: T): T(); // fails, eagerly resolved to any
infer1(null! as () => number); // fails, got any, want number

declare function infer2<T extends () => any>(x: { a: T }): T(); // fails, eagerly resolved to any
infer2(null! as { a: () => number }); // fails, got any, want number

declare function infer3<T>(x: { a: () => T }): T;
infer3(null! as { a: () => number });
const res3: number = infer3(null! as { a: () => number });

declare function infer4<T>(x: T, y: () => T): void;
infer4(5, () => 5);

function assignability<T>(x: T, y: () => T) {
    const a: T = x;
    const b: T = y();
}

function comparability<T>(x: T, y: () => T) {
    x === x;
    y === y;
    // x === y; // rightfully errors
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
