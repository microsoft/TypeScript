//// [tests/cases/compiler/declarationEmitUnusedAliasTypeParameter.ts] ////

//// [types.ts]
export type Labeled<Label> = { id: number } & { name: string };
export type MaybeLabel<Label> = undefined | "x";
export type Branded<Label> = number & {};
export type Loose<Label> = string & {};
export type Relabeled<Label> = Branded<Label>;
export type UsesSecond<Label, Value> = { id: number } & { value: Value };

//// [main.ts]
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

//// [local.ts]
type LocalLabeled<Label> = { id: number } & { name: string };
type LocalBranded<Label> = number & {};
type LocalLoose<Label> = string & {};

declare const localItem: LocalLabeled<"user">;
declare const localBranded: LocalBranded<"user">;
declare const localNames: "alice" | "bob" | LocalLoose<"user">;

export const localItemCopy = localItem;
export const localBrandedCopy = localBranded;
export const localNamesCopy = localNames;


//// [types.js]
export {};
//// [main.js]
export const copy = item;
export const inferred = id(item);
export const fromCall = label("admin");
export const maybeCopy = maybe;
export const brandedCopy = branded;
export const namesCopy = names;
export const relabeledCopy = relabeled;
export const partlyCopy = partly;
//// [local.js]
export const localItemCopy = localItem;
export const localBrandedCopy = localBranded;
export const localNamesCopy = localNames;


//// [types.d.ts]
export type Labeled<Label> = {
    id: number;
} & {
    name: string;
};
export type MaybeLabel<Label> = undefined | "x";
export type Branded<Label> = number & {};
export type Loose<Label> = string & {};
export type Relabeled<Label> = Branded<Label>;
export type UsesSecond<Label, Value> = {
    id: number;
} & {
    value: Value;
};
//// [main.d.ts]
import type { Labeled, MaybeLabel, Branded, Loose, UsesSecond } from "./types";
export declare const copy: Labeled<Label>;
export declare const inferred: Labeled<Label>;
export declare const fromCall: Labeled<Label>;
export declare const maybeCopy: MaybeLabel<Label>;
export declare const brandedCopy: Branded<Label>;
export declare const namesCopy: "alice" | "bob" | Loose<Label>;
export declare const relabeledCopy: number;
export declare const partlyCopy: UsesSecond<"user", 1>;
//// [local.d.ts]
type LocalLabeled<Label> = {
    id: number;
} & {
    name: string;
};
export declare const localItemCopy: LocalLabeled<"user">;
export declare const localBrandedCopy: number;
export declare const localNamesCopy: string;
export {};


//// [DtsFileErrors]


main.d.ts(2,36): error TS2552: Cannot find name 'Label'. Did you mean 'Labeled'?
main.d.ts(3,40): error TS2552: Cannot find name 'Label'. Did you mean 'Labeled'?
main.d.ts(4,40): error TS2552: Cannot find name 'Label'. Did you mean 'Labeled'?
main.d.ts(5,44): error TS2552: Cannot find name 'Label'. Did you mean 'Labeled'?
main.d.ts(6,43): error TS2552: Cannot find name 'Label'. Did you mean 'Labeled'?
main.d.ts(7,57): error TS2552: Cannot find name 'Label'. Did you mean 'Labeled'?


==== types.d.ts (0 errors) ====
    export type Labeled<Label> = {
        id: number;
    } & {
        name: string;
    };
    export type MaybeLabel<Label> = undefined | "x";
    export type Branded<Label> = number & {};
    export type Loose<Label> = string & {};
    export type Relabeled<Label> = Branded<Label>;
    export type UsesSecond<Label, Value> = {
        id: number;
    } & {
        value: Value;
    };
    
==== main.d.ts (6 errors) ====
    import type { Labeled, MaybeLabel, Branded, Loose, UsesSecond } from "./types";
    export declare const copy: Labeled<Label>;
                                       ~~~~~
!!! error TS2552: Cannot find name 'Label'. Did you mean 'Labeled'?
    export declare const inferred: Labeled<Label>;
                                           ~~~~~
!!! error TS2552: Cannot find name 'Label'. Did you mean 'Labeled'?
    export declare const fromCall: Labeled<Label>;
                                           ~~~~~
!!! error TS2552: Cannot find name 'Label'. Did you mean 'Labeled'?
    export declare const maybeCopy: MaybeLabel<Label>;
                                               ~~~~~
!!! error TS2552: Cannot find name 'Label'. Did you mean 'Labeled'?
    export declare const brandedCopy: Branded<Label>;
                                              ~~~~~
!!! error TS2552: Cannot find name 'Label'. Did you mean 'Labeled'?
    export declare const namesCopy: "alice" | "bob" | Loose<Label>;
                                                            ~~~~~
!!! error TS2552: Cannot find name 'Label'. Did you mean 'Labeled'?
    export declare const relabeledCopy: number;
    export declare const partlyCopy: UsesSecond<"user", 1>;
    
==== local.d.ts (0 errors) ====
    type LocalLabeled<Label> = {
        id: number;
    } & {
        name: string;
    };
    export declare const localItemCopy: LocalLabeled<"user">;
    export declare const localBrandedCopy: number;
    export declare const localNamesCopy: string;
    export {};
    