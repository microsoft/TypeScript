// @noEmit: true
// @checkOrder: default, typesfirst, editorfirst, reverse, isolated
// @strict: true
// @target: esnext

// Instantiating derive's R in main.ts finds a circular constraint, which
// would be reported at the declaration in lib.d.ts. Whether that is seen
// depends on whether lib.d.ts's diagnostics were collected before main.ts was
// checked, so it is not reported (65530).

// @filename: lib.d.ts
type NoStrayRuleKeys<R> = { [K in keyof R]: unknown };
type StrictRules<R, T> = ([keyof R] extends [never] ? Required<T> : NoStrayRuleKeys<R>) & {
  [K in R extends unknown ? Exclude<keyof R, keyof T> : never]?: never;
};
export declare class Deriver<T> {
  derive<R extends T & StrictRules<R, T>>(build: () => R): void;
  plain<R extends T>(build: () => R): void;
}
// @filename: main.ts
import type { Deriver } from "./lib.js";
declare const key: string;
declare const indexed: Deriver<{ [x: string]: (el: number) => unknown }>;
declare const literal: Deriver<{ rows?: (el: number) => unknown }>;
indexed.derive(() => ({ [key]: (el) => el }));
literal.derive(() => ({ rows: (el) => el }));
indexed.plain(() => ({ [key]: (el) => el }));
