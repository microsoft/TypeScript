// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/64605

interface Internals<I = unknown> { input: I }
interface Schema { _zod: Internals }
type RecordInput<V extends Schema> = V extends unknown ? Record<string, V["_zod"]["input"]> : never;
interface RecordSchema<V extends Schema> extends Schema { _zod: Internals<RecordInput<V>> }
interface UnionInternals<T extends readonly Schema[]> extends Internals<T[number]["_zod"]["input"]> {}
interface UnionSchema<T extends readonly Schema[]> extends Schema { _zod: UnionInternals<T> }
type JsonValue = { [k: string]: JsonValue };
type _Json = UnionSchema<[RecordSchema<Json>]>;
type _JsonInternals = _Json["_zod"];
interface JsonInternals extends _JsonInternals { input: JsonValue }
interface Json extends _Json { _zod: JsonInternals }
