
# Mapped Object Types { #mapped-object-types }

&emsp;&emsp;&emsp;`{` `readonly`<sub>opt</sub> `[`*Identifier* `in` *Type*`]` `?`<sub>opt</sub> `:` *Type* `}`

A ***mapped object type*** is a type operator that operates on types assignable to the string type, but primarily on unions of string literal types.

In the above syntax,

* The first *Type* (immediately following the `in` keyword) is the operand *K* of a mapped type.
* The second *Type* forms the *property type template* of a mapped type, *T*.
* The *Identifier* forms a type variable *P* that is scoped only in *T*, and is bound and constrained to *K*.

Mapped object types are primarily meant to iterate over a union of string literal types, and to generate a new object type containing properties whose names are based on each string literal within that union.
For example, in the below example, the type aliases `Foo` and `Bar` are equivalent even though `Foo` aliases an object type literal, and `Bar` aliases a mapped object type.

```ts
type Foo = { hello: string, beautiful: string, world: string; };

type Bar = { [P in "hello" | "beautiful" | "world"]: string };
```

The operand is not required to be a union of string literal types, but is only required to be a assignable to string.

```ts
type A1 = { [P in "hello"]: string };
type A2 = { hello: string };

type B1 = { [P in string]: number };
type B2 = { [P in any]: number };
type B3 = { [propName: string]: number };
```

In the above, `A1` is equivalent to `A2`, and both types contain only a single property named `hello` of type `string.
`B1`, `B2`, and `B3` are also equivalent, and introduce object types with only a string index signature.

Like with property names, mapped object type allow the `readonly` and the `?` optionality modifiers to be specified as well.
Specifying a `readonly` modifier on a mapped type results in each property or index signature of the mapped object type becoming read-only.
Similarly, specifying a `?` results in each property becoming optional, or in the case where an index signature is generated, an index signature whose type forms a union with the Undefined type.
In the below example, `A1` is equivalent to `A2`, `B1` is equivalent to `B2`, and `C1` is equivalent to `C2`.

```ts
type A1 = { readonly [P in "hello" | "world" ]: string };
type A2 = {
    readonly hello: string,
    readonly world: string,
}

type B1 = { [P in "foo" | "bar"]?: number };
type B2 = {
    foo?: number,
    bar?: number,
};

type C1 = { readonly [P in string]?: boolean };
type C2 = {
    readonly [propName: string]: boolean | undefined;
};
```

As mentioned, mapped object types introduce a type variable *P*.
When *K* is not a generic type, as seen thus far, then when generating each property of a mapped object type, the type of that property is *T* with instances of *P* substituted with a string literal type whose contents are equivalent to the property name itself.
Similarly, when generating an index signature, the type of that index signature prior to accounting for optionality is *T* with instances of *P* substituted with *K*.
In the following example, each pair `A1` and `A2`, `B1` and `B2`, `C1` and `C2`, `D1` and `D2`, are respectively equivalent.

```ts
type A1 = { [P in "hello" | "world"]: P };
type A2 = {
    hello: "hello",
    world: "world",
};

type B1 = { [P in "hello" | "world"]: P | boolean };
type B2 = {
    hello: "hello" | boolean,
    world: "world" | boolean,
};

type C1 = { [P in string]: P };
type C2 = {
    [propName: string]: string,
};

type D1 = { [P in any]: P };
type D2 = {
    [propName: string]: any,
};
```

This can be powerfully combined with key query types, and indexed access types:

```ts
interface TypeMap {
    "str": string,
    "num": number,
    "bool": boolean,
}

interface SchemaType {
    foo: "str",
    bar: "num",
    baz: "bool",
}

type TypeScriptType = {
    [P in keyof SchemaType]: TypeMap[P]
};

// Equivalent to...
interface TypeScriptType {
    foo: string,
    bar: number,
    baz: boolean,
}
```

## Homomorphic Mapped Object Types { #homomorphic-mapped-object types }

A ***homomorphic mapped object type*** is a mapped type of a particular form, where the operand *K* is a type query `keyof` *O*.

In such instances, TypeScript will consult the type `O` when generating each property and index signature for respective modifiers.
If a modifier is not specified in the mapped type itself, but is specified for a given property in *O*, then the resulting property inherits that same modifier.
For example, in the following, `A` and `B` are equivalent types, but `C` is not because it does not represent a homomorphic mapped type.
As a result, the `baz` property is `readonly` in `A` and `B`, but not in `C`.

```ts
interface T {
    foo?: number
    bar: number;
    readonly baz?: string;
}

type A = {
    foo?: number;
    bar: number;
    readonly baz?: string;
}

type B = {
    [P in keyof T]?: T[P];
}

type C = {
    [P in "foo" | "bar" | "baz"]?: T[P];
}
```

## Generic mapped types

A ***generic mapped type** is one whose constraint is a type parameter, a generic indexed access type, or a generic key query type, or a union containing any of the aforementiond types.

Mapped object type syntax results in an object type with a series of different members depending on the operand type.

* If *K* is the String type, then an object type is produced where *T* will be instantiated as *T'* in which instances of *P* in *T* have been substituted with *string*, and the produced object type contains a string index signature of type *T'* with the specified `readonly` and optionality modifiers.
* If *K* is declared as a key query operator `keyof` *O*, or as a type parameter whose constraint is a key query operator `keyof` *O*, then where the apparent type *O'* of *O*,
    * if *O'* is the Any type, then an object type is produced where *T* will be instantiated as *T'* in which instances of *P* in *T* have been substituted with *string*, and the produced object type contains a string index signature of type *T'* with the specified `readonly` modifier.
    * otherwise, an object type is produced with each property *P'* declared in *O'* with the type of *T'* in which instances of *P* in *T'* have been substituted with the string  where *P* has *O'*`[`*P'*`]` with the same modifiers of *P'* in *O'*, as well as the specified `readonly` and optionality modifiers.
* If *K* is a string literal type, or a union of strictly string literal types, then an object type is produced where for each string literal constituent *S* of *K*, *T* will be instantiated as *T'* in which instances of *P* have been substituted with *S*, and the produced object type contains a property whose name is identical to the contents of *S*, and whose respective type is *T'*.
*TODO "named types" is the only place that talks about instantiation*