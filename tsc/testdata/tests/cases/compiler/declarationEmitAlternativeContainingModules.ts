// @declaration: true
// @emitDeclarationOnly: true
// @strict: true
// @module: commonjs
// @target: esnext

// @filename: internal/deep/model.ts
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

// @filename: internal/deep/starred.ts
export interface Starred { value: string; }
export function makeStarred(): Starred { return { value: "" }; }

// @filename: factory.ts
export { makeNamed, makeAliased, makeAssigned, makeOrdered, makeUnlisted } from "./internal/deep/model";
export { makeStarred } from "./internal/deep/starred";

// @filename: named.ts
export { Named } from "./internal/deep/model";

// @filename: aliased.ts
export { Aliased as Alias } from "./internal/deep/model";

// @filename: star.ts
export * from "./internal/deep/starred";

// @filename: assigned.ts
import { Assigned } from "./internal/deep/model";
export = Assigned;

// @filename: orderedFirst.ts
export { Ordered } from "./internal/deep/model";

// @filename: orderedSecond.ts
export { Ordered } from "./internal/deep/model";

// @filename: index.ts
import { makeNamed, makeAliased, makeStarred, makeAssigned, makeOrdered, makeUnlisted } from "./factory";
export const named = makeNamed();
export const repeated = makeNamed();
export const aliased = makeAliased();
export const starred = makeStarred();
export const assigned = makeAssigned();
export const ordered = makeOrdered();
export const unlisted = makeUnlisted();
