// @strict: true
// @declaration: true

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
