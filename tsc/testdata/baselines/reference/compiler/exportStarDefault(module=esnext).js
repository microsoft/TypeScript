//// [tests/cases/compiler/exportStarDefault.ts] ////

//// [first.ts]
export default class First { first = 1; }
export const shared = 1;
export const unique = "first";

//// [second.ts]
export default class Second { second = 2; }
export const shared = 2;

//// [single.ts]
export * from "./first";

//// [diamond.ts]
export * from "./first";
export * from "./single";

//// [ambiguous.ts]
export * from "./first";
export * from "./second";

//// [forwarded.ts]
export * from "./ambiguous";

//// [resolved.ts]
export * from "./ambiguous";
export { default, shared } from "./first";

//// [local.ts]
export * from "./first";
export * from "./second";
export default "local";
export const shared = true;

//// [localClass.ts]
export * from "./first";
export default class LocalClass { local = true; }

//// [localFunction.ts]
export * from "./first";
export default function localFunction() { return true; }

//// [cycleA.ts]
export * from "./cycleB";

//// [cycleB.ts]
export * from "./cycleA";
export * from "./first";

//// [namedConflict.ts]
export { shared } from "./ambiguous";

//// [firstDeclaration.d.ts]
export default class FirstDeclaration { first: number; }

//// [secondDeclaration.d.ts]
export default class SecondDeclaration { second: number; }

//// [ambiguousDeclaration.d.ts]
export * from "./firstDeclaration";
export * from "./secondDeclaration";

//// [consumer.ts]
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
import DeclarationConflict from "./ambiguousDeclaration";
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
DeclarationConflict.nonexistent();


//// [first.js]
export default class First {
    first = 1;
}
export const shared = 1;
export const unique = "first";
//// [second.js]
export default class Second {
    second = 2;
}
export const shared = 2;
//// [single.js]
export * from "./first";
//// [diamond.js]
export * from "./first";
export * from "./single";
//// [ambiguous.js]
export * from "./first";
export * from "./second";
//// [forwarded.js]
export * from "./ambiguous";
//// [resolved.js]
export * from "./ambiguous";
export { default, shared } from "./first";
//// [local.js]
export * from "./first";
export * from "./second";
export default "local";
export const shared = true;
//// [localClass.js]
export * from "./first";
export default class LocalClass {
    local = true;
}
//// [localFunction.js]
export * from "./first";
export default function localFunction() { return true; }
//// [cycleB.js]
export * from "./cycleA";
export * from "./first";
//// [cycleA.js]
export * from "./cycleB";
//// [namedConflict.js]
export { shared } from "./ambiguous";
//// [consumer.js]
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
import DeclarationConflict from "./ambiguousDeclaration";
export { default, shared as conflict } from "./forwarded";
new First().first;
new Diamond().first;
new Resolved().first;
new single.default().first;
new single["default"]().first;
new LocalClass().local;
const localResult = localFunction();
new Cycle().first;
const one = diamondShared;
const anotherOne = resolvedShared;
const text = Local;
const flag = localShared;
const nonconflicting = unique;
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
DeclarationConflict.nonexistent();


//// [first.d.ts]
export default class First {
    first: number;
}
export declare const shared = 1;
export declare const unique = "first";
//// [second.d.ts]
export default class Second {
    second: number;
}
export declare const shared = 2;
//// [single.d.ts]
export * from "./first";
//// [diamond.d.ts]
export * from "./first";
export * from "./single";
//// [ambiguous.d.ts]
export * from "./first";
export * from "./second";
//// [forwarded.d.ts]
export * from "./ambiguous";
//// [resolved.d.ts]
export * from "./ambiguous";
export { default, shared } from "./first";
//// [local.d.ts]
export * from "./first";
export * from "./second";
declare const _default = "local";
export default _default;
export declare const shared = true;
//// [localClass.d.ts]
export * from "./first";
export default class LocalClass {
    local: boolean;
}
//// [localFunction.d.ts]
export * from "./first";
export default function localFunction(): boolean;
//// [cycleB.d.ts]
export * from "./cycleA";
export * from "./first";
//// [cycleA.d.ts]
export * from "./cycleB";
//// [namedConflict.d.ts]
export { shared } from "./ambiguous";
//// [consumer.d.ts]
export { default, shared as conflict } from "./forwarded";
