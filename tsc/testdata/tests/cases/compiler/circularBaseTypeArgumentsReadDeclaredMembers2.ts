// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/64605
// The shape of Zod's z.json() types: RecordInternals declares optin, and its base type arguments read it.

interface Internals<O = unknown, I = unknown> { output: O; input: I; optin?: "optional" | undefined }
interface Schema<Z extends Internals = Internals> { _zod: Z }
type OptionalIn = { _zod: { optin: "optional" } };
type RecordInput<V extends Schema> = [V] extends [OptionalIn] ? Partial<Record<string, V["_zod"]["input"]>> : Record<string, V["_zod"]["input"]>;
interface RecordInternals<V extends Schema> extends Internals<unknown, RecordInput<V>> { optin?: "optional" | undefined }
interface RecordSchema<V extends Schema> extends Schema<RecordInternals<V>> { _zod: RecordInternals<V> }
type IsOptionalIn<T extends Schema> = T extends OptionalIn ? true : false;
interface UnionInternals<T extends readonly Schema[]> extends Internals {
    optin: IsOptionalIn<T[number]> extends false ? "optional" | undefined : "optional";
}
interface UnionSchema<T extends readonly Schema[]> extends Schema<UnionInternals<T>> { _zod: UnionInternals<T> }
type _Json = UnionSchema<[RecordSchema<Json>]>;
interface JsonInternals extends UnionInternals<[RecordSchema<Json>]> { input: unknown }
interface Json extends _Json { _zod: JsonInternals }

export const r: RecordInput<Json> = { a: 1 };
export const o: Json["_zod"]["optin"] = undefined;
export const bad: Json["_zod"]["optin"] = "required"; // error
