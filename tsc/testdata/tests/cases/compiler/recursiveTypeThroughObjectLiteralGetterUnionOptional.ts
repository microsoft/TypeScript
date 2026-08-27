// @strict: true
// @noEmit: true

// Recursion through a union, with the recursive member optional. This is the companion to
// recursiveTypeThroughObjectLiteralGetterUnion.ts, which is the same shape with the member left
// required. main fails on both, with an implicit-any on every declaration involved.

interface Internals<out O = unknown> {
    readonly out: O;
}
interface Schema {
    readonly internals: Internals;
}
type Out<T extends Schema> = T["internals"]["out"];

interface OptionalInternals<T extends Schema> extends Internals<Out<T> | undefined> {}
interface OptionalSchema<T extends Schema = Schema> extends Schema {
    readonly internals: OptionalInternals<T>;
}
interface StringInternals extends Internals<string> {}
interface StringSchema extends Schema {
    readonly internals: StringInternals;
}

type Shape = Readonly<{ [k: string]: Schema }>;
interface ObjectInternals<S extends Shape> extends Internals<{ [K in keyof S]: Out<S[K]> }> {}
interface ObjectSchema<S extends Shape = Shape> extends Schema {
    readonly internals: ObjectInternals<S>;
}
interface UnionInternals<T extends readonly Schema[]> extends Internals<Out<T[number]>> {}
interface UnionSchema<T extends readonly Schema[] = Schema[]> extends Schema {
    readonly internals: UnionInternals<T>;
}

declare function object<S extends Shape>(shape: S): ObjectSchema<S>;
declare function union<T extends readonly Schema[]>(options: T): UnionSchema<T>;
declare function optional<T extends Schema>(t: T): OptionalSchema<T>;
declare function text(): StringSchema;

const variantA = object({
    name: text(),
    get child() {
        return optional(tree);
    },
});
const tree = union([variantA]);

declare const sample: Out<typeof tree>;
// The recursive member resolves: two levels in, `name` is still a string.
const topName: string = sample.name;
const nestedName: string | undefined = sample.child?.name;
// An `any` here would swallow this, so the expected error is what proves the member is a real object.
// @ts-expect-error
sample.child?.missing;
