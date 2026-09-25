// @strict: true
// @noEmit: true

// When the inferred type argument of a single-candidate call is an object literal with un-annotated accessors, its
// constraint check is deferred until the accessors have been checked. The accessor bodies are therefore never
// resolved while the enclosing declaration is unresolved, so no re-entrant call resolution takes place.

interface Schema<O> { readonly out: O }
type Shape = Record<string, Schema<any>>;
type Infer<S extends Shape> = { [K in keyof S]: S[K]["out"] };
declare const str: Schema<string>;
declare function array<T extends Schema<any>>(element: T): Schema<T["out"][]>;
declare function object<S extends Shape>(shape: S): Schema<Infer<S>>;

// (1) The outer call's constraint check is deferred.
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

// (3) A pure return type inference stays filtered by its constraint, since no re-entrant resolution takes place.
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

// (5) Overload resolution still depends on the constraint check, so an overloaded call does not defer.
declare function pick<T extends { kind: "a" }>(x: T): "generic";
declare function pick(x: object): "fallback";
const picked: "fallback" = pick({ kind: "b", get self() { return 1; } });
declare function object2<S extends Shape>(shape: S): Schema<Infer<S>>;
declare function object2<S extends Shape>(name: string, shape: S): Schema<Infer<S>>;
const Overloaded = object2({
  name: str,
  get subcategories() { return array(Overloaded); }, // error
});

// (6) A pure return type inference inside an accessor body is not deferred, so it stays filtered by its constraint.
declare function make2<S extends Shape, P extends Schema<any>>(shape: S): Schema<{ p: P }> & { p: P };
const Other = object({ name: str, get g() { return str; } });
const Holder = object({
  name: str,
  get rec() { return make2({ inner: str }) satisfies { p: typeof Other | number }; },
});
const h: typeof Other = Holder.out.rec.p;

// (7) A violated deferred constraint is reported on the argument.
const lit = { get y() { return 1; } };
declare function wrap<T extends { y: string }>(t: T): { w: T };
const w = wrap(lit); // error
declare function id<T>(t: T): T;
const w2 = wrap(id(lit)); // error

// (8) A candidate that is not applicable with the deferred inference is inferred again with the check in place.
declare function ni<T extends { y: string }>(t: T, u: NoInfer<T>): T;
ni({ get y() { return 1; } }, { y: "s" }); // error on the accessor

// (9) The arity of a candidate with a generic rest parameter is checked again after the re-inference.
declare function fixedRest<T extends [{ y: string }]>(n: number, ...ts: T): T;
const F = { get f() { return fixedRest("oops", { get y() { return 1; } }, "extra"); } }; // error

// (10) A call inside a class accessor body defers the same way.
class K { get a() { return wrap(lit); } } // error
const ka = new K().a;

// (11) The walk covers union constituents.
declare function wrapSchema<T extends Schema<any>>(t: T): Schema<T["out"]>;
declare const flag: boolean;
const Alt = object({
  name: str,
  get alt() { return wrapSchema(flag ? Alt : str); },
});
const alt: Alt["out"]["alt"] = "x";
type Alt = typeof Alt;

// (12) A call resolved first from inside another accessor's body gets the same result as one resolved from the top level, since only an accessor that is being resolved defers.
interface Box<T> { v: T }
declare function box<T>(t: T): Box<T>;
declare function wrapBox<T extends Box<{ y: string }>>(t: T): { w: T };
const boxed = box(lit);
const g = { get z() { return w3; } };
g.z;
const w3 = wrapBox(boxed); // error
