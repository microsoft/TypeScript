// @strict: true
// @noEmit: true

// A getter is how a self-referential object literal is written, and its type is worked out lazily.
// Inferring the type argument for `object` must not force that getter, which reports a circularity
// and fixes the member at `any`. Reduced from #62180 and #62181.

interface Internals<out O = unknown> {
    readonly out: O;
}
interface Schema {
    readonly internals: Internals;
}
type Out<T extends Schema> = T["internals"]["out"];

interface ArrayInternals<T extends Schema> extends Internals<Out<T>[]> {}
interface ArraySchema<T extends Schema = Schema> extends Schema {
    readonly internals: ArrayInternals<T>;
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

declare function object<S extends Shape>(shape: S): ObjectSchema<S>;
declare function array<T extends Schema>(element: T): ArraySchema<T>;
declare function text(): StringSchema;

const node = object({
    name: text(),
    get children() {
        return array(node);
    },
});

type TreeNode = Out<typeof node>;
declare const sample: TreeNode;

// The recursive member is an array of the same node type, not `any` and not `unknown`.
const leafName: string = sample.name;
const nestedName: string = sample.children[0].children[0].name;

// Those two pass on their own if the whole thing collapsed to `any`, which is exactly the failure
// this test exists to catch, so the recursion point is also probed where `any` cannot hide: an
// unknown key has to be an error, and a known one has to have the type it is declared with.
// @ts-expect-error
sample.children[0].missing;
// @ts-expect-error
const wrongLeafType: number = sample.children[0].name;
