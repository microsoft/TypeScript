// @strict: true
// @noEmit: true

// A recursive getter whose body runs a loop, assigning to a union-typed variable.
//
// The loop puts entries on the flow-loop stack, and the assignment's declared type being a union is
// what makes control flow analysis evaluate the assigned expression rather than take the declared
// type. So the inner getter is forced from inside a loop back-edge, while a provisional comparison is
// open.
//
// This is the case that separates saving a stack's length from saving the stack itself.
// `checkExpressionCachedEx` swaps in a nil flow-loop stack and puts the original back only when it
// returns normally, so an unwind that crosses it leaves the nil in place. Restoring by length then
// re-slices the replacement instead of the saved stack, which is a runtime panic rather than a
// diagnostic. The three stacks some caller replaces wholesale are therefore held as slice headers.

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
        let holder: Schema | null = null;
        for (let i = 0; i < 2; i++) {
            holder = object({
                get inner() {
                    return array(node);
                },
            });
        }
        return holder;
    },
});

declare const sample: Out<typeof node>;
const topName: string = sample.name;

// A key the shape does not declare is still absent, which is what tells a resolved type apart from
// one that collapsed to `any`.
// @ts-expect-error
sample.missing;
