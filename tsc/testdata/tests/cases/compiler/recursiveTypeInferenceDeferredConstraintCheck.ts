// @strict: true
// @noEmit: true

// When an inferred type argument is an object literal with un-annotated accessors, its constraint check is deferred
// until the accessors have been checked. The accessor bodies are therefore never resolved while the enclosing
// declaration is unresolved, so no re-entrant call resolution takes place for this pattern.

interface Schema<O> { readonly out: O }
type Shape = Record<string, Schema<any>>;
type Infer<S extends Shape> = { [K in keyof S]: S[K]["out"] };
declare const str: Schema<string>;
declare function array<T extends Schema<any>>(element: T): Schema<T["out"][]>;

// (1) An overloaded builder: previously only a single-candidate re-entered call could skip its constraint check.
declare function object<S extends Shape>(shape: S): Schema<Infer<S>>;
declare function object<S extends Shape>(name: string, shape: S): Schema<Infer<S>>;
const Category = object({
  name: str,
  get subcategories() { return array(Category); },
});
const c: Category["out"]["subcategories"][0]["subcategories"][0]["name"] = "x";
type Category = typeof Category;

// (2) A constraint violation inside the literal is still reported.
const Bad = object({
  name: 42,
  get subcategories() { return array(Bad); },
});

// (3) A pure return type inference stays filtered by its constraint: with no re-entrant resolution, the leaked
// unfiltered inference reported in the review of #64311 no longer occurs.
type Lookup = { x: 1; dflt: 2 };
declare function make<S extends Shape, P extends keyof Lookup>(shape: S): Schema<Infer<S>> & { p: P; f: (x: P) => void };
const u = make({ name: str }) satisfies { p: number | "x" };
u.f(42); // error
const t = make({ name: str, get rec() { return make({ inner: t }); } }) satisfies { p: number | "x" };
t.f(42); // error

// (4) An annotated accessor takes the ordinary path.
interface AnnotatedOut { name: string; subcategories: AnnotatedOut[] }
const Annotated = object({
  name: str,
  get subcategories(): Schema<AnnotatedOut[]> { return array(Annotated); },
});
const a: AnnotatedOut = Annotated.out;

// (5) A call inside the accessor body whose inferred type argument mentions the literal: its constraint check would
// instantiate the literal's mapped output type while the accessor is unresolved, so it is deferred as well.
type Output<S extends Shape> = { [K in keyof S as S[K] extends { opt: true } ? never : K]: S[K]["out"] } & { [K in keyof S as S[K] extends { opt: true } ? K : never]?: S[K]["out"] };
interface Obj<S extends Shape> extends Schema<{ [K in keyof Output<S>]: Output<S>[K] }> { shape: S }
declare function obj<S extends Shape>(shape: S): Obj<S>;
declare function withDefault<T extends Schema<any>>(schema: T, value: T["out"]): T;
export const Tree = obj({
  name: str,
  get children() { return withDefault(array(Tree), []); },
});
