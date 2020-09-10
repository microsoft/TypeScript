//// [mappedTypeAsClauses.ts]
// Mapped type 'as N' clauses

type Getters<T> = { [P in keyof T & string as `get${capitalize P}`]: () => T[P] };
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


//// [mappedTypeAsClauses.js]
"use strict";
// Mapped type 'as N' clauses


//// [mappedTypeAsClauses.d.ts]
declare type Getters<T> = {
    [P in keyof T & string as `get${capitalize P}`]: () => T[P];
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
