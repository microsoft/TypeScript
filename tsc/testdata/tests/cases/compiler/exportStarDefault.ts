// @target: esnext
// @module: esnext, commonjs
// @strict: true
// @declaration: true

// @filename: first.ts
export default class First { first = 1; }
export const shared = 1;
export const unique = "first";

// @filename: second.ts
export default class Second { second = 2; }
export const shared = 2;

// @filename: single.ts
export * from "./first";

// @filename: diamond.ts
export * from "./first";
export * from "./single";

// @filename: ambiguous.ts
export * from "./first";
export * from "./second";

// @filename: forwarded.ts
export * from "./ambiguous";

// @filename: resolved.ts
export * from "./ambiguous";
export { default, shared } from "./first";

// @filename: local.ts
export * from "./first";
export * from "./second";
export default "local";
export const shared = true;

// @filename: localClass.ts
export * from "./first";
export default class LocalClass { local = true; }

// @filename: localFunction.ts
export * from "./first";
export default function localFunction() { return true; }

// @filename: cycleA.ts
export * from "./cycleB";

// @filename: cycleB.ts
export * from "./cycleA";
export * from "./first";

// @filename: namedConflict.ts
export { shared } from "./ambiguous";

// @filename: consumer.ts
import First from "./single";
import { default as Diamond, shared as diamondShared } from "./diamond";
import Resolved, { shared as resolvedShared } from "./resolved";
import Local, { shared as localShared } from "./local";
import LocalClass from "./localClass";
import localFunction from "./localFunction";
import Cycle from "./cycleA";
import * as single from "./single";
import * as ambiguous from "./ambiguous";
import * as forwarded from "./forwarded";
import * as namedConflict from "./namedConflict";
import Conflict, { default as NamedConflict, shared, unique } from "./ambiguous";
export { default, shared as conflict } from "./forwarded";

new First().first;
new Diamond().first;
new Resolved().first;
new single.default().first;
new single["default"]().first;
new LocalClass().local;
const localResult: boolean = localFunction();
new Cycle().first;
const one: 1 = diamondShared;
const anotherOne: 1 = resolvedShared;
const text: string = Local;
const flag: boolean = localShared;
const nonconflicting: string = unique;

ambiguous.default;
ambiguous["default"];
ambiguous.shared;
ambiguous["shared"];
forwarded.default;
forwarded["shared"];
namedConflict.shared;
// Conflicting accesses have the error type, without cascading errors.
ambiguous.default.nonexistent();
ambiguous["shared"].nonexistent();
Conflict.nonexistent();
NamedConflict.nonexistent();
shared.nonexistent();
