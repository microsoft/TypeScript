// @strict: true
// @declaration: true

// @filename: script.ts
const scriptArrow = () => scriptArrow;
const scriptExpression = function () { return scriptExpression; };
function scriptDeclaration() { return scriptDeclaration; }

// @filename: exported.ts
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

// @filename: consumer.ts
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

// @filename: recursiveObject.ts
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

// @filename: nestedNamedFunctions.ts
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

// @filename: recursiveStructures.ts
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

// @filename: recursiveAnnotations.ts
declare const object: { next: typeof object };
declare const tuple: readonly [typeof tuple];
declare const array: Array<typeof array>;
declare const tupleFunction: readonly [() => typeof tupleFunction];
declare const tupleObject: readonly [{ next: typeof tupleObject }];
declare const objectTuple: { next: readonly [typeof objectTuple] };
declare const mapped: { [K in "next"]: typeof mapped };
declare const union: typeof union | undefined;
declare const conditional: true extends false ? never : typeof conditional;

// @filename: namedReferences.ts
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

// @filename: hiddenReferences.ts
export class Hidden {
    private static recur() { return Hidden.recur; }
    static expose() { return Hidden.recur; }
    protected next() { return this.next; }
    expose() { return this.next; }
}

// @filename: signatureScopes.ts
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

// @filename: mappedCycles.ts
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

// @filename: optionalMappedCycle.ts
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

// @filename: mixedMappedCycle.ts
type Show<T> = { [K in keyof T]: T[K] } & unknown;
type Resolve<M, K extends keyof M> = Show<{
    [P in keyof M[K]]: M[K][P] extends "ref" ? Resolve<M, K> : M[K][P];
}>;
declare const build: <M>() => { [K in keyof M]: Resolve<M, K> | false | null };
export const mixedCycle = build<{ Node: { value: number; next: "ref" } }>();
if (mixedCycle.Node) {
    const value: number = mixedCycle.Node.next.next.value;
}

// @filename: anonymousBindings.ts
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

// @filename: shadowedMappedCycle.ts
type Show<T> = { [K in keyof T]: T[K] } & unknown;
type Resolve<M, K extends keyof M> = Show<{
    [P in keyof M[K]]: M[K][P] extends "ref" ? <T>(shadowedCycle: T) => Resolve<M, K> : M[K][P];
}>;
declare const build: <M>() => { [K in keyof M]: Resolve<M, K> };
export const shadowedCycle = build<{ Node: { value: number; next: "ref" } }>();
const shadowedValue: number = shadowedCycle.Node.next(1).next("text").value;
