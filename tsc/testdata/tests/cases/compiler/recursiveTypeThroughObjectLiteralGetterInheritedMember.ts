// @strict: true
// @noEmit: true

// The shape from #62180. The recursive member is reached through a mapped type that remaps keys by
// reading each member's discriminant, so resolving the object schema instantiates its base with a type
// naming the schema back, and the table is read before its inherited `out` is added.
//
// A miss there resolves against the bases still to be inherited. Answering `any` instead would clear
// this error and break the self-referential interface case, where an unpatched compiler answers from the
// index signature and `any` would accept an indexed access every other compiler rejects.
//
// The `any` against `parent` in the .types baseline is printer elision, not an unresolved member; the
// assertions below tell those apart.

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
// The non-recursive key resolves fully, and the remapping put the recursive one in the optional bucket,
// so it is `parent?:`. Both are new; main gives the whole declaration an implicit `any`.
const topName: string = sample.name;
// The recursive one resolves too, at any depth walked.
const parentName: string = sample.parent!.name;
const deepName: string = sample.parent!.parent!.parent!.name;
// A collapse to `any` would accept both of these.
// @ts-expect-error
const wrongType: number = sample.parent!.parent!.name;
// @ts-expect-error
sample.parent!.parent!.missing;

// A genuinely absent property is still reported.
interface Base { readonly own: number; }
interface Derived extends Base { readonly extra: string; }
declare const derived: Derived;
// @ts-expect-error
derived.missing;
const ownValue: number = derived.own;
const extraValue: string = derived.extra;
