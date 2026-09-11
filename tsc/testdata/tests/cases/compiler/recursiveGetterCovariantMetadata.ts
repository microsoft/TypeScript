// @strict: true
// @target: es2020
// @exactOptionalPropertyTypes: false, true
// @noEmit: true

type input<T> = T extends { _zod: { input: any } } ? T["_zod"]["input"] : unknown;
type output<T> = T extends { _zod: { output: any } } ? T["_zod"]["output"] : unknown;
type Writeable<T> = { -readonly [P in keyof T]: T[P] } & {};
type Prettify<T> = { [K in keyof T]: T[K] } & {};
type IsAny<T> = 0 extends 1 & T ? true : false;

interface StandardTypes<Input, Output> {
    readonly input: Input;
    readonly output: Output;
}
interface StandardTypedProps<Input, Output> {
    readonly version: 1;
    readonly vendor: string;
    readonly types?: StandardTypes<Input, Output> | undefined;
}
interface StandardSchemaProps<Input, Output> extends StandardTypedProps<Input, Output> {
    readonly validate: (value: unknown) => { readonly value: Output } | Promise<{ readonly value: Output }>;
}
type $ZodStandardSchema<T> = StandardSchemaProps<input<T>, output<T>>;
interface $ZodTypeInternals<out O = unknown, out I = unknown> {
    def: { type: string };
    optin?: "optional" | "defaulted" | undefined;
    optout?: "optional" | undefined;
    output: O;
    input: I;
}
interface $ZodType<O = unknown, I = unknown, Internals extends $ZodTypeInternals<O, I> = $ZodTypeInternals<O, I>> {
    _zod: Internals;
    "~standard": $ZodStandardSchema<this>;
}
interface ZodMiniType<out Output = unknown, out Input = unknown,
    out Internals extends $ZodTypeInternals<Output, Input> = $ZodTypeInternals<Output, Input>>
    extends $ZodType<Output, Input, Internals> {
    type: Internals["def"]["type"];
    def: Internals["def"];
    parse(data: unknown): output<this>;
}
type $ZodShape = Readonly<{ [k: string]: $ZodType }>;
type $ZodObjectConfig = { out: Record<string, unknown>; in: Record<string, unknown> };
type $strip = { out: {}; in: {} };
type OptionalOutSchema = { _zod: { optout: "optional" } };
type OptionalInSchema = { _zod: { optin: "optional" | "defaulted" } };
type $InferObjectOutput<T extends $ZodShape, Extra extends Record<string, unknown>> = string extends keyof T
    ? IsAny<T[keyof T]> extends true ? Record<string, unknown> : Record<string, output<T[keyof T]>>
    : keyof (T & Extra) extends never ? Record<string, never> : Prettify<
        { -readonly [k in keyof T as T[k] extends OptionalOutSchema ? never : k]: T[k]["_zod"]["output"] } &
        { -readonly [k in keyof T as T[k] extends OptionalOutSchema ? k : never]?: T[k]["_zod"]["output"] } & Extra>;
type $InferObjectInput<T extends $ZodShape, Extra extends Record<string, unknown>> = string extends keyof T
    ? IsAny<T[keyof T]> extends true ? Record<string, unknown> : Record<string, input<T[keyof T]>>
    : keyof (T & Extra) extends never ? Record<string, never> : Prettify<
        { -readonly [k in keyof T as T[k] extends OptionalInSchema ? never : k]: T[k]["_zod"]["input"] } &
        { -readonly [k in keyof T as T[k] extends OptionalInSchema ? k : never]?: T[k]["_zod"]["input"] } & Extra>;
interface $ZodObjectInternals<Shape extends $ZodShape = $ZodShape,
    out Config extends $ZodObjectConfig = $ZodObjectConfig> extends $ZodTypeInternals {
    def: { type: "object"; shape: Shape; catchall?: $ZodType | undefined };
    config: Config;
    output: $InferObjectOutput<Shape, Config["out"]>;
    input: $InferObjectInput<Shape, Config["in"]>;
    optin?: "optional" | undefined;
    optout?: "optional" | undefined;
}
interface $ZodObject<Shape extends Readonly<$ZodShape> = Readonly<$ZodShape>,
    out Params extends $ZodObjectConfig = $ZodObjectConfig>
    extends $ZodType<any, any, $ZodObjectInternals<Shape, Params>> {}
interface ZodMiniObject<Shape extends $ZodShape = $ZodShape, out Config extends $ZodObjectConfig = $strip>
    extends ZodMiniType<any, any, $ZodObjectInternals<Shape, Config>>, $ZodObject<Shape, Config> {
    shape: Shape;
}
declare function object<T extends $ZodShape = Record<never, $ZodType>>(shape?: T): ZodMiniObject<Writeable<T>, $strip>;

export const nested = object({
    get children() { return object({ children: nested }); },
});

// Inspecting output first would mask the mapped getter's resolution cycle.
nested.shape.children;

type Assert<T extends true> = T;
export function checkOutput() {
    type NestedOutput = output<typeof nested>;
    const value = null! as NestedOutput;
    const deep: NestedOutput = value.children.children.children.children;
    type Deep = typeof value.children.children.children.children;
    const recursive: Deep = value;
    type DeepIsNotAny = Assert<IsAny<Deep> extends false ? true : false>;
    type DeepKeys = Assert<keyof Deep extends "children" ? "children" extends keyof Deep ? true : false : false>;
    // @ts-expect-error Recursive output objects have no "missing" property.
    value.children.children.children.children.missing;
    // @ts-expect-error Every children property must contain another recursive object.
    const invalid: NestedOutput = { children: { children: { children: 123 } } };
}

interface ExtendedStandardSchemaProps<Input, Output> extends StandardSchemaProps<Input, Output> {
    readonly jsonSchema: { input(): object; output(): object };
}
type ExtendedStandardSchema<T> = ExtendedStandardSchemaProps<input<T>, output<T>>;
interface ExtendedObject<Shape extends $ZodShape> extends ZodMiniObject<Shape> {
    "~standard": ExtendedStandardSchema<this>;
}
declare function extendedObject<T extends $ZodShape>(shape: T): ExtendedObject<Writeable<T>>;

export const extended = extendedObject({
    get children() { return extendedObject({ children: extended }); },
});
extended.shape.children;

export function checkExtendedOutput() {
    type ExtendedOutput = output<typeof extended>;
    const value = null! as ExtendedOutput;
    const deep: ExtendedOutput = value.children.children.children.children;
    type Deep = typeof value.children.children.children.children;
    type DeepIsNotAny = Assert<IsAny<Deep> extends false ? true : false>;
    // @ts-expect-error Recursive output objects have no "missing" property.
    value.children.children.children.children.missing;
}
