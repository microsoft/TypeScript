// @strict: true
// @noEmit: true

interface Holder<T extends { value: unknown }> {
    leading: [...[T["value"], T["value"]], boolean];
    trailing: [boolean, ...[T["value"], T["value"]]];
    singleton: [...[T["value"]]];
    empty: [...[], T["value"]];
    rest: [...T["value"][]];
    readonly: readonly [...[T["value"], T["value"]]];
    optional: [value?: T["value"]];
    union: [...([T["value"]] | [T["value"], boolean])];
}

declare const holder: Holder<{ value: string }>;
const leading: [string, string, boolean] = holder.leading;
const trailing: [boolean, string, string] = holder.trailing;
const singleton: [string] = holder.singleton;
const empty: [string] = holder.empty;
const rest: string[] = holder.rest;
const readonly: readonly [string, string] = holder.readonly;
const optional: [value?: string] = holder.optional;
const union: [string] | [string, boolean] = holder.union;

// @ts-expect-error
const wrongLeading: number = holder.leading[0];
// @ts-expect-error
const wrongTrailing: number = holder.trailing[2];
// @ts-expect-error
holder.singleton[1];
// @ts-expect-error
holder.empty[1];
// @ts-expect-error
const wrongRest: number = holder.rest[0];
// @ts-expect-error
holder.readonly[0] = "changed";
// @ts-expect-error
const wrongOptional: string = holder.optional[0];
// @ts-expect-error
const wrongUnion: number = holder.union[0];
