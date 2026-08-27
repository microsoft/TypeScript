// @strict: true
// @noEmit: true

// Recursion that routes through a union, with the recursive member left required. main fails outright
// here, with an implicit-any on every declaration involved. The companion file
// recursiveTypeThroughObjectLiteralGetterUnionOptional.ts is the same shape with the member optional.
//
// The .types baseline prints the recursive member as `any` once it is a few levels deep. That is the
// type printer truncating, not the type -- the member accesses at the bottom are what pin the real
// shape, and the @ts-expect-error is what would catch an `any` standing in for it.

interface Internals<out O = unknown> {
    readonly out: O;
}
interface Schema {
    readonly internals: Internals;
}
type Out<T extends Schema> = T["internals"]["out"];

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
declare function text(): StringSchema;

const variantA = object({
    name: text(),
    get child() {
        return tree;
    },
});
const tree = union([variantA]);

export type TreeOut = Out<typeof tree>;

declare const sample: TreeOut;
// The recursive member resolves: three levels in, `name` is still a string.
const topName: string = sample.name;
const nestedName: string = sample.child.name;
const deepName: string = sample.child.child.name;
// An `any` here would swallow this, so the expected error is what proves the member is a real object.
// @ts-expect-error
sample.child.missing;
