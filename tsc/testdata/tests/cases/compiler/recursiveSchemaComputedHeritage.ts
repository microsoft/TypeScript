// @strict: true
// @noEmit: true

interface Internals<O> { output: O; }
interface Base<O = unknown, I extends Internals<O> = Internals<O>> { _zod: I; }
interface Derived<T extends Internals<unknown>> extends Base<T["output"], T> {}

interface StringInternals extends Internals<string> {}
interface StringSchema extends Derived<StringInternals> {}
interface ArrayInternals<T extends Base> extends Internals<T["_zod"]["output"][]> {}
interface UnionInternals<T extends readonly Base[]> extends Internals<T[number]["_zod"]["output"]> {}

interface LazyArray<T extends Base> extends Base<any, ArrayInternals<T>> {}
interface LazyUnion<T extends readonly Base[]> extends Base<any, UnionInternals<T>> {}
interface LazyJSON extends LazyUnion<[StringSchema, LazyArray<LazyJSON>]> {}
declare const a: LazyJSON["_zod"]["output"];

interface DerivedArray<T extends Base> extends Derived<ArrayInternals<T>> {}
interface DerivedUnion<T extends readonly Base[]> extends Derived<UnionInternals<T>> {}
interface DerivedJSON extends DerivedUnion<[StringSchema, DerivedArray<DerivedJSON>]> {}
declare const b: DerivedJSON["_zod"]["output"];

const lazy: typeof a = ["", [""]];
const derived: typeof b = ["", [""]];
const invalidLazy: typeof a = 42;
const invalidDerived: typeof b = 42;
const invalidNestedLazy: typeof a = [42];
const invalidNestedDerived: typeof b = [42];

declare const lazyElement: Extract<typeof a, unknown[]>[number];
declare const derivedElement: Extract<typeof b, unknown[]>[number];
const lazyElementToValue: typeof a = lazyElement;
const lazyValueToElement: typeof lazyElement = a;
const derivedElementToValue: typeof b = derivedElement;
const derivedValueToElement: typeof derivedElement = b;

interface NamedArrayInternals<T extends Base> extends Internals<Array<T["_zod"]["output"]>> {}
interface NamedArray<T extends Base> extends Derived<NamedArrayInternals<T>> {}
interface NamedJSON extends LazyUnion<[StringSchema, NamedArray<NamedJSON>]> {}
declare const named: NamedJSON["_zod"]["output"];
const validNamed: typeof named = ["", [""]];
const invalidNamed: typeof named = [42];

interface ReadonlyArrayInternals<T extends Base> extends Internals<ReadonlyArray<T["_zod"]["output"]>> {}
interface ReadonlySchemaArray<T extends Base> extends Derived<ReadonlyArrayInternals<T>> {}
interface ReadonlyJSON extends LazyUnion<[StringSchema, ReadonlySchemaArray<ReadonlyJSON>]> {}
declare const readonlyJSON: ReadonlyJSON["_zod"]["output"];
const validReadonly: typeof readonlyJSON = ["", [""]];
const invalidReadonly: typeof readonlyJSON = [42];

interface NullableArrayInternals<T extends Base> extends Internals<(T["_zod"]["output"] | null)[]> {}
interface NullableArray<T extends Base> extends Derived<NullableArrayInternals<T>> {}
interface NullableJSON extends LazyUnion<[StringSchema, NullableArray<NullableJSON>]> {}
declare const nullable: NullableJSON["_zod"]["output"];
const validNullable: typeof nullable = [null, [""]];
const invalidNullable: typeof nullable = [42];

type Output<T extends Base> = T["_zod"]["output"];
interface AliasedArrayInternals<T extends Base> extends Internals<Output<T>[]> {}
interface AliasedArray<T extends Base> extends Derived<AliasedArrayInternals<T>> {}
interface AliasedJSON extends LazyUnion<[StringSchema, AliasedArray<AliasedJSON>]> {}
declare const aliased: AliasedJSON["_zod"]["output"];
const validAliased: typeof aliased = ["", [""]];
const invalidAliased: typeof aliased = [42];

interface TupleInternals<T extends Base> extends Internals<[value: T["_zod"]["output"]]> {}
interface SchemaTuple<T extends Base> extends Derived<TupleInternals<T>> {}
interface TupleJSON extends LazyUnion<[StringSchema, SchemaTuple<TupleJSON>]> {}
declare const tuple: TupleJSON["_zod"]["output"];
const validTuple: typeof tuple = [[[""]]];
const invalidTuple: typeof tuple = [42];
