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
export const annotatedParameter = (value: string | number) => annotatedParameter;
export const renamedParameter = (other: number | string) => renamedParameter;
export const optionalParameter = (value?: string) => optionalParameter;
export const restParameter = (...values: string[]) => restParameter;
export const nestedReturn = () => () => nestedReturn;
export const finiteObject = { call: (value: string) => ({ value }) };
export const finiteTuple = [(value: number) => [value] as const] as const;
export const nestedGeneric = <T>(value: T) => ({
    call: (other: T) => [value, other] as const,
});
export const instantiatedNested = nestedGeneric("text");
export const objectReturn = () => ({ call: objectReturn });
export const tupleReturn = () => [tupleReturn] as const;
export const shadowed = function self(shadowed: number) { return self; };

//// [consumer.ts]
import { arrow, expression, declaration, first, generic, finite, wrapped, tuple } from "./exported";
import { instantiatedNested, objectReturn, tupleReturn, shadowed } from "./exported";
const a: typeof arrow = arrow()()();
const b: typeof expression = expression()()();
const c: typeof declaration = declaration()()();
const d: typeof first = first()()();
const e: typeof generic = generic(1)("text")(true);
const f: number = finite()();
const g: typeof arrow = wrapped.arrow()();
const h: typeof arrow = tuple[0]()();
const invalid: number = arrow()()();
const nestedResult: readonly [string, string] = instantiatedNested.call("other");
instantiatedNested.call(1);
const objectCall: typeof objectReturn = objectReturn().call().call;
const tupleCall: typeof tupleReturn = tupleReturn()[0]()[0];
const shadowedCall: typeof shadowed = shadowed(1)(2);

//// [recursiveObject.ts]
export function recursiveObject<T>() {
    const value = {
        call: <U>(arg: U) => value,
        consume: (arg: T) => value,
    };
    return value;
}

const result = recursiveObject<number>().call("hello").consume(1);
type IsAny<T> = 0 extends (1 & T) ? true : false;
const notAny: false = null as unknown as IsAny<typeof result.call>;
const invalidCall: number = result.call;
result.consume("wrong");

//// [nestedNamedFunctions.ts]
export const nestedObject = { recur: () => nestedObject.recur };
export const nestedTuple = [() => nestedTuple[0]] as const;
export const object = { recur: function self() { return self; } };
export const tuple = [function self() { return self; }] as const;
export const factory = () => function self() { return self; };
export const method = { recur() { return method; } };
export const accessor = { get recur() { return accessor; } };
export function local() {
    function recur() { return recur; }
    return recur;
}

//// [recursiveStructures.ts]
export const object = { value: 1, next: () => object };
export const method = { value: 1, next() { return method; } };
export const accessor = { value: 1, get next() { return accessor; } };
export const tuple = [() => tuple] as const;
export const tupleObject = [{ next: () => tupleObject }] as const;
export const array = [() => array];
export const first = { next: () => second };
export const second = { next: () => first };
export const nested = { inner: { next() { return nested.inner; } } };
export const shadowed = { next: function self(shadowed: number) { return self; } };
export const memberTuple = [function self() { return self; }] as const;
export const memberArray = [function self() { return self; }];
export const quoted = { "a-b": function self() { return self; } };
export const numeric = { 0: function self() { return self; } };
export const key = Symbol();
export const computed = { [key]: function self() { return self; } };
export const union = Math.random() ? { next: () => union } : undefined;

function create<T>(value: T) {
    const result = { value, next: () => result };
    return result;
}
export const specialized = create("text");
export const broad: unknown = { next() { return this; } };
function createIndexed() {
    const value: { [key: string]: typeof value } = {};
    return value;
}
export const indexed = createIndexed();
function createMapped<T>() {
    const value: { [K in keyof T]: typeof value } = null!;
    return value;
}
export const mapped = createMapped<{ next: unknown }>();
function createAnnotated<T>(value: T) {
    const node: { value: T; next: () => typeof node } = { value, next: () => node };
    return node;
}
export const viaAnnotation = createAnnotated("text");

const objectValue: number = object.next().next().value;
const tupleValue: typeof tuple = tuple[0]()[0]();
const tupleObjectValue: typeof tupleObject = tupleObject[0].next();
const arrayValue: typeof array = array[0]()[0]();
const nestedValue: typeof nested.inner = nested.inner.next().next();
const specializedValue: string = specialized.next().next().value;
const invalidValue: number = specialized.next().value;

//// [recursiveAnnotations.ts]
declare const object: { next: typeof object };
declare const tuple: readonly [typeof tuple];
declare const array: Array<typeof array>;
declare const tupleFunction: readonly [() => typeof tupleFunction];
declare const tupleObject: readonly [{ next: typeof tupleObject }];
declare const objectTuple: { next: readonly [typeof objectTuple] };
declare const mapped: { [K in "next"]: typeof mapped };
declare const union: typeof union | undefined;
declare const conditional: true extends false ? never : typeof conditional;

//// [namedReferences.ts]
export type Link<T> = { value: T; next: Link<T> };
export type Callable<T> = { (value: T): Callable<T>; link: Link<T> };
export type Wrapped = ( { next: Wrapped } );
export declare const link: Link<string>;
export declare const callable: Callable<number>;
export const nextLink = link.next;
export const nextCallable = callable(1);
export const parenthesized = (function self() { return self; });
export const asserted = (function self() { return self; }) satisfies () => unknown;
export const widened: () => unknown = (function self() { return self; });
function createHidden<T>(value: T) {
    type Hidden = { value: T; next: Hidden };
    return null! as Hidden;
}
export const hiddenAlias = createHidden("text");
export const siblingHiddenAliases = { first: hiddenAlias, second: hiddenAlias };
export const methodKey = Symbol();
export class Methods {
    static recur() { return Methods.recur; }
    static "a-b"() { return Methods["a-b"]; }
    static [methodKey]() { return Methods[methodKey]; }
    recur() { return this.recur; }
}
export function overloaded(value: string): typeof overloaded;
export function overloaded(value: number): typeof overloaded;
export function overloaded(value: string | number) { return overloaded; }
const text: string = nextLink.next.value;
const invalid: number = nextLink.next.value;
nextCallable("wrong");

//// [hiddenReferences.ts]
export class Hidden {
    private static recur() { return Hidden.recur; }
    static expose() { return Hidden.recur; }
    protected next() { return this.next; }
    expose() { return this.next; }
}

//// [signatureScopes.ts]
export const scoped = {
    first<T>(outer: T) {
        return {
            nested<T>(inner: T) { return { outer, inner, next: scoped }; },
            sibling<T>(inner: T) { return { outer, inner, next: scoped }; },
        };
    },
    second<T>(value: T) { return { value, next: scoped }; },
};
export const numberScope = scoped.first(1);
export const stringScope = scoped.first("outer");
const nested = numberScope.nested("inner");
const sibling = numberScope.sibling(true);
const nestedOuter: number = nested.outer;
const nestedInner: string = nested.inner;
const siblingOuter: number = sibling.outer;
const siblingInner: boolean = sibling.inner;
const stringOuter: string = stringScope.nested(1).outer;
const again: number = nested.next.second(1).value;

export const nestedOwner = {
    make<T>(outer: T) {
        return {
            nested<U>(inner: U) { return { outer, inner, owner: nestedOwner }; },
            constrained<U extends T = T>(inner: U) { return { outer, inner, owner: nestedOwner }; },
            copied<U>(inner: U): { outer: T; inner: U; owner: typeof nestedOwner } {
                return { outer, inner, owner: nestedOwner };
            },
            rest<U>(...values: [U]) { return { outer, inner: values[0], owner: nestedOwner }; },
        };
    },
};
export const nestedNumber = nestedOwner.make(1);
export const nestedString = nestedNumber.nested(true).owner.make("text").nested(2);
export const nestedBoolean = nestedString.owner.make(true).nested("inner");
const nestedStringOuter: string = nestedString.outer;
const nestedStringInner: number = nestedString.inner;
const nestedBooleanOuter: boolean = nestedBoolean.outer;
const nestedBooleanInner: string = nestedBoolean.inner;
const constrainedOuter: number = nestedNumber.constrained(2).outer;
const constrainedInner: number = nestedNumber.constrained(2).inner;
const copiedOuter: number = nestedNumber.copied("inner").outer;
const copiedInner: string = nestedNumber.copied("inner").inner;
const restOuter: number = nestedNumber.rest(true).outer;
const restInner: boolean = nestedNumber.rest(true).inner;

export declare const reused: {
    first<T>(...values: [T]): { value: T; next: typeof reused };
    second<T>(value: T): { value: T; next: typeof reused };
    shadowed<T>(reused: T): { value: T; next: typeof reused };
};
export const copy = reused;
const restValue: number = copy.first(1).next.second(2).value;
const shadowedValue: number = copy.shadowed(1).next;

export type Inferred<T> = T extends (value: infer U) => infer R
    ? { [K in keyof R]: (value: U) => R[K] }
    : never;
export declare const inferred: Inferred<(value: number) => { next: typeof reused }>;
export const inferredCopy = inferred;
const inferredValue: string = inferredCopy.next(1).second("text").value;

//// [mappedCycles.ts]
type Show<T> = { [K in keyof T]: T[K] } & unknown;
type Resolve<M, K extends keyof M> = Show<{
    [P in keyof M[K]]: M[K][P] extends "ref" ? Resolve<M, K> : M[K][P];
}>;
declare const build: <M>() => { [K in keyof M]: Resolve<M, K> };
export const mappedCycle = build<{ Node: { value: number; next: "ref" } }>();
export const mappedCycleCopy = mappedCycle;
export const nestedCycle = { wrapped: build<{ Node: { value: string; next: "ref" } }>() };
export const cycleKey = Symbol();
export const keyedCycles = build<{
    "a-b": { value: string; next: "ref" };
    0: { value: boolean; next: "ref" };
    [cycleKey]: { value: number; next: "ref" };
}>();
export const sharedCycles = {
    first: mappedCycle,
    second: mappedCycle,
};
export const broadCycle: { Node: unknown } = mappedCycle;

type ResolveMutual<M, K extends keyof M> = Show<{
    [P in keyof M[K]]: M[K][P] extends { ref: infer R extends keyof M } ? ResolveMutual<M, R> : M[K][P];
}>;
declare const buildMutual: <M>() => { [K in keyof M]: ResolveMutual<M, K> };
export const mutualCycle = buildMutual<{
    First: { value: number; next: { ref: "Second" } };
    Second: { value: string; next: { ref: "First" } };
}>();

const mappedValue: number = mappedCycle.Node.next.next.value;
const nestedMappedValue: string = nestedCycle.wrapped.Node.next.next.value;
const quotedMappedValue: string = keyedCycles["a-b"].next.next.value;
const numericMappedValue: boolean = keyedCycles[0].next.next.value;
const symbolMappedValue: number = keyedCycles[cycleKey].next.next.value;
const sharedMappedValue: number = sharedCycles.second.Node.next.next.value;
const mutualFirstValue: number = mutualCycle.First.next.next.value;
const mutualSecondValue: string = mutualCycle.First.next.value;
const invalidMappedValue: string = mappedCycle.Node.next.next.value;
const invalidMutualValue: number = mutualCycle.First.next.value;

//// [optionalMappedCycle.ts]
type Show<T> = { [K in keyof T]: T[K] } & unknown;
type Resolve<M, K extends keyof M> = Show<{
    [P in keyof M[K]]: M[K][P] extends "ref" ? Resolve<M, K> : M[K][P];
}>;
declare const build: <M>() => { [K in keyof M]?: Resolve<M, K> };
export const optionalCycle = build<{ Node: { value: number; next: "ref" } }>();
const optionalValue: number | undefined = optionalCycle.Node?.next.next.value;
export const optionalCopy = optionalCycle;
declare const buildNullable: <M>() => { [K in keyof M]: Resolve<M, K> | null };
export const nullableCycle = buildNullable<{ Node: { value: string; next: "ref" } }>();
declare const wrap: <T>(value: T) => { required: T; optional?: T | null };
export const mixedCycles = wrap(optionalCycle);
export const sharedOptionalCycles = { first: optionalCycle, second: optionalCycle };
export const nullableKey = Symbol();
export const nullableKeys = buildNullable<{
    "a-b": { value: string; next: "ref" };
    0: { value: boolean; next: "ref" };
    [nullableKey]: { value: number; next: "ref" };
}>();
declare const buildNullableRoot: <M>() => Resolve<M, keyof M> | null;
export const nullableRoot = buildNullableRoot<{ Node: { value: number; next: "ref" } }>();
declare const buildOptionalRoot: <M>() => Resolve<M, keyof M> | undefined;
export const optionalRoot = buildOptionalRoot<{ Node: { value: string; next: "ref" } }>();
type ResolveNullable<M, K extends keyof M> = Show<{
    [P in keyof M[K]]: M[K][P] extends "ref" ? ResolveNullable<M, K> | null : M[K][P];
}>;
declare const buildNullableLinks: <M>() => { [K in keyof M]: ResolveNullable<M, K> | null };
export const nullableLinks = buildNullableLinks<{ Node: { value: number; next: "ref" } }>();
declare const buildOptionalNullableLinks: <M>() => { [K in keyof M]?: ResolveNullable<M, K> | null };
export const optionalNullableLinks = buildOptionalNullableLinks<{ Node: { value: number; next: "ref" } }>();
type ResolveOptional<M, K extends keyof M> = Show<{
    [P in keyof M[K]]: M[K][P] extends "ref" ? ResolveOptional<M, K> | undefined : M[K][P];
}>;
declare const buildNullableOptionalLinks: <M>() => { [K in keyof M]: ResolveOptional<M, K> | null };
export const nullableOptionalLinks = buildNullableOptionalLinks<{ Node: { value: number; next: "ref" } }>();
type ResolveNullish<M, K extends keyof M> = Show<{
    [P in keyof M[K]]: M[K][P] extends "ref" ? ResolveNullish<M, K> | null | undefined : M[K][P];
}>;
declare const buildNullishLinks: <M>() => { [K in keyof M]?: ResolveNullish<M, K> | null };
export const nullishLinks = buildNullishLinks<{ Node: { value: number; next: "ref" } }>();
type NonNullable<T> = "shadowed";
type OptionalNode = (typeof optionalCycle)["Node"] & {};
type NullableNode = (typeof nullableCycle)["Node"] & {};
type NullableLinkNode = (typeof nullableLinks)["Node"] & {};
type NullishLinkNode = (typeof nullishLinks)["Node"] & {};
type OptionalNullableLinkNode = (typeof optionalNullableLinks)["Node"] & {};
type NullableOptionalLinkNode = (typeof nullableOptionalLinks)["Node"] & {};
const copiedValue: number | undefined = optionalCopy.Node?.next.next.value;
const nullableValue: string | undefined = nullableCycle.Node?.next.next.value;
const mixedValue: number | undefined = mixedCycles.optional?.Node?.next.next.value;
const sharedValue: number | undefined = sharedOptionalCycles.second.Node?.next.next.value;
const quotedValue: string | undefined = nullableKeys["a-b"]?.next.next.value;
const numericValue: boolean | undefined = nullableKeys[0]?.next.next.value;
const symbolValue: number | undefined = nullableKeys[nullableKey]?.next.next.value;
const nullableRootValue: number | undefined = nullableRoot?.next.next.value;
const optionalRootValue: string | undefined = optionalRoot?.next.next.value;
const nullableLinkValue: number | undefined = nullableLinks.Node?.next?.next?.value;
const nullishLinkValue: number | undefined = nullishLinks.Node?.next?.next?.value;
const optionalNullableLinkValue: number | undefined = optionalNullableLinks.Node?.next?.next?.value;
const nullableOptionalLinkValue: number | undefined = nullableOptionalLinks.Node?.next?.next?.value;
const optionalNextHasNull: null extends OptionalNode["next"] ? true : false = false;
const optionalNextHasUndefined: undefined extends OptionalNode["next"] ? true : false = false;
const nullableNextHasNull: null extends NullableNode["next"] ? true : false = false;
const nullableNextHasUndefined: undefined extends NullableNode["next"] ? true : false = false;
const nullableLinkHasNull: null extends NullableLinkNode["next"] ? true : false = true;
const nullableLinkHasUndefined: undefined extends NullableLinkNode["next"] ? true : false = false;
const nullishLinkHasNull: null extends NullishLinkNode["next"] ? true : false = true;
const nullishLinkHasUndefined: undefined extends NullishLinkNode["next"] ? true : false = true;
const optionalNullableLinkHasNull: null extends OptionalNullableLinkNode["next"] ? true : false = true;
const optionalNullableLinkHasUndefined: undefined extends OptionalNullableLinkNode["next"] ? true : false = false;
const nullableOptionalLinkHasNull: null extends NullableOptionalLinkNode["next"] ? true : false = false;
const nullableOptionalLinkHasUndefined: undefined extends NullableOptionalLinkNode["next"] ? true : false = true;
const invalidNullNext: OptionalNode["next"] = null;
const invalidUndefinedNext: OptionalNode["next"] = undefined;
const invalidNullableLinkValue: number = nullableLinks.Node!.next.value;
const invalidNullishLinkValue: number = nullishLinks.Node!.next.value;

//// [mixedMappedCycle.ts]
type Show<T> = { [K in keyof T]: T[K] } & unknown;
type Resolve<M, K extends keyof M> = Show<{
    [P in keyof M[K]]: M[K][P] extends "ref" ? Resolve<M, K> : M[K][P];
}>;
declare const build: <M>() => { [K in keyof M]: Resolve<M, K> | false | null };
export const mixedCycle = build<{ Node: { value: number; next: "ref" } }>();
if (mixedCycle.Node) {
    const value: number = mixedCycle.Node.next.next.value;
}

//// [anonymousThisReturn.ts]
export function test() {
    return {
        relyingOnThis() {
            return this;
        },
    };
}
test().relyingOnThis();

//// [recursiveConditionalAliasUtils.ts]
type Recursive<T> = T extends Array<infer V> ? Recursive<V> : T;
export const f = <T>(): Recursive<T> => {
    return null!;
};

//// [recursiveConditionalAliasCopy.ts]
import { f } from "./recursiveConditionalAliasUtils";
export const a = f;
const numberValue: number = a<number[][][][][][][][][][][][][][][][]>();
const stringValue: string = a<string[][]>();

//// [anonymousBindings.ts]
export const _recursive = 1;
export const factory = () => function self() { return self; };
export function captured<T>(value: T) {
    const node = { value, next: () => node, consume: (other: T) => node };
    return node;
}
export function nestedCaptured<T>(outer: T) {
    return <U>(inner: U) => {
        const node = {
            outer,
            inner,
            next: () => node,
            shadow: <T>(value: T) => ({ outer, inner, value, next: node }),
        };
        return node;
    };
}
export function constrained<T extends { value: number }, K extends keyof T>(key: K) {
    const node = { value: null! as T[K], next: () => node };
    return node;
}
export function optionalCaptured<T>(value: T) {
    type Node = { value: T; next: Node };
    return null! as { node?: Node | false | null };
}
export function annotatedCaptured<T>(value: T) {
    const node: { value: typeof value; next: typeof node } = { value, next: null! };
    return node;
}
export function recursiveTuple<T>(value: T) {
    type Tuple = readonly [T, Tuple];
    return null! as Tuple;
}
export function inferredCaptured<T>() {
    type Node<V> = { value: V; next: Node<V> };
    return null! as (T extends () => infer U ? Node<U> : never);
}
export function mappedCaptured<T>() {
    type Node = { [K in keyof T]: { value: T[K]; next: Node } };
    return null! as Node;
}
export function freshGeneric<T>(unused: T) {
    const recur = <U>(value: U) => recur;
    return recur;
}
export function mutualCaptured<T, U>(left: T, right: U) {
    type Left = { left: T; next: Right };
    type Right = { right: U; self: Right; next: Left };
    return { left: null! as Left, right: null! as Right };
}
export class CapturedClass<T> {
    constructor(public value: T) {}
    make<U extends T>(inner: U) {
        const node = { outer: this.value, inner, next: () => node };
        return node;
    }
}
export function covariantClass() {
    return class Node<out T> {
        value!: T;
        next(): Node<T> { return this; }
    };
}
export function contravariantClass() {
    return class Node<in T> {
        consume!: (value: T) => void;
        next(): Node<T> { return this; }
    };
}
export namespace Nested {
    export function captured<T>(value: T) {
        const node = { value, next: () => node };
        return node;
    }
}
const capturedValue: string = captured("text").next().consume("other").value;
const nestedValue = nestedCaptured(1)("text").shadow(true).next.next();
const nestedOuter: number = nestedValue.outer;
const nestedInner: string = nestedValue.inner;
const constrainedValue: number = constrained<{ value: number }, "value">("value").next().value;
const annotatedValue: string = annotatedCaptured("text").next.next.value;
const tupleValue: string = recursiveTuple("text")[1][1][0];
const namespaceValue: number = Nested.captured(1).next().next().value;
const inferredValue: string = inferredCaptured<() => string>().next.next.value;
const mappedValue: number = mappedCaptured<{ value: number }>().value.next.value.value;
const freshValue = freshGeneric(1)("text")(true)(2);
const mutualValue: string = mutualCaptured(1, "text").left.next.self.next.next.right;
const classValue: string = new CapturedClass("text").make("other").next().outer;
const optional = optionalCaptured("text");
if (optional.node) {
    const value: string = optional.node.next.next.value;
}
captured("text").consume(1);
const invalidTupleValue: number = recursiveTuple("text")[1][0];

//// [shadowedMappedCycle.ts]
type Show<T> = { [K in keyof T]: T[K] } & unknown;
type Resolve<M, K extends keyof M> = Show<{
    [P in keyof M[K]]: M[K][P] extends "ref" ? <T>(shadowedCycle: T) => Resolve<M, K> : M[K][P];
}>;
declare const build: <M>() => { [K in keyof M]: Resolve<M, K> };
export const shadowedCycle = build<{ Node: { value: number; next: "ref" } }>();
const shadowedValue: number = shadowedCycle.Node.next(1).next("text").value;


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
export const annotatedParameter = (value) => annotatedParameter;
export const renamedParameter = (other) => renamedParameter;
export const optionalParameter = (value) => optionalParameter;
export const restParameter = (...values) => restParameter;
export const nestedReturn = () => () => nestedReturn;
export const finiteObject = { call: (value) => ({ value }) };
export const finiteTuple = [(value) => [value]];
export const nestedGeneric = (value) => ({
    call: (other) => [value, other],
});
export const instantiatedNested = nestedGeneric("text");
export const objectReturn = () => ({ call: objectReturn });
export const tupleReturn = () => [tupleReturn];
export const shadowed = function self(shadowed) { return self; };
//// [consumer.js]
import { arrow, expression, declaration, first, generic, finite, wrapped, tuple } from "./exported";
import { instantiatedNested, objectReturn, tupleReturn, shadowed } from "./exported";
const a = arrow()()();
const b = expression()()();
const c = declaration()()();
const d = first()()();
const e = generic(1)("text")(true);
const f = finite()();
const g = wrapped.arrow()();
const h = tuple[0]()();
const invalid = arrow()()();
const nestedResult = instantiatedNested.call("other");
instantiatedNested.call(1);
const objectCall = objectReturn().call().call;
const tupleCall = tupleReturn()[0]()[0];
const shadowedCall = shadowed(1)(2);
//// [recursiveObject.js]
export function recursiveObject() {
    const value = {
        call: (arg) => value,
        consume: (arg) => value,
    };
    return value;
}
const result = recursiveObject().call("hello").consume(1);
const notAny = null;
const invalidCall = result.call;
result.consume("wrong");
//// [nestedNamedFunctions.js]
export const nestedObject = { recur: () => nestedObject.recur };
export const nestedTuple = [() => nestedTuple[0]];
export const object = { recur: function self() { return self; } };
export const tuple = [function self() { return self; }];
export const factory = () => function self() { return self; };
export const method = { recur() { return method; } };
export const accessor = { get recur() { return accessor; } };
export function local() {
    function recur() { return recur; }
    return recur;
}
//// [recursiveStructures.js]
export const object = { value: 1, next: () => object };
export const method = { value: 1, next() { return method; } };
export const accessor = { value: 1, get next() { return accessor; } };
export const tuple = [() => tuple];
export const tupleObject = [{ next: () => tupleObject }];
export const array = [() => array];
export const first = { next: () => second };
export const second = { next: () => first };
export const nested = { inner: { next() { return nested.inner; } } };
export const shadowed = { next: function self(shadowed) { return self; } };
export const memberTuple = [function self() { return self; }];
export const memberArray = [function self() { return self; }];
export const quoted = { "a-b": function self() { return self; } };
export const numeric = { 0: function self() { return self; } };
export const key = Symbol();
export const computed = { [key]: function self() { return self; } };
export const union = Math.random() ? { next: () => union } : undefined;
function create(value) {
    const result = { value, next: () => result };
    return result;
}
export const specialized = create("text");
export const broad = { next() { return this; } };
function createIndexed() {
    const value = {};
    return value;
}
export const indexed = createIndexed();
function createMapped() {
    const value = null;
    return value;
}
export const mapped = createMapped();
function createAnnotated(value) {
    const node = { value, next: () => node };
    return node;
}
export const viaAnnotation = createAnnotated("text");
const objectValue = object.next().next().value;
const tupleValue = tuple[0]()[0]();
const tupleObjectValue = tupleObject[0].next();
const arrayValue = array[0]()[0]();
const nestedValue = nested.inner.next().next();
const specializedValue = specialized.next().next().value;
const invalidValue = specialized.next().value;
//// [recursiveAnnotations.js]
"use strict";
//// [namedReferences.js]
export const nextLink = link.next;
export const nextCallable = callable(1);
export const parenthesized = (function self() { return self; });
export const asserted = (function self() { return self; });
export const widened = (function self() { return self; });
function createHidden(value) {
    return null;
}
export const hiddenAlias = createHidden("text");
export const siblingHiddenAliases = { first: hiddenAlias, second: hiddenAlias };
export const methodKey = Symbol();
export class Methods {
    static recur() { return Methods.recur; }
    static "a-b"() { return Methods["a-b"]; }
    static [methodKey]() { return Methods[methodKey]; }
    recur() { return this.recur; }
}
export function overloaded(value) { return overloaded; }
const text = nextLink.next.value;
const invalid = nextLink.next.value;
nextCallable("wrong");
//// [hiddenReferences.js]
export class Hidden {
    static recur() { return Hidden.recur; }
    static expose() { return Hidden.recur; }
    next() { return this.next; }
    expose() { return this.next; }
}
//// [signatureScopes.js]
export const scoped = {
    first(outer) {
        return {
            nested(inner) { return { outer, inner, next: scoped }; },
            sibling(inner) { return { outer, inner, next: scoped }; },
        };
    },
    second(value) { return { value, next: scoped }; },
};
export const numberScope = scoped.first(1);
export const stringScope = scoped.first("outer");
const nested = numberScope.nested("inner");
const sibling = numberScope.sibling(true);
const nestedOuter = nested.outer;
const nestedInner = nested.inner;
const siblingOuter = sibling.outer;
const siblingInner = sibling.inner;
const stringOuter = stringScope.nested(1).outer;
const again = nested.next.second(1).value;
export const nestedOwner = {
    make(outer) {
        return {
            nested(inner) { return { outer, inner, owner: nestedOwner }; },
            constrained(inner) { return { outer, inner, owner: nestedOwner }; },
            copied(inner) {
                return { outer, inner, owner: nestedOwner };
            },
            rest(...values) { return { outer, inner: values[0], owner: nestedOwner }; },
        };
    },
};
export const nestedNumber = nestedOwner.make(1);
export const nestedString = nestedNumber.nested(true).owner.make("text").nested(2);
export const nestedBoolean = nestedString.owner.make(true).nested("inner");
const nestedStringOuter = nestedString.outer;
const nestedStringInner = nestedString.inner;
const nestedBooleanOuter = nestedBoolean.outer;
const nestedBooleanInner = nestedBoolean.inner;
const constrainedOuter = nestedNumber.constrained(2).outer;
const constrainedInner = nestedNumber.constrained(2).inner;
const copiedOuter = nestedNumber.copied("inner").outer;
const copiedInner = nestedNumber.copied("inner").inner;
const restOuter = nestedNumber.rest(true).outer;
const restInner = nestedNumber.rest(true).inner;
export const copy = reused;
const restValue = copy.first(1).next.second(2).value;
const shadowedValue = copy.shadowed(1).next;
export const inferredCopy = inferred;
const inferredValue = inferredCopy.next(1).second("text").value;
//// [mappedCycles.js]
export const mappedCycle = build();
export const mappedCycleCopy = mappedCycle;
export const nestedCycle = { wrapped: build() };
export const cycleKey = Symbol();
export const keyedCycles = build();
export const sharedCycles = {
    first: mappedCycle,
    second: mappedCycle,
};
export const broadCycle = mappedCycle;
export const mutualCycle = buildMutual();
const mappedValue = mappedCycle.Node.next.next.value;
const nestedMappedValue = nestedCycle.wrapped.Node.next.next.value;
const quotedMappedValue = keyedCycles["a-b"].next.next.value;
const numericMappedValue = keyedCycles[0].next.next.value;
const symbolMappedValue = keyedCycles[cycleKey].next.next.value;
const sharedMappedValue = sharedCycles.second.Node.next.next.value;
const mutualFirstValue = mutualCycle.First.next.next.value;
const mutualSecondValue = mutualCycle.First.next.value;
const invalidMappedValue = mappedCycle.Node.next.next.value;
const invalidMutualValue = mutualCycle.First.next.value;
//// [optionalMappedCycle.js]
export const optionalCycle = build();
const optionalValue = optionalCycle.Node?.next.next.value;
export const optionalCopy = optionalCycle;
export const nullableCycle = buildNullable();
export const mixedCycles = wrap(optionalCycle);
export const sharedOptionalCycles = { first: optionalCycle, second: optionalCycle };
export const nullableKey = Symbol();
export const nullableKeys = buildNullable();
export const nullableRoot = buildNullableRoot();
export const optionalRoot = buildOptionalRoot();
export const nullableLinks = buildNullableLinks();
export const optionalNullableLinks = buildOptionalNullableLinks();
export const nullableOptionalLinks = buildNullableOptionalLinks();
export const nullishLinks = buildNullishLinks();
const copiedValue = optionalCopy.Node?.next.next.value;
const nullableValue = nullableCycle.Node?.next.next.value;
const mixedValue = mixedCycles.optional?.Node?.next.next.value;
const sharedValue = sharedOptionalCycles.second.Node?.next.next.value;
const quotedValue = nullableKeys["a-b"]?.next.next.value;
const numericValue = nullableKeys[0]?.next.next.value;
const symbolValue = nullableKeys[nullableKey]?.next.next.value;
const nullableRootValue = nullableRoot?.next.next.value;
const optionalRootValue = optionalRoot?.next.next.value;
const nullableLinkValue = nullableLinks.Node?.next?.next?.value;
const nullishLinkValue = nullishLinks.Node?.next?.next?.value;
const optionalNullableLinkValue = optionalNullableLinks.Node?.next?.next?.value;
const nullableOptionalLinkValue = nullableOptionalLinks.Node?.next?.next?.value;
const optionalNextHasNull = false;
const optionalNextHasUndefined = false;
const nullableNextHasNull = false;
const nullableNextHasUndefined = false;
const nullableLinkHasNull = true;
const nullableLinkHasUndefined = false;
const nullishLinkHasNull = true;
const nullishLinkHasUndefined = true;
const optionalNullableLinkHasNull = true;
const optionalNullableLinkHasUndefined = false;
const nullableOptionalLinkHasNull = false;
const nullableOptionalLinkHasUndefined = true;
const invalidNullNext = null;
const invalidUndefinedNext = undefined;
const invalidNullableLinkValue = nullableLinks.Node.next.value;
const invalidNullishLinkValue = nullishLinks.Node.next.value;
//// [mixedMappedCycle.js]
export const mixedCycle = build();
if (mixedCycle.Node) {
    const value = mixedCycle.Node.next.next.value;
}
//// [anonymousThisReturn.js]
export function test() {
    return {
        relyingOnThis() {
            return this;
        },
    };
}
test().relyingOnThis();
//// [recursiveConditionalAliasUtils.js]
export const f = () => {
    return null;
};
//// [recursiveConditionalAliasCopy.js]
import { f } from "./recursiveConditionalAliasUtils";
export const a = f;
const numberValue = a();
const stringValue = a();
//// [anonymousBindings.js]
export const _recursive = 1;
export const factory = () => function self() { return self; };
export function captured(value) {
    const node = { value, next: () => node, consume: (other) => node };
    return node;
}
export function nestedCaptured(outer) {
    return (inner) => {
        const node = {
            outer,
            inner,
            next: () => node,
            shadow: (value) => ({ outer, inner, value, next: node }),
        };
        return node;
    };
}
export function constrained(key) {
    const node = { value: null, next: () => node };
    return node;
}
export function optionalCaptured(value) {
    return null;
}
export function annotatedCaptured(value) {
    const node = { value, next: null };
    return node;
}
export function recursiveTuple(value) {
    return null;
}
export function inferredCaptured() {
    return null;
}
export function mappedCaptured() {
    return null;
}
export function freshGeneric(unused) {
    const recur = (value) => recur;
    return recur;
}
export function mutualCaptured(left, right) {
    return { left: null, right: null };
}
export class CapturedClass {
    value;
    constructor(value) {
        this.value = value;
    }
    make(inner) {
        const node = { outer: this.value, inner, next: () => node };
        return node;
    }
}
export function covariantClass() {
    return class Node {
        value;
        next() { return this; }
    };
}
export function contravariantClass() {
    return class Node {
        consume;
        next() { return this; }
    };
}
export var Nested;
(function (Nested) {
    function captured(value) {
        const node = { value, next: () => node };
        return node;
    }
    Nested.captured = captured;
})(Nested || (Nested = {}));
const capturedValue = captured("text").next().consume("other").value;
const nestedValue = nestedCaptured(1)("text").shadow(true).next.next();
const nestedOuter = nestedValue.outer;
const nestedInner = nestedValue.inner;
const constrainedValue = constrained("value").next().value;
const annotatedValue = annotatedCaptured("text").next.next.value;
const tupleValue = recursiveTuple("text")[1][1][0];
const namespaceValue = Nested.captured(1).next().next().value;
const inferredValue = inferredCaptured().next.next.value;
const mappedValue = mappedCaptured().value.next.value.value;
const freshValue = freshGeneric(1)("text")(true)(2);
const mutualValue = mutualCaptured(1, "text").left.next.self.next.next.right;
const classValue = new CapturedClass("text").make("other").next().outer;
const optional = optionalCaptured("text");
if (optional.node) {
    const value = optional.node.next.next.value;
}
captured("text").consume(1);
const invalidTupleValue = recursiveTuple("text")[1][0];
//// [shadowedMappedCycle.js]
export const shadowedCycle = build();
const shadowedValue = shadowedCycle.Node.next(1).next("text").value;


//// [script.d.ts]
declare const scriptArrow: () => typeof scriptArrow;
declare const scriptExpression: () => typeof scriptExpression;
declare function scriptDeclaration(): typeof scriptDeclaration;
//// [exported.d.ts]
export declare const arrow: () => typeof arrow;
export declare const expression: () => typeof expression;
export declare function declaration(): typeof declaration;
export declare const annotated: () => typeof annotated;
export declare const first: () => typeof second;
export declare const second: () => typeof first;
export declare const generic: <T>(value: T) => typeof generic;
export declare const finite: () => () => number;
export declare const wrapped: {
    arrow: typeof arrow;
};
export declare const tuple: readonly [typeof arrow];
export declare const named: () => typeof named;
export declare const broad: unknown;
export declare const contextual: () => unknown;
export declare const specialized: (value: number) => typeof generic;
export declare const annotatedParameter: (value: string | number) => typeof annotatedParameter;
export declare const renamedParameter: (other: number | string) => typeof renamedParameter;
export declare const optionalParameter: (value?: string) => typeof optionalParameter;
export declare const restParameter: (...values: string[]) => typeof restParameter;
export declare const nestedReturn: () => () => typeof nestedReturn;
export declare const finiteObject: {
    call: (value: string) => {
        value: string;
    };
};
export declare const finiteTuple: readonly [(value: number) => readonly [number]];
export declare const nestedGeneric: <T>(value: T) => {
    call: (other: T) => readonly [T, T];
};
export declare const instantiatedNested: {
    call: (other: string) => readonly [string, string];
};
export declare const objectReturn: () => {
    call: typeof objectReturn;
};
export declare const tupleReturn: () => readonly [typeof tupleReturn];
export declare const shadowed: (shadowed: number) => typeof import("./exported").shadowed;
//// [consumer.d.ts]
export {};
//// [recursiveObject.d.ts]
type _recursive<T> = {
    call: <U>(arg: U) => _recursive<T>;
    consume: (arg: T) => _recursive<T>;
};
export declare function recursiveObject<T>(): _recursive<T>;
export {};
//// [nestedNamedFunctions.d.ts]
type _recursive = () => _recursive;
type _recursive_1 = () => _recursive_1;
export declare const nestedObject: {
    recur: () => () => (typeof nestedObject)["recur"];
};
export declare const nestedTuple: readonly [() => () => (typeof nestedTuple)[0]];
export declare const object: {
    recur: () => () => (typeof object)["recur"];
};
export declare const tuple: readonly [() => () => (typeof tuple)[0]];
export declare const factory: () => () => _recursive;
export declare const method: {
    recur(): typeof method;
};
export declare const accessor: {
    readonly recur: typeof accessor;
};
export declare function local(): _recursive_1;
export {};
//// [recursiveStructures.d.ts]
export declare const object: {
    value: number;
    next: () => typeof object;
};
export declare const method: {
    value: number;
    next(): typeof method;
};
export declare const accessor: {
    value: number;
    readonly next: typeof accessor;
};
export declare const tuple: readonly [() => typeof tuple];
export declare const tupleObject: readonly [{
    readonly next: () => typeof tupleObject;
}];
export declare const array: (() => typeof array)[];
export declare const first: {
    next: () => {
        next: () => typeof first;
    };
};
export declare const second: {
    next: () => {
        next: () => typeof second;
    };
};
export declare const nested: {
    inner: {
        next(): {
            next(): (typeof nested)["inner"];
        };
    };
};
export declare const shadowed: {
    next: (shadowed: number) => (shadowed: number) => typeof import("./recursiveStructures").shadowed["next"];
};
export declare const memberTuple: readonly [() => () => (typeof memberTuple)[0]];
export declare const memberArray: (() => (typeof memberArray)[0])[];
export declare const quoted: {
    "a-b": () => () => (typeof quoted)["a-b"];
};
export declare const numeric: {
    0: () => () => (typeof numeric)[0];
};
export declare const key: unique symbol;
export declare const computed: {
    [key]: () => (typeof computed)[typeof key];
};
export declare const union: {
    next: () => typeof union;
} | undefined;
export declare const specialized: {
    value: string;
    next: () => typeof specialized;
};
export declare const broad: unknown;
export declare const indexed: {
    [key: string]: typeof indexed;
};
export declare const mapped: {
    next: typeof mapped;
};
export declare const viaAnnotation: {
    value: string;
    next: () => typeof viaAnnotation;
};
//// [recursiveAnnotations.d.ts]
declare const object: {
    next: typeof object;
};
declare const tuple: readonly [typeof tuple];
declare const array: Array<typeof array>;
declare const tupleFunction: readonly [() => typeof tupleFunction];
declare const tupleObject: readonly [{
    next: typeof tupleObject;
}];
declare const objectTuple: {
    next: readonly [typeof objectTuple];
};
declare const mapped: {
    [K in "next"]: typeof mapped;
};
declare const union: typeof union | undefined;
declare const conditional: true extends false ? never : typeof conditional;
//// [namedReferences.d.ts]
export type Link<T> = {
    value: T;
    next: Link<T>;
};
export type Callable<T> = {
    (value: T): Callable<T>;
    link: Link<T>;
};
export type Wrapped = ({
    next: Wrapped;
});
export declare const link: Link<string>;
export declare const callable: Callable<number>;
export declare const nextLink: Link<string>;
export declare const nextCallable: Callable<number>;
export declare const parenthesized: () => typeof parenthesized;
export declare const asserted: () => typeof asserted;
export declare const widened: () => unknown;
export declare const hiddenAlias: {
    value: string;
    next: typeof hiddenAlias;
};
export declare const siblingHiddenAliases: {
    first: {
        value: string;
        next: (typeof siblingHiddenAliases)["first"];
    };
    second: {
        value: string;
        next: (typeof siblingHiddenAliases)["second"];
    };
};
export declare const methodKey: unique symbol;
export declare class Methods {
    static recur(): (typeof Methods)["recur"];
    static "a-b"(): (typeof Methods)["a-b"];
    static [methodKey](): (typeof Methods)[typeof methodKey];
    recur(): Methods["recur"];
}
export declare function overloaded(value: string): typeof overloaded;
export declare function overloaded(value: number): typeof overloaded;
//// [hiddenReferences.d.ts]
type _recursive = () => _recursive;
type _recursive_1 = () => _recursive_1;
type _recursive_2 = () => _recursive_2;
export declare class Hidden {
    private static recur;
    static expose(): _recursive;
    protected next(): _recursive_1;
    expose(): _recursive_2;
}
export {};
//// [signatureScopes.d.ts]
export declare const scoped: {
    first<T>(outer: T): {
        nested<T_1>(inner: T_1): {
            outer: T;
            inner: T_1;
            next: typeof scoped;
        };
        sibling<T_1>(inner: T_1): {
            outer: T;
            inner: T_1;
            next: typeof scoped;
        };
    };
    second<T>(value: T): {
        value: T;
        next: typeof scoped;
    };
};
export declare const numberScope: {
    nested<T>(inner: T): {
        outer: number;
        inner: T;
        next: {
            first<T_1>(outer: T_1): {
                nested<T_2>(inner: T_2): {
                    outer: T_1;
                    inner: T_2;
                    next: typeof scoped;
                };
                sibling<T_2>(inner: T_2): {
                    outer: T_1;
                    inner: T_2;
                    next: typeof scoped;
                };
            };
            second<T_1>(value: T_1): {
                value: T_1;
                next: typeof scoped;
            };
        };
    };
    sibling<T>(inner: T): {
        outer: number;
        inner: T;
        next: {
            first<T_1>(outer: T_1): {
                nested<T_2>(inner: T_2): {
                    outer: T_1;
                    inner: T_2;
                    next: typeof scoped;
                };
                sibling<T_2>(inner: T_2): {
                    outer: T_1;
                    inner: T_2;
                    next: typeof scoped;
                };
            };
            second<T_1>(value: T_1): {
                value: T_1;
                next: typeof scoped;
            };
        };
    };
};
export declare const stringScope: {
    nested<T>(inner: T): {
        outer: string;
        inner: T;
        next: {
            first<T_1>(outer: T_1): {
                nested<T_2>(inner: T_2): {
                    outer: T_1;
                    inner: T_2;
                    next: typeof scoped;
                };
                sibling<T_2>(inner: T_2): {
                    outer: T_1;
                    inner: T_2;
                    next: typeof scoped;
                };
            };
            second<T_1>(value: T_1): {
                value: T_1;
                next: typeof scoped;
            };
        };
    };
    sibling<T>(inner: T): {
        outer: string;
        inner: T;
        next: {
            first<T_1>(outer: T_1): {
                nested<T_2>(inner: T_2): {
                    outer: T_1;
                    inner: T_2;
                    next: typeof scoped;
                };
                sibling<T_2>(inner: T_2): {
                    outer: T_1;
                    inner: T_2;
                    next: typeof scoped;
                };
            };
            second<T_1>(value: T_1): {
                value: T_1;
                next: typeof scoped;
            };
        };
    };
};
export declare const nestedOwner: {
    make<T>(outer: T): {
        nested<U>(inner: U): {
            outer: T;
            inner: U;
            owner: typeof nestedOwner;
        };
        constrained<U extends T = T>(inner: U): {
            outer: T;
            inner: U;
            owner: typeof nestedOwner;
        };
        copied<U>(inner: U): {
            outer: T;
            inner: U;
            owner: typeof nestedOwner;
        };
        rest<U>(values_0: U): {
            outer: T;
            inner: U;
            owner: typeof nestedOwner;
        };
    };
};
export declare const nestedNumber: {
    nested<U>(inner: U): {
        outer: number;
        inner: U;
        owner: {
            make<T>(outer: T): {
                nested<U_1>(inner: U_1): {
                    outer: T;
                    inner: U_1;
                    owner: typeof nestedOwner;
                };
                constrained<U_1 extends T = T>(inner: U_1): {
                    outer: T;
                    inner: U_1;
                    owner: typeof nestedOwner;
                };
                copied<U_1>(inner: U_1): {
                    outer: T;
                    inner: U_1;
                    owner: typeof nestedOwner;
                };
                rest<U_1>(values_0: U_1): {
                    outer: T;
                    inner: U_1;
                    owner: typeof nestedOwner;
                };
            };
        };
    };
    constrained<U extends number = number>(inner: U): {
        outer: number;
        inner: U;
        owner: {
            make<T>(outer: T): {
                nested<U_1>(inner: U_1): {
                    outer: T;
                    inner: U_1;
                    owner: typeof nestedOwner;
                };
                constrained<U_1 extends T = T>(inner: U_1): {
                    outer: T;
                    inner: U_1;
                    owner: typeof nestedOwner;
                };
                copied<U_1>(inner: U_1): {
                    outer: T;
                    inner: U_1;
                    owner: typeof nestedOwner;
                };
                rest<U_1>(values_0: U_1): {
                    outer: T;
                    inner: U_1;
                    owner: typeof nestedOwner;
                };
            };
        };
    };
    copied<U>(inner: U): {
        outer: number;
        inner: U;
        owner: typeof nestedOwner;
    };
    rest<U>(values_0: U): {
        outer: number;
        inner: U;
        owner: {
            make<T>(outer: T): {
                nested<U_1>(inner: U_1): {
                    outer: T;
                    inner: U_1;
                    owner: typeof nestedOwner;
                };
                constrained<U_1 extends T = T>(inner: U_1): {
                    outer: T;
                    inner: U_1;
                    owner: typeof nestedOwner;
                };
                copied<U_1>(inner: U_1): {
                    outer: T;
                    inner: U_1;
                    owner: typeof nestedOwner;
                };
                rest<U_1>(values_0: U_1): {
                    outer: T;
                    inner: U_1;
                    owner: typeof nestedOwner;
                };
            };
        };
    };
};
export declare const nestedString: {
    outer: string;
    inner: number;
    owner: {
        make<T>(outer: T): {
            nested<U>(inner: U): {
                outer: T;
                inner: U;
                owner: (typeof nestedString)["owner"];
            };
            constrained<U extends T = T>(inner: U): {
                outer: T;
                inner: U;
                owner: (typeof nestedString)["owner"];
            };
            copied<U>(inner: U): {
                outer: T;
                inner: U;
                owner: typeof nestedOwner;
            };
            rest<U>(values_0: U): {
                outer: T;
                inner: U;
                owner: (typeof nestedString)["owner"];
            };
        };
    };
};
export declare const nestedBoolean: {
    outer: boolean;
    inner: string;
    owner: {
        make<T>(outer: T): {
            nested<U>(inner: U): {
                outer: T;
                inner: U;
                owner: (typeof nestedBoolean)["owner"];
            };
            constrained<U extends T = T>(inner: U): {
                outer: T;
                inner: U;
                owner: (typeof nestedBoolean)["owner"];
            };
            copied<U>(inner: U): {
                outer: T;
                inner: U;
                owner: typeof nestedOwner;
            };
            rest<U>(values_0: U): {
                outer: T;
                inner: U;
                owner: (typeof nestedBoolean)["owner"];
            };
        };
    };
};
export declare const reused: {
    first<T>(...values: [T]): {
        value: T;
        next: typeof reused;
    };
    second<T>(value: T): {
        value: T;
        next: typeof reused;
    };
    shadowed<T>(reused: T): {
        value: T;
        next: typeof reused;
    };
};
export declare const copy: {
    first<T>(values_0: T): {
        value: T;
        next: typeof reused;
    };
    second<T>(value: T): {
        value: T;
        next: typeof reused;
    };
    shadowed<T>(reused: T): {
        value: T;
        next: typeof reused;
    };
};
export type Inferred<T> = T extends (value: infer U) => infer R ? {
    [K in keyof R]: (value: U) => R[K];
} : never;
export declare const inferred: Inferred<(value: number) => {
    next: typeof reused;
}>;
export declare const inferredCopy: {
    next: (value: number) => {
        first<T>(values_0: T): {
            value: T;
            next: typeof reused;
        };
        second<T>(value: T): {
            value: T;
            next: typeof reused;
        };
        shadowed<T>(reused: T): {
            value: T;
            next: typeof reused;
        };
    };
};
//// [mappedCycles.d.ts]
export declare const mappedCycle: {
    Node: {
        value: number;
        next: (typeof mappedCycle)["Node"];
    };
};
export declare const mappedCycleCopy: {
    Node: {
        value: number;
        next: (typeof mappedCycleCopy)["Node"];
    };
};
export declare const nestedCycle: {
    wrapped: {
        Node: {
            value: string;
            next: (typeof nestedCycle)["wrapped"]["Node"];
        };
    };
};
export declare const cycleKey: unique symbol;
export declare const keyedCycles: {
    "a-b": {
        value: string;
        next: (typeof keyedCycles)["a-b"];
    };
    0: {
        value: boolean;
        next: (typeof keyedCycles)[0];
    };
    [cycleKey]: {
        value: number;
        next: (typeof keyedCycles)[typeof cycleKey];
    };
};
export declare const sharedCycles: {
    first: {
        Node: {
            value: number;
            next: (typeof sharedCycles)["first"]["Node"];
        };
    };
    second: {
        Node: {
            value: number;
            next: (typeof sharedCycles)["second"]["Node"];
        };
    };
};
export declare const broadCycle: {
    Node: unknown;
};
export declare const mutualCycle: {
    First: {
        value: number;
        next: {
            value: string;
            next: (typeof mutualCycle)["First"];
        };
    };
    Second: {
        value: string;
        next: {
            value: number;
            next: (typeof mutualCycle)["Second"];
        };
    };
};
//// [optionalMappedCycle.d.ts]
type _recursive = {
    value: number;
    next: _recursive;
};
type _recursive_1 = {
    value: number;
    next: _recursive_1;
};
type _recursive_2 = {
    value: string;
    next: _recursive_2;
};
type _recursive_3 = {
    value: number;
    next: _recursive_3;
};
type _recursive_4 = {
    value: number;
    next: _recursive_4;
};
type _recursive_5 = {
    value: string;
    next: _recursive_5;
};
type _recursive_6 = {
    value: boolean;
    next: _recursive_6;
};
type _recursive_7 = {
    value: number;
    next: _recursive_7;
};
type _recursive_8 = {
    value: number;
    next: _recursive_8;
};
type _recursive_9 = {
    value: string;
    next: _recursive_9;
};
type _recursive_10 = {
    value: number;
    next: _recursive_10 | null;
};
type _recursive_11 = {
    value: number;
    next: _recursive_11 | undefined;
};
export declare const optionalCycle: {
    Node?: _recursive | undefined;
};
export declare const optionalCopy: {
    Node?: _recursive_1 | undefined;
};
export declare const nullableCycle: {
    Node: _recursive_2 | null;
};
export declare const mixedCycles: {
    required: {
        Node?: _recursive_3 | undefined;
    };
    optional?: {
        Node?: _recursive_3 | undefined;
    } | null | undefined;
};
export declare const sharedOptionalCycles: {
    first: {
        Node?: _recursive_4 | undefined;
    };
    second: {
        Node?: _recursive_4 | undefined;
    };
};
export declare const nullableKey: unique symbol;
export declare const nullableKeys: {
    "a-b": _recursive_5 | null;
    0: _recursive_6 | null;
    [nullableKey]: _recursive_7 | null;
};
export declare const nullableRoot: _recursive_8 | null;
export declare const optionalRoot: _recursive_9 | undefined;
export declare const nullableLinks: {
    Node: {
        value: number;
        next: (typeof nullableLinks)["Node"];
    } | null;
};
export declare const optionalNullableLinks: {
    Node?: _recursive_10 | null | undefined;
};
export declare const nullableOptionalLinks: {
    Node: _recursive_11 | null;
};
export declare const nullishLinks: {
    Node?: {
        value: number;
        next: (typeof nullishLinks)["Node"];
    } | null | undefined;
};
export {};
//// [mixedMappedCycle.d.ts]
type _recursive = {
    value: number;
    next: _recursive;
};
export declare const mixedCycle: {
    Node: false | _recursive | null;
};
export {};
//// [anonymousThisReturn.d.ts]
type _recursive = {
    relyingOnThis(): _recursive;
};
export declare function test(): {
    relyingOnThis(): _recursive;
};
export {};
//// [recursiveConditionalAliasUtils.d.ts]
type Recursive<T> = T extends Array<infer V> ? Recursive<V> : T;
export declare const f: <T>() => Recursive<T>;
export {};
//// [recursiveConditionalAliasCopy.d.ts]
import { f } from "./recursiveConditionalAliasUtils";
export declare const a: typeof f;
//// [anonymousBindings.d.ts]
type _recursive_1 = () => _recursive_1;
type _recursive_2<T> = {
    value: T;
    next: () => _recursive_2<T>;
    consume: (other: T) => _recursive_2<T>;
};
type _recursive_3<T, U> = {
    outer: T;
    inner: U;
    next: () => _recursive_3<T, U>;
    shadow: <T_1>(value: T_1) => {
        outer: T;
        inner: U;
        value: T_1;
        next: _recursive_3<T, U>;
    };
};
type _recursive_4<T extends {
    value: number;
}, K extends keyof T> = {
    value: T[K];
    next: () => _recursive_4<T, K>;
};
type _recursive_5<T> = {
    value: T;
    next: _recursive_5<T>;
};
type _recursive_6<T> = {
    value: T;
    next: _recursive_6<T>;
};
type _recursive_7<T> = readonly [T, _recursive_7<T>];
type _recursive_8<U> = {
    value: U;
    next: _recursive_8<U>;
};
type _recursive_9<T> = { [K in keyof T]: {
    value: T[K];
    next: _recursive_9<T>;
}; };
type _recursive_10 = <U>(value: U) => _recursive_10;
type _recursive_11<T, U> = {
    right: U;
    self: _recursive_11<T, U>;
    next: _recursive_12<T, U>;
};
type _recursive_12<T, U> = {
    left: T;
    next: _recursive_11<T, U>;
};
type _recursive_13<T, U extends T> = {
    outer: T;
    inner: U;
    next: () => _recursive_13<T, U>;
};
type _recursive_14<out T> = {
    value: T;
    next(): _recursive_14<T>;
};
type _recursive_15<in T> = {
    consume: (value: T) => void;
    next(): _recursive_15<T>;
};
export declare const _recursive = 1;
export declare const factory: () => () => _recursive_1;
export declare function captured<T>(value: T): _recursive_2<T>;
export declare function nestedCaptured<T>(outer: T): <U>(inner: U) => _recursive_3<T, U>;
export declare function constrained<T extends {
    value: number;
}, K extends keyof T>(key: K): _recursive_4<T, K>;
export declare function optionalCaptured<T>(value: T): {
    node?: _recursive_5<T> | false | null;
};
export declare function annotatedCaptured<T>(value: T): _recursive_6<T>;
export declare function recursiveTuple<T>(value: T): _recursive_7<T>;
export declare function inferredCaptured<T>(): (T extends () => infer U ? _recursive_8<U> : never);
export declare function mappedCaptured<T>(): _recursive_9<T>;
export declare function freshGeneric<T>(unused: T): _recursive_10;
export declare function mutualCaptured<T, U>(left: T, right: U): {
    left: _recursive_12<T, U>;
    right: _recursive_11<T, U>;
};
export declare class CapturedClass<T> {
    value: T;
    constructor(value: T);
    make<U extends T>(inner: U): _recursive_13<T, U>;
}
export declare function covariantClass(): {
    new <T>(): _recursive_14<T>;
};
export declare function contravariantClass(): {
    new <T>(): _recursive_15<T>;
};
export declare namespace Nested {
    type _recursive_16<T> = {
        value: T;
        next: () => _recursive_16<T>;
    };
    export function captured<T>(value: T): _recursive_16<T>;
    export {};
}
export {};
//// [shadowedMappedCycle.d.ts]
export declare const shadowedCycle: {
    Node: {
        value: number;
        next: <T>(shadowedCycle: T) => typeof import("./shadowedMappedCycle").shadowedCycle["Node"];
    };
};
