//// [tests/cases/compiler/declarationEmitAlternativeContainingModules.ts] ////

//// [model.ts]
export interface Named { value: string; }
export interface Aliased { value: string; }
export interface Assigned { value: string; }
export interface Ordered { value: string; }
export interface Unlisted { value: string; }
export function makeNamed(): Named { return { value: "" }; }
export function makeAliased(): Aliased { return { value: "" }; }
export function makeAssigned(): Assigned { return { value: "" }; }
export function makeOrdered(): Ordered { return { value: "" }; }
export function makeUnlisted(): Unlisted { return { value: "" }; }

//// [starred.ts]
export interface Starred { value: string; }
export function makeStarred(): Starred { return { value: "" }; }

//// [factory.ts]
export { makeNamed, makeAliased, makeAssigned, makeOrdered, makeUnlisted } from "./internal/deep/model";
export { makeStarred } from "./internal/deep/starred";

//// [named.ts]
export { Named } from "./internal/deep/model";

//// [aliased.ts]
export { Aliased as Alias } from "./internal/deep/model";

//// [star.ts]
export * from "./internal/deep/starred";

//// [assigned.ts]
import { Assigned } from "./internal/deep/model";
export = Assigned;

//// [orderedFirst.ts]
export { Ordered } from "./internal/deep/model";

//// [orderedSecond.ts]
export { Ordered } from "./internal/deep/model";

//// [index.ts]
import { makeNamed, makeAliased, makeStarred, makeAssigned, makeOrdered, makeUnlisted } from "./factory";
export const named = makeNamed();
export const repeated = makeNamed();
export const aliased = makeAliased();
export const starred = makeStarred();
export const assigned = makeAssigned();
export const ordered = makeOrdered();
export const unlisted = makeUnlisted();




//// [model.d.ts]
export interface Named {
    value: string;
}
export interface Aliased {
    value: string;
}
export interface Assigned {
    value: string;
}
export interface Ordered {
    value: string;
}
export interface Unlisted {
    value: string;
}
export declare function makeNamed(): Named;
export declare function makeAliased(): Aliased;
export declare function makeAssigned(): Assigned;
export declare function makeOrdered(): Ordered;
export declare function makeUnlisted(): Unlisted;
//// [starred.d.ts]
export interface Starred {
    value: string;
}
export declare function makeStarred(): Starred;
//// [factory.d.ts]
export { makeNamed, makeAliased, makeAssigned, makeOrdered, makeUnlisted } from "./internal/deep/model";
export { makeStarred } from "./internal/deep/starred";
//// [named.d.ts]
export { Named } from "./internal/deep/model";
//// [aliased.d.ts]
export { Aliased as Alias } from "./internal/deep/model";
//// [star.d.ts]
export * from "./internal/deep/starred";
//// [assigned.d.ts]
import { Assigned } from "./internal/deep/model";
export = Assigned;
//// [orderedFirst.d.ts]
export { Ordered } from "./internal/deep/model";
//// [orderedSecond.d.ts]
export { Ordered } from "./internal/deep/model";
//// [index.d.ts]
export declare const named: import("./named").Named;
export declare const repeated: import("./named").Named;
export declare const aliased: import("./aliased").Alias;
export declare const starred: import("./star").Starred;
export declare const assigned: import("./assigned");
export declare const ordered: import("./orderedFirst").Ordered;
export declare const unlisted: import("./internal/deep/model").Unlisted;
