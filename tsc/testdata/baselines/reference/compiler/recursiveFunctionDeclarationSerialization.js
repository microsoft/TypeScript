//// [tests/cases/compiler/recursiveFunctionDeclarationSerialization.ts] ////

//// [script.ts]
const scriptArrow = () => scriptArrow;
const scriptExpression = function () { return scriptExpression; };
function scriptDeclaration() { return scriptDeclaration; }

//// [exported.ts]
export const arrow = () => arrow;
export const expression = function () { return expression; };
export function declaration() { return declaration; }
export const annotated: () => typeof annotated = () => annotated;
export const first = () => second;
export const second = () => first;
export const generic = <T>(value: T) => generic;
export const finite = () => () => 1;
export const wrapped = { arrow };
export const tuple = [arrow] as const;
export const named = function self() { return self; };
export const broad: unknown = function self() { return self; };
export const contextual: () => unknown = function self() { return self; };
export const specialized = generic<number>;

//// [consumer.ts]
import { arrow, expression, declaration, first, generic, finite, wrapped, tuple } from "./exported";
const a: typeof arrow = arrow()()();
const b: typeof expression = expression()()();
const c: typeof declaration = declaration()()();
const d: typeof first = first()()();
const e: typeof generic = generic(1)("text")(true);
const f: number = finite()();
const g: typeof arrow = wrapped.arrow()();
const h: typeof arrow = tuple[0]()();
const invalid: number = arrow()()();


//// [script.js]
"use strict";
const scriptArrow = () => scriptArrow;
const scriptExpression = function () { return scriptExpression; };
function scriptDeclaration() { return scriptDeclaration; }
//// [exported.js]
export const arrow = () => arrow;
export const expression = function () { return expression; };
export function declaration() { return declaration; }
export const annotated = () => annotated;
export const first = () => second;
export const second = () => first;
export const generic = (value) => generic;
export const finite = () => () => 1;
export const wrapped = { arrow };
export const tuple = [arrow];
export const named = function self() { return self; };
export const broad = function self() { return self; };
export const contextual = function self() { return self; };
export const specialized = generic;
//// [consumer.js]
import { arrow, expression, declaration, first, generic, finite, wrapped, tuple } from "./exported";
const a = arrow()()();
const b = expression()()();
const c = declaration()()();
const d = first()()();
const e = generic(1)("text")(true);
const f = finite()();
const g = wrapped.arrow()();
const h = tuple[0]()();
const invalid = arrow()()();


//// [consumer.d.ts]
export {};
