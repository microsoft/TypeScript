// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/64415

type output<T> = T extends { _zod: { output: any } } ? T["_zod"]["output"] : unknown;
type input<T> = T extends { _zod: { input: any } } ? T["_zod"]["input"] : unknown;
type NoUndefined<T> = T extends undefined ? never : T;
type Writeable<T> = { -readonly [P in keyof T]: T[P] };
type Prettify<T> = { [K in keyof T]: T[K] } & {};
interface $ZodTypeInternals<out O = unknown, out I = unknown> { def: unknown; output: O; input: I; optin?: "optional" | undefined; optout?: "optional" | undefined }
interface StandardProps<I, O> { readonly types?: { readonly input: I; readonly output: O } | undefined }
interface $ZodType<O = unknown, I = unknown, Internals extends $ZodTypeInternals<O, I> = $ZodTypeInternals<O, I>> {
  _zod: Internals;
  "~standard": StandardProps<input<this>, output<this>>;
}
interface ZodType<out Internals extends $ZodTypeInternals = $ZodTypeInternals> extends $ZodType<any, any, Internals> {
  default(def: NoUndefined<output<this>>): ZodDefault<this>;
  default(def: () => NoUndefined<output<this>>): ZodDefault<this>;
}
type Shape = Readonly<{ [k: string]: $ZodType }>;
type OptionalOut = { _zod: { optout: "optional" } };
type OptionalIn = { _zod: { optin: "optional" } };
type $InferObjectOutput<T extends Shape> = Prettify<
  { -readonly [k in keyof T as T[k] extends OptionalOut ? never : k]: T[k]["_zod"]["output"] } &
  { -readonly [k in keyof T as T[k] extends OptionalOut ? k : never]?: T[k]["_zod"]["output"] }
>;
type $InferObjectInput<T extends Shape> = Prettify<
  { -readonly [k in keyof T as T[k] extends OptionalIn ? never : k]: T[k]["_zod"]["input"] } &
  { -readonly [k in keyof T as T[k] extends OptionalIn ? k : never]?: T[k]["_zod"]["input"] }
>;
interface $ZodStringInternals extends $ZodTypeInternals { def: { type: "string" }; output: string; input: string }
interface ZodString extends ZodType<$ZodStringInternals> {}
declare function string(): ZodString;
interface $ZodObjectInternals<S extends Shape> extends $ZodTypeInternals { def: { type: "object"; shape: S }; output: $InferObjectOutput<S>; input: $InferObjectInput<S> }
interface ZodObject<S extends Shape> extends ZodType<$ZodObjectInternals<S>> { shape: S }
declare function object<T extends Shape>(shape: T): ZodObject<Writeable<T>>;
interface $ZodArrayInternals<T extends $ZodType> extends $ZodTypeInternals { def: { type: "array"; element: T }; output: output<T>[]; input: input<T>[] }
interface ZodArray<T extends $ZodType> extends ZodType<$ZodArrayInternals<T>> { element: T }
declare function array<T extends $ZodType>(element: T): ZodArray<T>;
interface $ZodDefaultInternals<T extends $ZodType> extends $ZodTypeInternals { def: { type: "default"; inner: T }; output: NoUndefined<output<T>>; input: input<T> | undefined; optin: "optional" }
interface ZodDefault<T extends $ZodType> extends ZodType<$ZodDefaultInternals<T>> {}

const Tree = object({
  name: string(),
  get children() {
    return array(Tree).default([])
  },
});
