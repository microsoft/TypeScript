// @strict: true
// @noEmit: true

// The shape from #62180, where the recursive member is reached through a mapped type that remaps its
// keys by reading each member's own discriminant. Resolving the object schema's members instantiates
// its base with a type that names the schema back, so the schema's table is read while it is still
// being assembled and its inherited `out` is not in it yet.
//
// A lookup that misses in that window finishes itself against the base types still to be inherited,
// so it returns the member the table is about to hold. An earlier draft instead answered such a miss
// with `any`, which cleared the error here and was wrong everywhere else: a self-referential
// interface reaches the same window with no getter and no inference anywhere in the program, and an
// unpatched compiler answers it from the index signature, so `any` silently accepted an indexed
// access that every other compiler rejects. Completing the lookup is what separates the two -- a name
// no base carries is still absent.
//
// The `any` that appears against `parent` in the .types baseline is the printer eliding a recursive
// reference, not an unresolved member. The assertions below are what distinguish those two.

interface Internals<O> {
    optional: "true" | "false";
    out: O;
}

interface StringSchema extends Internals<string> {
    optional: "false";
}

type Shape = Record<string, any>;
type Prettify<T> = { [K in keyof T]: T[K] } & {};
type ObjectOut<S extends Shape> = Prettify<
    {
        [K in keyof S as S[K] extends { optional: "true" } ? K : never]?: S[K]["out"];
    } & {
        [K in keyof S as S[K] extends { optional: "true" } ? never : K]: S[K]["out"];
    }
>;

interface ObjectSchema<S extends Shape> extends Internals<ObjectOut<S>> {
    optional: "false";
}

interface OptionalSchema<T extends Internals<any>> extends Internals<T["out"] | undefined> {
    optional: "true";
}

declare function object<S extends Shape>(shape: S): ObjectSchema<S>;
declare function text(): StringSchema;
declare function optional<T extends Internals<any>>(schema: T): OptionalSchema<T>;

const category = object({
    name: text(),
    get parent() {
        return optional(category);
    },
});

declare const sample: (typeof category)["out"];
// The key that does not recurse resolves fully, and the remapping put the recursive one in the
// optional bucket, so it is `parent?:` rather than `parent:`. Both of those are new: main gives the
// whole declaration an implicit `any` and reports it.
const topName: string = sample.name;
// The recursive one resolves too, and keeps resolving as far down as it is walked.
const parentName: string = sample.parent!.name;
const deepName: string = sample.parent!.parent!.parent!.name;
// Depth is where a collapse would hide: `any` would accept both of these, so they are what keeps the
// comment above honest.
// @ts-expect-error
const wrongType: number = sample.parent!.parent!.name;
// @ts-expect-error
sample.parent!.parent!.missing;

// A property that is genuinely absent must still be reported, whoever is asking.
interface Base { readonly own: number; }
interface Derived extends Base { readonly extra: string; }
declare const derived: Derived;
// @ts-expect-error
derived.missing;
const ownValue: number = derived.own;
const extraValue: string = derived.extra;
