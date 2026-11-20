// @declaration: true
// @strict: true

// @filename: types.ts
export type Labeled<Label> = { id: number } & { name: string };
export type MaybeLabel<Label> = undefined | "x";
export type Branded<Label> = number & {};
export type UsesSecond<Label, Value> = { id: number } & { value: Value };

// @filename: main.ts
import type { Labeled, MaybeLabel, Branded, UsesSecond } from "./types";

declare function id<T>(value: T): T;
declare const item: Labeled<"user">;
declare const maybe: MaybeLabel<"user">;
declare const branded: Branded<"user">;
declare const partly: UsesSecond<"user", 1>;

export const copy = item;
export const inferred = id(item);
export const maybeCopy = maybe;
export const brandedCopy = branded;
export const partlyCopy = partly;
