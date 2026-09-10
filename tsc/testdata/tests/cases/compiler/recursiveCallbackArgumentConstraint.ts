// @strict: true
// @noEmit: true

interface Schema<O> { readonly out: O; optional(): Schema<O | undefined> }
type Shape = Record<string, Schema<any> | (() => Schema<any>)>;
type Resolve<T> = T extends () => infer R ? R : T;
type Infer<S extends Shape> = { [K in keyof S]: Resolve<S[K]> extends Schema<infer O> ? O : never };

declare function object<S extends Shape>(shape: S): Schema<Infer<S>>;
declare function array<T extends Schema<any>>(el: T): Schema<T["out"][]>;
declare function string(): Schema<string>;
declare function lazy<T extends Schema<any>>(fn: () => T): T;
declare function map<T>(cb: (v: number) => T): T;

// A callback passed as the whole argument of a call that initializes a property.
const Category = object({
    name: string(),
    subcategories: lazy(() => array(Category)),
});
const ok: (typeof Category)["out"] = { name: "x", subcategories: [{ name: "y", subcategories: [] }] };
const bad: (typeof Category)["out"] = { name: "x", subcategories: [{ name: 1, subcategories: [] }] };

// Nested call and a chained call.
const Tree = object({
    id: string(),
    children: array(lazy(() => Tree)),
    parent: lazy(() => Tree).optional(),
});
const tree: (typeof Tree)["out"] = { id: "a", children: [], parent: { id: "b", children: [], parent: undefined } };
const wrongTree: (typeof Tree)["out"] = { id: "a", children: [{ id: 1, children: [], parent: undefined }], parent: undefined };

// Mutual recursion.
const User = object({ name: string(), posts: lazy(() => array(Post)) });
const Post = object({ title: string(), author: lazy(() => User) });
const user: (typeof User)["out"] = { name: "u", posts: [{ title: "t", author: { name: 1, posts: [] } }] };

// A context-sensitive callback inside the call keeps its parameter type.
const Self = object({
    name: string(),
    child: map((v) => (v.toFixed(), array(Self))),
});

// Errors inside a lazily typed property are still reported.
const Errors = object({
    name: string(),
    a: lazy(() => { const n: number = "x"; return array(Errors); }),
    b: lazy(() => array(Errors), 42),
    c: lazy((v) => array(Errors)),
});

// The outer constraint is still enforced.
type Infer2<S> = { [K in keyof S]: S[K] extends Schema<infer O> ? O : never };
declare function strictObject<S extends Record<string, Schema<any>>>(shape: S): Schema<Infer2<S>>;
declare function identity<T>(x: T): T;
const Failing = strictObject({
    name: string(),
    subcategories: identity(() => array(Failing)),
});

// A reference outside any callback is still a use before declaration.
declare function first<T>(x: T, fn: () => T): T;
const Eager = object({
    name: string(),
    self: first(Eager, () => Eager),
});
