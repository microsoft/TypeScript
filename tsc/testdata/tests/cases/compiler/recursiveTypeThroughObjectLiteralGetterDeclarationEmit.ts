// @strict: true
// @declaration: true
// @emitDeclarationOnly: true

// What the recursive schema looks like coming out as a declaration. On main this is
// `export declare const node: any` plus two implicit-any errors, because the type never resolved.
// The recursion point itself still comes out as `/*elided*/ any` -- the node builder has no way to
// write a reference back into the type it is in the middle of writing, and main elides the same way
// on a type it can resolve. Everything around it is now the real shape.

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

export const node = object({
    name: text(),
    get children() {
        return array(node);
    },
});
