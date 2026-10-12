// @target: esnext
// @module: esnext
// @strict: true
// @noEmit: true

// @filename: first.ts
export default interface First { first: number; }
export interface Shared { first: number; }

// @filename: second.ts
export default interface Second { second: number; }
export interface Shared { second: number; }

// @filename: single.ts
export type * from "./first";

// @filename: ambiguous.ts
export type * from "./first";
export type * from "./second";

// @filename: resolved.ts
export type * from "./ambiguous";
export type { default, Shared } from "./first";

// @filename: consumer.ts
import type First from "./single";
import type Resolved from "./resolved";
import type Conflict from "./ambiguous";
import type { Shared } from "./ambiguous";
import type * as ns from "./ambiguous";
export type { default, Shared } from "./ambiguous";
const first: First = { first: 1 };
const resolved: Resolved = first;
const conflict: Conflict = {};
const shared: Shared = {};
const qualified: ns.Shared = {};
const nested: ns.Shared.Nested = {};
