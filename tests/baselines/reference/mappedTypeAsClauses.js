//// [mappedTypeAsClauses.ts]
// Mapped type 'as N' clauses

type Getters<T> = { [P in keyof T & string as `get${Capitalize<P>}`]: () => T[P] };
type TG1 = Getters<{ foo: string, bar: number, baz: { z: boolean } }>;

// Mapped type with 'as N' clause has no constraint on 'in T' clause

type PropDef<K extends keyof any, T> = { name: K, type: T };

type TypeFromDefs<T extends PropDef<keyof any, any>> = { [P in T as P['name']]: P['type'] };

type TP1 = TypeFromDefs<{ name: 'a', type: string } | { name: 'b', type: number } | { name: 'a', type: boolean }>;

// No array or tuple type mapping when 'as N' clause present

type TA1 = Getters<string[]>;
type TA2 = Getters<[number, boolean]>;

// Filtering using 'as N' clause

type Methods<T> = { [P in keyof T as T[P] extends Function ? P : never]: T[P] };
type TM1 = Methods<{ foo(): number, bar(x: string): boolean, baz: string | number }>;

// Mapping to multiple names using 'as N' clause

type DoubleProp<T> = { [P in keyof T & string as `${P}1` | `${P}2`]: T[P] }
type TD1 = DoubleProp<{ a: string, b: number }>;  // { a1: string, a2: string, b1: number, b2: number }
type TD2 = keyof TD1;  // 'a1' | 'a2' | 'b1' | 'b2'
type TD3<U> = keyof DoubleProp<U>;  // `${keyof U & string}1` | `${keyof U & string}2`

// Repro from #40619

type Lazyify<T> = {
    [K in keyof T as `get${Capitalize<K & string>}`]: () => T[K]
};

interface Person {
    readonly name: string;
    age: number;
    location?: string;
}

type LazyPerson = Lazyify<Person>;

// Repro from #40833

type Example = {foo: string, bar: number};

type PickByValueType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K]
};

type T1 = PickByValueType<Example, string>;
const e1: T1 = {
    foo: "hello"
};
type T2 = keyof T1;
const e2: T2 = "foo";

// Repro from #41133

interface Car {
    name: string;
    seats: number;
    engine: Engine;
    wheels: Wheel[];
}

interface Engine {
    manufacturer: string;
    horsepower: number;
}

interface Wheel {
    type: "summer" | "winter";
    radius: number;
}

type Primitive = string | number | boolean;
type OnlyPrimitives<T> = { [K in keyof T as T[K] extends Primitive ? K : never]: T[K] };

let primitiveCar: OnlyPrimitives<Car>;  // { name: string; seats: number; }
let keys: keyof OnlyPrimitives<Car>;  //  "name" | "seats"

type KeysOfPrimitives<T> = keyof OnlyPrimitives<T>;

let carKeys: KeysOfPrimitives<Car>;  // "name" | "seats"

// Repro from #41453

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;

type If<Cond extends boolean, Then, Else> = Cond extends true ? Then : Else;

type GetKey<S, V> = keyof { [TP in keyof S as Equal<S[TP], V> extends true ? TP : never]: any };

type GetKeyWithIf<S, V> = keyof { [TP in keyof S as If<Equal<S[TP], V>, TP, never>]: any };

type GetObjWithIf<S, V> = { [TP in keyof S as If<Equal<S[TP], V>, TP, never>]: any };

type Task = {
  isDone: boolean;
};

type Schema = {
  root: {
    title: string;
    task: Task;
  }
  Task: Task;
};

type Res1 = GetKey<Schema, Schema['root']['task']>;  // "Task"
type Res2 = GetKeyWithIf<Schema, Schema['root']['task']>;  // "Task"
type Res3 = keyof GetObjWithIf<Schema, Schema['root']['task']>;  // "Task"


//// [mappedTypeAsClauses.js]
"use strict";
// Mapped type 'as N' clauses
var e1 = {
    foo: "hello"
};
var e2 = "foo";
var primitiveCar; // { name: string; seats: number; }
var keys; //  "name" | "seats"
var carKeys; // "name" | "seats"


//// [mappedTypeAsClauses.d.ts]
declare type Getters<T> = {
    [P in keyof T & string as `get${Capitalize<P>}`]: () => T[P];
};
declare type TG1 = Getters<{
    foo: string;
    bar: number;
    baz: {
        z: boolean;
    };
}>;
declare type PropDef<K extends keyof any, T> = {
    name: K;
    type: T;
};
declare type TypeFromDefs<T extends PropDef<keyof any, any>> = {
    [P in T as P['name']]: P['type'];
};
declare type TP1 = TypeFromDefs<{
    name: 'a';
    type: string;
} | {
    name: 'b';
    type: number;
} | {
    name: 'a';
    type: boolean;
}>;
declare type TA1 = Getters<string[]>;
declare type TA2 = Getters<[number, boolean]>;
declare type Methods<T> = {
    [P in keyof T as T[P] extends Function ? P : never]: T[P];
};
declare type TM1 = Methods<{
    foo(): number;
    bar(x: string): boolean;
    baz: string | number;
}>;
declare type DoubleProp<T> = {
    [P in keyof T & string as `${P}1` | `${P}2`]: T[P];
};
declare type TD1 = DoubleProp<{
    a: string;
    b: number;
}>;
declare type TD2 = keyof TD1;
declare type TD3<U> = keyof DoubleProp<U>;
declare type Lazyify<T> = {
    [K in keyof T as `get${Capitalize<K & string>}`]: () => T[K];
};
interface Person {
    readonly name: string;
    age: number;
    location?: string;
}
declare type LazyPerson = Lazyify<Person>;
declare type Example = {
    foo: string;
    bar: number;
};
declare type PickByValueType<T, U> = {
    [K in keyof T as T[K] extends U ? K : never]: T[K];
};
declare type T1 = PickByValueType<Example, string>;
declare const e1: T1;
declare type T2 = keyof T1;
declare const e2: T2;
interface Car {
    name: string;
    seats: number;
    engine: Engine;
    wheels: Wheel[];
}
interface Engine {
    manufacturer: string;
    horsepower: number;
}
interface Wheel {
    type: "summer" | "winter";
    radius: number;
}
declare type Primitive = string | number | boolean;
declare type OnlyPrimitives<T> = {
    [K in keyof T as T[K] extends Primitive ? K : never]: T[K];
};
declare let primitiveCar: OnlyPrimitives<Car>;
declare let keys: keyof OnlyPrimitives<Car>;
declare type KeysOfPrimitives<T> = keyof OnlyPrimitives<T>;
declare let carKeys: KeysOfPrimitives<Car>;
declare type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
declare type If<Cond extends boolean, Then, Else> = Cond extends true ? Then : Else;
declare type GetKey<S, V> = keyof {
    [TP in keyof S as Equal<S[TP], V> extends true ? TP : never]: any;
};
declare type GetKeyWithIf<S, V> = keyof {
    [TP in keyof S as If<Equal<S[TP], V>, TP, never>]: any;
};
declare type GetObjWithIf<S, V> = {
    [TP in keyof S as If<Equal<S[TP], V>, TP, never>]: any;
};
declare type Task = {
    isDone: boolean;
};
declare type Schema = {
    root: {
        title: string;
        task: Task;
    };
    Task: Task;
};
declare type Res1 = GetKey<Schema, Schema['root']['task']>;
declare type Res2 = GetKeyWithIf<Schema, Schema['root']['task']>;
declare type Res3 = keyof GetObjWithIf<Schema, Schema['root']['task']>;
