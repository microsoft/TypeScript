// @strict: true
// @noEmit: true

// Simplified repro from #55535

type Id<T> = { [K in keyof T]: Id<T[K]> };

type Foo1 = Id<{ x: { y: { z: { a: { b: { c: number } } } } } }>;
type Foo2 = Id<{ x: { y: { z: { a: { b: { c: string } } } } } }>;

declare const foo1: Foo1;
const foo2: Foo2 = foo1;  // Error expected

type Id2<T> = { [K in keyof T]: Id2<Id2<T[K]>> };

type Foo3 = Id2<{ x: { y: { z: { a: { b: { c: number } } } } } }>;
type Foo4 = Id2<{ x: { y: { z: { a: { b: { c: string } } } } } }>;

declare const foo3: Foo3;
const foo4: Foo4 = foo3;  // Error expected

// Repro from issue linked in #55535

type RequiredDeep<T> = { [K in keyof T]-?: RequiredDeep<T[K]> };

type A = { a?: { b: { c: 1 | { d: 2000 } }}}
type B = { a?: { b: { c: { d: { e: { f: { g: 2 }}}}, x: 1000 }}}

type C = RequiredDeep<A>;
type D = RequiredDeep<B>;

type Test1 = [C, D] extends [D, C] ? true : false;  // false
type Test2 = C extends D ? true : false;  // false
type Test3 = D extends C ? true : false;  // false

// Simplified repro from #54246

// Except for the final non-recursive Record<K, V>, object types produced by NestedRecord all have the same symbol
// and thus are considered deeply nested after three levels of nesting. Ideally we'd detect that recursion in this
// type always terminates, but we're unaware of a general algorithm that accomplishes this.

type NestedRecord<K extends string, V> = K extends `${infer K0}.${infer KR}` ? { [P in K0]: NestedRecord<KR, V> } : Record<K, V>;

type Bar1 = NestedRecord<"x.y.z.a.b.c", number>;
type Bar2 = NestedRecord<"x.y.z.a.b.c", string>;

declare const bar1: Bar1;
const bar2: Bar2 = bar1;  // Error expected

// Repro from #56138

export type Input = Static<typeof Input>
export const Input = Type.Object({
    level1: Type.Object({
        level2: Type.Object({
            foo: Type.String(),
        })
    })
})

export type Output = Static<typeof Output>
export const Output = Type.Object({
    level1: Type.Object({
        level2: Type.Object({
            foo: Type.String(),
            bar: Type.String(),
        })
    })
})

function problematicFunction1(ors: Input[]): Output[] {
    return ors;  // Error
}

function problematicFunction2<T extends Output[]>(ors: Input[]): T {
    return ors;  // Error
}

function problematicFunction3(ors: (typeof Input.static)[]): Output[] {
    return ors;  // Error
}

export type Evaluate<T> = T extends infer O ? { [K in keyof O]: O[K] } : never

export declare const Readonly: unique symbol;
export declare const Optional: unique symbol;
export declare const Hint: unique symbol;
export declare const Kind: unique symbol;

export interface TKind {
    [Kind]: string
}
export interface TSchema extends TKind {
    [Readonly]?: string
    [Optional]?: string
    [Hint]?: string
    params: unknown[]
    static: unknown
}

export type TReadonlyOptional<T extends TSchema> = TOptional<T> & TReadonly<T>
export type TReadonly<T extends TSchema> = T & { [Readonly]: 'Readonly' }
export type TOptional<T extends TSchema> = T & { [Optional]: 'Optional' }

export interface TString extends TSchema {
    [Kind]: 'String';
    static: string;
    type: 'string';
}

export type ReadonlyOptionalPropertyKeys<T extends TProperties> = { [K in keyof T]: T[K] extends TReadonly<TSchema> ? (T[K] extends TOptional<T[K]> ? K : never) : never }[keyof T]
export type ReadonlyPropertyKeys<T extends TProperties> = { [K in keyof T]: T[K] extends TReadonly<TSchema> ? (T[K] extends TOptional<T[K]> ? never : K) : never }[keyof T]
export type OptionalPropertyKeys<T extends TProperties> = { [K in keyof T]: T[K] extends TOptional<TSchema> ? (T[K] extends TReadonly<T[K]> ? never : K) : never }[keyof T]
export type RequiredPropertyKeys<T extends TProperties> = keyof Omit<T, ReadonlyOptionalPropertyKeys<T> | ReadonlyPropertyKeys<T> | OptionalPropertyKeys<T>>
export type PropertiesReducer<T extends TProperties, R extends Record<keyof any, unknown>> = Evaluate<(
    Readonly<Partial<Pick<R, ReadonlyOptionalPropertyKeys<T>>>> &
    Readonly<Pick<R, ReadonlyPropertyKeys<T>>> &
    Partial<Pick<R, OptionalPropertyKeys<T>>> &
    Required<Pick<R, RequiredPropertyKeys<T>>>
)>
export type PropertiesReduce<T extends TProperties, P extends unknown[]> = PropertiesReducer<T, {
    [K in keyof T]: Static<T[K], P>
}>
export type TPropertyKey = string | number
export type TProperties = Record<TPropertyKey, TSchema>
export interface TObject<T extends TProperties = TProperties> extends TSchema {
    [Kind]: 'Object'
    static: PropertiesReduce<T, this['params']>
    type: 'object'
    properties: T
}

export type Static<T extends TSchema, P extends unknown[] = []> = (T & { params: P; })['static']

declare namespace Type {
    function Object<T extends TProperties>(object: T): TObject<T>
    function String(): TString
}
