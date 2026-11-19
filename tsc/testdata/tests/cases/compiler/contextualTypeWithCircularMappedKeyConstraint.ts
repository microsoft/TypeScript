// @strict: true
// @skipLibCheck: true
// @noEmit: true

// @filename: library.d.ts
type NoStrayRuleKeys<R> = { [K in keyof R]: unknown };
type StrictRules<R, T> = ([keyof R] extends [never] ? Required<T> : NoStrayRuleKeys<R>) & {
    [K in R extends unknown ? Exclude<keyof R, keyof T> : never]?: never;
};
export declare class Deriver<T> {
    derive<R extends T & StrictRules<R, T>>(build: () => R): void;
    plain<R extends T>(build: () => R): void;
}

export declare class RealIndex<T> {
    derive<R extends T & { [x: string]: undefined }>(build: () => R): void;
}
export declare class RealMappedIndex<T> {
    derive<R extends T & { [K in string]?: never }>(build: () => R): void;
}
export declare class AnyMappedIndex<T> {
    derive<R extends T & { [K in any]?: never }>(build: () => R): void;
}
export declare class UnresolvedMappedIndex<T> {
    derive<R extends T & { [K in MissingKeys]?: never }>(build: () => R): void;
}

// @filename: main.ts
import type { Deriver, RealIndex, RealMappedIndex, AnyMappedIndex, UnresolvedMappedIndex } from "./library.js";

declare const key: string;
type Rule = { [x: string]: (el: number) => unknown };
declare const indexed: Deriver<Rule>;
declare const literal: Deriver<{ rows?: (el: number) => unknown }>;

// Repro from #65530: a failed circular key constraint must not add an index signature.
indexed.derive(() => ({ [key]: (el) => el.toFixed() }));
literal.derive(() => ({ rows: (el) => el.toFixed() }));
indexed.plain(() => ({ [key]: (el) => el.toFixed() }));

// Genuine index signatures still contribute to the contextual type, including any keys.
declare const realIndex: RealIndex<Rule>;
declare const realMappedIndex: RealMappedIndex<Rule>;
declare const anyMappedIndex: AnyMappedIndex<Rule>;
realIndex.derive(() => ({ [key]: (el) => el }));
realMappedIndex.derive(() => ({ [key]: (el) => el }));
anyMappedIndex.derive(() => ({ [key]: (el) => el }));

// An unresolved name is an error key type, but its constraint is not circular.
declare const unresolvedMappedIndex: UnresolvedMappedIndex<Rule>;
unresolvedMappedIndex.derive(() => ({ [key]: (el) => el }));

const anyKeyedCallbacks: { [K in any]: (el: number) => unknown } = {
    [key]: (el) => el.toFixed(),
};