//// [tests/cases/compiler/declarationEmitUnusedAliasTypeParameter.ts] ////

//// [types.ts]
export type Labeled<Label> = { id: number } & { name: string };
export type MaybeLabel<Label> = undefined | "x";
export type Branded<Label> = number & {};
export type UsesSecond<Label, Value> = { id: number } & { value: Value };

//// [main.ts]
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


//// [types.js]
export {};
//// [main.js]
export const copy = item;
export const inferred = id(item);
export const maybeCopy = maybe;
export const brandedCopy = branded;
export const partlyCopy = partly;


//// [types.d.ts]
export type Labeled<Label> = {
    id: number;
} & {
    name: string;
};
export type MaybeLabel<Label> = undefined | "x";
export type Branded<Label> = number & {};
export type UsesSecond<Label, Value> = {
    id: number;
} & {
    value: Value;
};
//// [main.d.ts]
import type { Labeled, MaybeLabel, Branded, UsesSecond } from "./types";
export declare const copy: Labeled<Label>;
export declare const inferred: Labeled<Label>;
export declare const maybeCopy: MaybeLabel<Label>;
export declare const brandedCopy: Branded<Label>;
export declare const partlyCopy: UsesSecond<"user", 1>;


//// [DtsFileErrors]


main.d.ts(2,36): error TS2552: Cannot find name 'Label'. Did you mean 'Labeled'?
main.d.ts(3,40): error TS2552: Cannot find name 'Label'. Did you mean 'Labeled'?
main.d.ts(4,44): error TS2552: Cannot find name 'Label'. Did you mean 'Labeled'?
main.d.ts(5,43): error TS2552: Cannot find name 'Label'. Did you mean 'Labeled'?


==== types.d.ts (0 errors) ====
    export type Labeled<Label> = {
        id: number;
    } & {
        name: string;
    };
    export type MaybeLabel<Label> = undefined | "x";
    export type Branded<Label> = number & {};
    export type UsesSecond<Label, Value> = {
        id: number;
    } & {
        value: Value;
    };
    
==== main.d.ts (4 errors) ====
    import type { Labeled, MaybeLabel, Branded, UsesSecond } from "./types";
    export declare const copy: Labeled<Label>;
                                       ~~~~~
!!! error TS2552: Cannot find name 'Label'. Did you mean 'Labeled'?
    export declare const inferred: Labeled<Label>;
                                           ~~~~~
!!! error TS2552: Cannot find name 'Label'. Did you mean 'Labeled'?
    export declare const maybeCopy: MaybeLabel<Label>;
                                               ~~~~~
!!! error TS2552: Cannot find name 'Label'. Did you mean 'Labeled'?
    export declare const brandedCopy: Branded<Label>;
                                              ~~~~~
!!! error TS2552: Cannot find name 'Label'. Did you mean 'Labeled'?
    export declare const partlyCopy: UsesSecond<"user", 1>;
    