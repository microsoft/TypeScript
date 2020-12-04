// @declaration: true

// Recursive mapped types simply appear empty

type Recurse = {
    [K in keyof Recurse]: Recurse[K]
}

type Recurse1 = {
    [K in keyof Recurse2]: Recurse2[K]
}

type Recurse2 = {
    [K in keyof Recurse1]: Recurse1[K]
}

// Repro from #27881

export type Circular<T> = {[P in keyof T]: Circular<T>};
type tup = [number, number, number, number];

function foo(arg: Circular<tup>): tup {
  return arg;
}

// Repro from #29442

type DeepMap<T extends unknown[], R> = {
  [K in keyof T]: T[K] extends unknown[] ? DeepMap<T[K], R> : R;
};

type tpl = [string, [string, [string]]];
type arr = string[][];

type t1 = DeepMap<tpl, number>;  // [number, [number, [number]]]
type t2 = DeepMap<arr, number>;  // number[][]

// Repro from #29577

type Transform<T> = { [K in keyof T]: Transform<T[K]> };

interface User {
    avatar: string;
}

interface Guest {
    displayName: string;
}

interface Product {
    users: (User | Guest)[];
}

declare var product: Transform<Product>;
product.users;  // (Transform<User> | Transform<Guest>)[]

// Repro from #29702

type Remap1<T> = { [P in keyof T]: Remap1<T[P]>; };
type Remap2<T> = T extends object ? { [P in keyof T]: Remap2<T[P]>; } : T;
  
type a = Remap1<string[]>;  // string[]
type b = Remap2<string[]>;  // string[]

// Repro from #29992

type NonOptionalKeys<T> = { [P in keyof T]: undefined extends T[P] ? never : P }[keyof T];
type Child<T> = { [P in NonOptionalKeys<T>]: T[P] }

export interface ListWidget {
    "type": "list",
    "minimum_count": number,
    "maximum_count": number,
    "collapsable"?: boolean, //default to false, means all expanded
    "each": Child<ListWidget>;
}

type ListChild = Child<ListWidget>

declare let x: ListChild;
x.type;

// Repros from #41790

export type TV<T, K extends keyof T> = T[K] extends Record<infer E, any> ? E : never;

export type ObjectOrArray<T, K extends keyof any = keyof any> = T[] | Record<K, T | Record<K, T> | T[]>;
export type ThemeValue<K extends keyof ThemeType, ThemeType, TVal = any> =
    ThemeType[K] extends TVal[] ? number :
    ThemeType[K] extends Record<infer E, TVal> ? E :
    ThemeType[K] extends ObjectOrArray<infer F> ? F : never;

export type Foo<T> = T extends { [P in infer E]: any } ? E : never;
