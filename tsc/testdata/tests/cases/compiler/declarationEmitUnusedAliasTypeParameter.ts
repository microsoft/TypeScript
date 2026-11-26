// @declaration: true
// @strict: true

// @filename: types.ts
export type Labeled<Label> = { id: number } & { name: string };
export type MaybeLabel<Label> = undefined | "x";
export type Branded<Label> = number & {};
export type Loose<Label> = string & {};
export type Relabeled<Label> = Branded<Label>;
export type UsesSecond<Label, Value> = { id: number } & { value: Value };

// @filename: main.ts
import type { Labeled, MaybeLabel, Branded, Loose, Relabeled, UsesSecond } from "./types";

declare function id<T>(value: T): T;
declare function label<L>(value: L): Labeled<L>;

declare const item: Labeled<"user">;
declare const maybe: MaybeLabel<"user">;
declare const branded: Branded<"user">;
declare const names: "alice" | "bob" | Loose<"user">;
declare const relabeled: Relabeled<"user">;
declare const partly: UsesSecond<"user", 1>;

export const copy = item;
export const inferred = id(item);
export const fromCall = label<"admin">("admin");
export const maybeCopy = maybe;
export const brandedCopy = branded;
export const namesCopy = names;
export const relabeledCopy = relabeled;
export const partlyCopy = partly;

// @filename: local.ts
type LocalLabeled<Label> = { id: number } & { name: string };
type LocalBranded<Label> = number & {};
type LocalLoose<Label> = string & {};

declare const localItem: LocalLabeled<"user">;
declare const localBranded: LocalBranded<"user">;
declare const localNames: "alice" | "bob" | LocalLoose<"user">;

export const localItemCopy = localItem;
export const localBrandedCopy = localBranded;
export const localNamesCopy = localNames;
