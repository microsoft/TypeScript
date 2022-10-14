// @strict: true
// @noEmit: true

// repro #51161

export type AnyOneof = { oneofKind: string; [k: string]: unknown } | { oneofKind: undefined };
export type AnyOneofKind<T extends AnyOneof> = T extends { oneofKind: keyof T }
    ? T['oneofKind']
    : never;
