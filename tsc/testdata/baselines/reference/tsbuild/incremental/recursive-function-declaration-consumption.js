currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/consumer/index.ts] *new* 
import { conditionalAliasCopy, anonymousThisReturn } from "../producer/dist/index.js";
import { arrow, expression, first, generic, objectReturn, tupleReturn, shadowed } from "../producer/dist/index.js";
import { object, method, accessor, tuple, array, nested } from "../producer/dist/index.js";
import { memberTuple, memberArray, quoted, numeric, key, computed, union, specialized } from "../producer/dist/index.js";
import { indexed, mapped, viaAnnotation } from "../producer/dist/index.js";
import { nextLink, nextCallable, parenthesized, asserted, Methods, overloaded } from "../producer/dist/index.js";
import { hiddenAlias, siblingHiddenAliases } from "../producer/dist/index.js";
import { nestedNumber } from "../producer/dist/index.js";
import { mappedCycle, mappedCycleCopy, nestedCycle, cycleKey, keyedCycles, sharedCycles, mutualCycle, shadowedCycle } from "../producer/dist/index.js";
import { optionalCycle, nullableCycle, mixedCycles, sharedOptionalCycles, nullableKeys, nullableRoot, optionalRoot, nullableLinks, nullishLinks } from "../producer/dist/index.js";
import { optionalNullableLinks, nullableOptionalLinks } from "../producer/dist/index.js";
import { mixedUnionCycle, factory, captured, nestedCaptured, constrained, optionalCaptured, annotatedCaptured, recursiveTuple, Nested } from "../producer/dist/index.js";
import { inferredCaptured, mappedCaptured, freshGeneric, mutualCaptured } from "../producer/dist/index.js";
import { CapturedClass } from "../producer/dist/index.js";
import { covariantClass, contravariantClass } from "../producer/dist/index.js";
const a: typeof arrow = arrow()()();
const b: typeof expression = expression()()();
const c: typeof first = first()()();
const d: typeof generic = generic(1)("text")(true);
const objectCall: typeof objectReturn = objectReturn().call().call;
const tupleCall: typeof tupleReturn = tupleReturn()[0]()[0];
const shadowedCall: typeof shadowed = shadowed(1)(2);
const objectValue: number = object.next().next().value;
const methodValue: number = method.next().next().value;
const accessorValue: number = accessor.next.next.value;
const tupleValue: typeof tuple = tuple[0]()[0]();
const arrayValue: typeof array = array[0]()[0]();
const nestedValue: typeof nested.inner = nested.inner.next().next();
const memberTupleValue: typeof memberTuple[0] = memberTuple[0]()();
const memberArrayValue: typeof memberArray[0] = memberArray[0]()();
const quotedValue: typeof quoted["a-b"] = quoted["a-b"]()();
const numericValue: typeof numeric[0] = numeric[0]()();
const computedValue: typeof computed[typeof key] = computed[key]()();
const unionValue: typeof union = union?.next()?.next();
const specializedValue: string = specialized.next().next().value;
const indexedValue: typeof indexed = indexed["next"]["next"];
const mappedValue: typeof mapped = mapped.next.next;
const annotationValue: string = viaAnnotation.next().next().value;
const linkValue: string = nextLink.next.next.value;
const callableValue: number = nextCallable(1)(2).link.next.value;
const parenthesizedValue: typeof parenthesized = parenthesized()()();
const assertedValue: typeof asserted = asserted()()();
const methodReference: typeof Methods.recur = Methods.recur()()();
const quotedMethodReference: typeof Methods["a-b"] = Methods["a-b"]()()();
const computedMethodReference: typeof Methods[typeof key] = Methods[key]()()();
const instance = new Methods();
const instanceMethodReference: typeof instance.recur = instance.recur()()();
const overloadReference: typeof overloaded = overloaded(1)("text")(2);
const hiddenValue: string = hiddenAlias.next.next.value;
const siblingHiddenValue: string = siblingHiddenAliases.second.next.next.value;
const nestedString = nestedNumber.nested(true).owner.make("text").nested(2);
const nestedBoolean = nestedString.owner.make(true).nested("inner");
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
const mappedCycleValue: number = mappedCycle.Node.next.next.value;
const copiedMappedValue: number = mappedCycleCopy.Node.next.next.value;
const nestedMappedValue: string = nestedCycle.wrapped.Node.next.next.value;
const quotedMappedValue: string = keyedCycles["a-b"].next.next.value;
const numericMappedValue: boolean = keyedCycles[0].next.next.value;
const symbolMappedValue: number = keyedCycles[cycleKey].next.next.value;
const sharedMappedValue: number = sharedCycles.second.Node.next.next.value;
const mutualFirstValue: number = mutualCycle.First.next.next.value;
const mutualSecondValue: string = mutualCycle.First.next.value;
const shadowedMappedValue: number = shadowedCycle.Node.next(1).next("text").value;
const optionalCycleValue: number | undefined = optionalCycle.Node?.next.next.value;
const nullableCycleValue: string | undefined = nullableCycle.Node?.next.next.value;
const mixedCycleValue: number | undefined = mixedCycles.optional?.Node?.next.next.value;
const mixedRequiredValue: number | undefined = mixedCycles.required.Node?.next.next.value;
const sharedOptionalValue: number | undefined = sharedOptionalCycles.second.Node?.next.next.value;
const quotedNullableValue: string | undefined = nullableKeys["a-b"]?.next.next.value;
const numericNullableValue: boolean | undefined = nullableKeys[0]?.next.next.value;
const symbolNullableValue: number | undefined = nullableKeys[cycleKey]?.next.next.value;
const nullableRootValue: number | undefined = nullableRoot?.next.next.value;
const optionalRootValue: string | undefined = optionalRoot?.next.next.value;
const nullableLinkValue: number | undefined = nullableLinks.Node?.next?.next?.value;
const nullishLinkValue: number | undefined = nullishLinks.Node?.next?.next?.value;
const optionalNullableLinkValue: number | undefined = optionalNullableLinks.Node?.next?.next?.value;
const nullableOptionalLinkValue: number | undefined = nullableOptionalLinks.Node?.next?.next?.value;
type OptionalNode = (typeof optionalCycle)["Node"] & {};
type NullableNode = (typeof nullableCycle)["Node"] & {};
type NullableLinkNode = (typeof nullableLinks)["Node"] & {};
type NullishLinkNode = (typeof nullishLinks)["Node"] & {};
type OptionalNullableLinkNode = (typeof optionalNullableLinks)["Node"] & {};
type NullableOptionalLinkNode = (typeof nullableOptionalLinks)["Node"] & {};
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
type IsAny<T> = 0 extends (1 & T) ? true : false;
const anonymousThisResult = anonymousThisReturn().relyingOnThis().relyingOnThis();
const anonymousThisNotAny: IsAny<typeof anonymousThisResult> = false;
const anonymousThisMethodNotAny: IsAny<typeof anonymousThisResult.relyingOnThis> = false;
const conditionalAliasResult = conditionalAliasCopy<number[][][][][][][][][][][][][][][][]>();
const conditionalNumber: number = conditionalAliasResult;
const conditionalString: string = conditionalAliasCopy<string[][]>();
const conditionalNotAny: IsAny<typeof conditionalAliasResult> = false;
const result = arrow()()();
const notAny: false = null as unknown as IsAny<typeof result>;
const mappedNotAny: false = null as unknown as IsAny<typeof mappedCycle.Node.next>;
const mutualNotAny: false = null as unknown as IsAny<typeof mutualCycle.First.next>;
const shadowedMappedNotAny: false = null as unknown as IsAny<typeof shadowedCycle.Node.next>;
const optionalNotAny: IsAny<OptionalNode["next"]> = false;
const nullableNotAny: IsAny<NullableNode["next"]> = false;
const nullableLinkNotAny: IsAny<NullableLinkNode["next"]> = false;
const nullishLinkNotAny: IsAny<NullishLinkNode["next"]> = false;
const optionalNullableLinkNotAny: IsAny<OptionalNullableLinkNode["next"]> = false;
const nullableOptionalLinkNotAny: IsAny<NullableOptionalLinkNode["next"]> = false;
const factoryResult = factory()()()();
const factoryNotAny: IsAny<typeof factoryResult> = false;
const capturedValue: string = captured("text").next().consume("other").value;
const capturedResult = captured("text").next();
const capturedNotAny: IsAny<typeof capturedResult> = false;
const nestedCapturedValue = nestedCaptured(1)("text").shadow(true).next.next();
const capturedOuter: number = nestedCapturedValue.outer;
const capturedInner: string = nestedCapturedValue.inner;
const constrainedValue: number = constrained<{ value: number }, "value">("value").next().value;
const annotatedCapturedValue: string = annotatedCaptured("text").next.next.value;
const recursiveTupleValue: string = recursiveTuple("text")[1][1][0];
const namespaceValue: number = Nested.captured(1).next().next().value;
const inferredCapturedValue: string = inferredCaptured<() => string>().next.next.value;
const mappedCapturedValue: number = mappedCaptured<{ value: number }>().value.next.value.value;
const freshGenericValue = freshGeneric(1)("text")(true)(2);
const freshGenericNotAny: IsAny<typeof freshGenericValue> = false;
const mutualCapturedValue: string = mutualCaptured(1, "text").left.next.self.next.next.right;
const mutualCapturedResult = mutualCaptured(1, "text").right.self.next.left;
const mutualCapturedNotAny: IsAny<typeof mutualCapturedResult> = false;
const capturedClassResult = new CapturedClass("text").make("other").next();
const capturedClassOuter: string = capturedClassResult.outer;
const capturedClassInner: string = capturedClassResult.inner;
const capturedClassNotAny: IsAny<typeof capturedClassResult> = false;
const Covariant = covariantClass();
const covariantString = new Covariant<string>();
const covariantUnknown = new Covariant<unknown>();
const covariantWide: typeof covariantUnknown = covariantString.next();
const covariantNotAny: IsAny<typeof covariantString> = false;
const Contravariant = contravariantClass();
const contravariantString = new Contravariant<string>();
const contravariantUnknown = new Contravariant<unknown>();
const contravariantNarrow: typeof contravariantString = contravariantUnknown.next();
const contravariantNotAny: IsAny<typeof contravariantString> = false;
const optionalCapturedValue = optionalCaptured("text");
if (optionalCapturedValue.node) {
    const value: string = optionalCapturedValue.node.next.next.value;
    const notAny: IsAny<typeof optionalCapturedValue.node.next> = false;
}
if (mixedUnionCycle.Node) {
    const value: number = mixedUnionCycle.Node.next.next.value;
    const notAny: IsAny<typeof mixedUnionCycle.Node.next> = false;
}
const invalid: number = arrow()()();
const invalidExpression: number = expression()()();
const invalidObject: number = objectReturn().call;
const invalidTuple: number = tupleReturn()[0];
const invalidShadowed: number = shadowed(1);
const invalidObjectValue: string = object.next().value;
const invalidTupleValue: number = tuple[0]();
const invalidSpecialized: number = specialized.next().value;
const invalidMapped: number = mapped.next;
const invalidAnnotation: number = viaAnnotation.next().value;
const invalidLink: number = nextLink.next.value;
const invalidCallable: string = nextCallable(1).link.value;
const invalidHiddenValue: number = hiddenAlias.next.next.value;
const invalidMethod: number = Methods.recur()();
const invalidComputedMethod: number = Methods[key]()();
const invalidNestedOuter: boolean = nestedString.outer;
const invalidNestedInner: string = nestedString.inner;
nestedNumber.constrained("wrong");
const invalidMappedCycleValue: string = mappedCycle.Node.next.next.value;
const invalidMutualCycleValue: number = mutualCycle.First.next.value;
const invalidShadowedMappedValue: string = shadowedCycle.Node.next(1).next("text").value;
const invalidNullNext: OptionalNode["next"] = null;
const invalidUndefinedNext: OptionalNode["next"] = undefined;
const invalidNullableLinkValue: number = nullableLinks.Node!.next.value;
const invalidNullishLinkValue: number = nullishLinks.Node!.next.value;
captured("text").consume(1);
const invalidRecursiveTupleValue: number = recursiveTuple("text")[1][0];
const invalidCapturedOuter: string = nestedCapturedValue.outer;
const invalidCapturedInner: number = nestedCapturedValue.inner;
type WithoutFalseOrNullish<T> = T extends false | null | undefined ? never : T;
const invalidMixedNext: WithoutFalseOrNullish<typeof mixedUnionCycle.Node>["next"] = false;
const invalidInferredCapturedValue: number = inferredCaptured<() => string>().next.value;
const invalidMappedCapturedValue: string = mappedCaptured<{ value: number }>().value.next.value.value;
const invalidMutualCapturedValue: boolean = mutualCaptured(1, "text").right.self.next.left;
const invalidCapturedClassValue: number = capturedClassResult.outer;
const invalidCovariance: typeof covariantString = covariantUnknown.next();
const invalidContravariance: typeof contravariantUnknown = contravariantString.next();
const invalidAnonymousThis: number = anonymousThisResult;
const invalidAnonymousThisMethod: number = anonymousThisResult.relyingOnThis;
const invalidConditionalAlias: string = conditionalAliasResult;
const invalidConditionalAliasArray: number[] = conditionalAliasResult;
//// [/home/src/workspaces/project/consumer/tsconfig.json] *new* 
{
					"compilerOptions": { "strict": true, "exactOptionalPropertyTypes": true, "noEmit": true },
					"references": [{ "path": "../producer" }]
				}
//// [/home/src/workspaces/project/producer/index.ts] *new* 
import { f } from "./recursive-conditional-utils";
export const conditionalAliasCopy = f;
export function anonymousThisReturn() {
    return {
        relyingOnThis() {
            return this;
        },
    };
}
export const arrow = () => arrow;
export const expression = function self() { return self; };
export const first = () => second;
export const second = () => first;
export const generic = <T>(value: T) => generic;
export const objectReturn = () => ({ call: objectReturn });
export const tupleReturn = () => [tupleReturn] as const;
export const shadowed = function self(shadowed: number) { return self; };
export const object = { value: 1, next: () => object };
export const method = { value: 1, next() { return method; } };
export const accessor = { value: 1, get next() { return accessor; } };
export const tuple = [() => tuple] as const;
export const array = [() => array];
export const nested = { inner: { next() { return nested.inner; } } };
export const memberTuple = [function self() { return self; }] as const;
export const memberArray = [function self() { return self; }];
export const quoted = { "a-b": function self() { return self; } };
export const numeric = { 0: function self() { return self; } };
export const key = Symbol();
export const computed = { [key]: function self() { return self; } };
export const union = true as boolean ? { next: () => union } : undefined;
function create<T>(value: T) {
    const result = { value, next: () => result };
    return result;
}
export const specialized = create("text");
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
export type Link<T> = { value: T; next: Link<T> };
export type Callable<T> = { (value: T): Callable<T>; link: Link<T> };
export declare const link: Link<string>;
export declare const callable: Callable<number>;
export const nextLink = link.next;
export const nextCallable = callable(1);
function createHidden<T>(value: T) {
    type Hidden = { value: T; next: Hidden };
    return null! as Hidden;
}
export const hiddenAlias = createHidden("text");
export const siblingHiddenAliases = { first: hiddenAlias, second: hiddenAlias };
export const parenthesized = (function self() { return self; });
export const asserted = (function self() { return self; }) satisfies () => unknown;
export class Methods {
    static recur() { return Methods.recur; }
    static "a-b"() { return Methods["a-b"]; }
    static [key]() { return Methods[key]; }
    recur() { return this.recur; }
}
export function overloaded(value: string): typeof overloaded;
export function overloaded(value: number): typeof overloaded;
export function overloaded(value: string | number) { return overloaded; }
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
export const sharedCycles = { first: mappedCycle, second: mappedCycle };
type ResolveMutual<M, K extends keyof M> = Show<{
    [P in keyof M[K]]: M[K][P] extends { ref: infer R extends keyof M } ? ResolveMutual<M, R> : M[K][P];
}>;
declare const buildMutual: <M>() => { [K in keyof M]: ResolveMutual<M, K> };
export const mutualCycle = buildMutual<{
    First: { value: number; next: { ref: "Second" } };
    Second: { value: string; next: { ref: "First" } };
}>();
type ResolveShadowed<M, K extends keyof M> = Show<{
    [P in keyof M[K]]: M[K][P] extends "ref" ? <T>(shadowedCycle: T) => ResolveShadowed<M, K> : M[K][P];
}>;
declare const buildShadowed: <M>() => { [K in keyof M]: ResolveShadowed<M, K> };
export const shadowedCycle = buildShadowed<{ Node: { value: number; next: "ref" } }>();
declare const buildOptional: <M>() => { [K in keyof M]?: Resolve<M, K> };
export const optionalCycle = buildOptional<{ Node: { value: number; next: "ref" } }>();
declare const buildNullable: <M>() => { [K in keyof M]: Resolve<M, K> | null };
export const nullableCycle = buildNullable<{ Node: { value: string; next: "ref" } }>();
declare const wrap: <T>(value: T) => { required: T; optional?: T | null };
export const mixedCycles = wrap(optionalCycle);
export const sharedOptionalCycles = { first: optionalCycle, second: optionalCycle };
export const nullableKeys = buildNullable<{
    "a-b": { value: string; next: "ref" };
    0: { value: boolean; next: "ref" };
    [cycleKey]: { value: number; next: "ref" };
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
declare const buildMixed: <M>() => { [K in keyof M]?: Resolve<M, K> | false | null };
export const mixedUnionCycle = buildMixed<{ Node: { value: number; next: "ref" } }>();
export const _recursive = 1;
export const factory = () => function self() { return self; };
export function captured<T>(value: T) {
    const node = { value, next: () => node, consume: (other: T) => node };
    return node;
}
export function nestedCaptured<T>(outer: T) {
    return <U>(inner: U) => {
        const node = {
            outer, inner, next: () => node,
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
type NonNullable<T> = "shadowed";
//// [/home/src/workspaces/project/producer/recursive-conditional-utils.ts] *new* 
type Recursive<T> = T extends Array<infer V> ? Recursive<V> : T;
export const f = <T>(): Recursive<T> => {
    return null!;
};
//// [/home/src/workspaces/project/producer/tsconfig.json] *new* 
{
					"compilerOptions": { "strict": true, "exactOptionalPropertyTypes": true, "composite": true, "outDir": "dist" }
				}

tsgo --build consumer
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mproducer/index.ts[0m:[93m3[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'anonymousThisReturn' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m3[0m export function anonymousThisReturn() {
[7m [0m [91m                ~~~~~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m92[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'mappedCycle' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m92[0m export const mappedCycle = build<{ Node: { value: number; next: "ref" } }>();
[7m  [0m [91m             ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m93[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'mappedCycleCopy' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m93[0m export const mappedCycleCopy = mappedCycle;
[7m  [0m [91m             ~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m94[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'nestedCycle' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m94[0m export const nestedCycle = { wrapped: build<{ Node: { value: string; next: "ref" } }>() };
[7m  [0m [91m             ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m96[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'keyedCycles' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m96[0m export const keyedCycles = build<{
[7m  [0m [91m             ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m101[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'sharedCycles' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m101[0m export const sharedCycles = { first: mappedCycle, second: mappedCycle };
[7m   [0m [91m             ~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m106[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'mutualCycle' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m106[0m export const mutualCycle = buildMutual<{
[7m   [0m [91m             ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m114[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'shadowedCycle' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m114[0m export const shadowedCycle = buildShadowed<{ Node: { value: number; next: "ref" } }>();
[7m   [0m [91m             ~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m116[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'optionalCycle' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m116[0m export const optionalCycle = buildOptional<{ Node: { value: number; next: "ref" } }>();
[7m   [0m [91m             ~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m118[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'nullableCycle' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m118[0m export const nullableCycle = buildNullable<{ Node: { value: string; next: "ref" } }>();
[7m   [0m [91m             ~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m120[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'mixedCycles' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m120[0m export const mixedCycles = wrap(optionalCycle);
[7m   [0m [91m             ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m121[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'sharedOptionalCycles' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m121[0m export const sharedOptionalCycles = { first: optionalCycle, second: optionalCycle };
[7m   [0m [91m             ~~~~~~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m122[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'nullableKeys' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m122[0m export const nullableKeys = buildNullable<{
[7m   [0m [91m             ~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m128[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'nullableRoot' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m128[0m export const nullableRoot = buildNullableRoot<{ Node: { value: number; next: "ref" } }>();
[7m   [0m [91m             ~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m130[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'optionalRoot' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m130[0m export const optionalRoot = buildOptionalRoot<{ Node: { value: string; next: "ref" } }>();
[7m   [0m [91m             ~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m135[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'nullableLinks' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m135[0m export const nullableLinks = buildNullableLinks<{ Node: { value: number; next: "ref" } }>();
[7m   [0m [91m             ~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m137[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'optionalNullableLinks' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m137[0m export const optionalNullableLinks = buildOptionalNullableLinks<{ Node: { value: number; next: "ref" } }>();
[7m   [0m [91m             ~~~~~~~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m142[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'nullableOptionalLinks' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m142[0m export const nullableOptionalLinks = buildNullableOptionalLinks<{ Node: { value: number; next: "ref" } }>();
[7m   [0m [91m             ~~~~~~~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m147[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'nullishLinks' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m147[0m export const nullishLinks = buildNullishLinks<{ Node: { value: number; next: "ref" } }>();
[7m   [0m [91m             ~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m149[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'mixedUnionCycle' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m149[0m export const mixedUnionCycle = buildMixed<{ Node: { value: number; next: "ref" } }>();
[7m   [0m [91m             ~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m151[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'factory' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m151[0m export const factory = () => function self() { return self; };
[7m   [0m [91m             ~~~~~~~[0m

[96mproducer/index.ts[0m:[93m152[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'captured' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m152[0m export function captured<T>(value: T) {
[7m   [0m [91m                ~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m156[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'nestedCaptured' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m156[0m export function nestedCaptured<T>(outer: T) {
[7m   [0m [91m                ~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m165[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'constrained' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m165[0m export function constrained<T extends { value: number }, K extends keyof T>(key: K) {
[7m   [0m [91m                ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m169[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'optionalCaptured' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m169[0m export function optionalCaptured<T>(value: T) {
[7m   [0m [91m                ~~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m173[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'annotatedCaptured' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m173[0m export function annotatedCaptured<T>(value: T) {
[7m   [0m [91m                ~~~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m177[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'recursiveTuple' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m177[0m export function recursiveTuple<T>(value: T) {
[7m   [0m [91m                ~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m181[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'inferredCaptured' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m181[0m export function inferredCaptured<T>() {
[7m   [0m [91m                ~~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m185[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'mappedCaptured' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m185[0m export function mappedCaptured<T>() {
[7m   [0m [91m                ~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m189[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'freshGeneric' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m189[0m export function freshGeneric<T>(unused: T) {
[7m   [0m [91m                ~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m193[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'mutualCaptured' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m193[0m export function mutualCaptured<T, U>(left: T, right: U) {
[7m   [0m [91m                ~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m200[0m:[93m5[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'make' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m200[0m     make<U extends T>(inner: U) {
[7m   [0m [91m    ~~~~[0m

[96mproducer/index.ts[0m:[93m205[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'covariantClass' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m205[0m export function covariantClass() {
[7m   [0m [91m                ~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m211[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'contravariantClass' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m211[0m export function contravariantClass() {
[7m   [0m [91m                ~~~~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m218[0m:[93m21[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'captured' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m218[0m     export function captured<T>(value: T) {
[7m   [0m [91m                    ~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m1[0m:[93m59[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m1[0m import { conditionalAliasCopy, anonymousThisReturn } from "../producer/dist/index.js";
[7m [0m [91m                                                          ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m2[0m:[93m88[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m2[0m import { arrow, expression, first, generic, objectReturn, tupleReturn, shadowed } from "../producer/dist/index.js";
[7m [0m [91m                                                                                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m3[0m:[93m64[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m3[0m import { object, method, accessor, tuple, array, nested } from "../producer/dist/index.js";
[7m [0m [91m                                                               ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m4[0m:[93m94[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m4[0m import { memberTuple, memberArray, quoted, numeric, key, computed, union, specialized } from "../producer/dist/index.js";
[7m [0m [91m                                                                                             ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m5[0m:[93m48[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m5[0m import { indexed, mapped, viaAnnotation } from "../producer/dist/index.js";
[7m [0m [91m                                               ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m6[0m:[93m86[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m6[0m import { nextLink, nextCallable, parenthesized, asserted, Methods, overloaded } from "../producer/dist/index.js";
[7m [0m [91m                                                                                     ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m7[0m:[93m51[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m7[0m import { hiddenAlias, siblingHiddenAliases } from "../producer/dist/index.js";
[7m [0m [91m                                                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m8[0m:[93m30[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m8[0m import { nestedNumber } from "../producer/dist/index.js";
[7m [0m [91m                             ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m9[0m:[93m124[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m9[0m import { mappedCycle, mappedCycleCopy, nestedCycle, cycleKey, keyedCycles, sharedCycles, mutualCycle, shadowedCycle } from "../producer/dist/index.js";
[7m [0m [91m                                                                                                                           ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m10[0m:[93m152[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m10[0m import { optionalCycle, nullableCycle, mixedCycles, sharedOptionalCycles, nullableKeys, nullableRoot, optionalRoot, nullableLinks, nullishLinks } from "../producer/dist/index.js";
[7m  [0m [91m                                                                                                                                                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m11[0m:[93m62[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m11[0m import { optionalNullableLinks, nullableOptionalLinks } from "../producer/dist/index.js";
[7m  [0m [91m                                                             ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m12[0m:[93m142[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m12[0m import { mixedUnionCycle, factory, captured, nestedCaptured, constrained, optionalCaptured, annotatedCaptured, recursiveTuple, Nested } from "../producer/dist/index.js";
[7m  [0m [91m                                                                                                                                             ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m13[0m:[93m80[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m13[0m import { inferredCaptured, mappedCaptured, freshGeneric, mutualCaptured } from "../producer/dist/index.js";
[7m  [0m [91m                                                                               ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m14[0m:[93m31[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m14[0m import { CapturedClass } from "../producer/dist/index.js";
[7m  [0m [91m                              ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m15[0m:[93m52[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m15[0m import { covariantClass, contravariantClass } from "../producer/dist/index.js";
[7m  [0m [91m                                                   ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 50 errors in 2 files.

Errors  Files
    15  consumer/index.ts[90m:1[0m
    35  producer/index.ts[90m:3[0m

//// [/home/src/tslibs/TS/Lib/lib.es2026.full.d.ts] *Lib*
/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }
interface ReadonlyArray<T> {}
interface SymbolConstructor {
    (desc?: string | number): symbol;
    for(name: string): symbol;
    readonly toStringTag: symbol;
}
declare var Symbol: SymbolConstructor;
interface Symbol {
    readonly [Symbol.toStringTag]: string;
}
declare const console: { log(msg: any): void; };
//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":["./index.ts"],"semanticErrors":true}
//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./index.ts"
      ],
      "original": "./index.ts"
    }
  ],
  "size": 71,
  "semanticErrors": true
}
//// [/home/src/workspaces/project/producer/dist/index.js] *new* 
import { f } from "./recursive-conditional-utils";
export const conditionalAliasCopy = f;
export function anonymousThisReturn() {
    return {
        relyingOnThis() {
            return this;
        },
    };
}
export const arrow = () => arrow;
export const expression = function self() { return self; };
export const first = () => second;
export const second = () => first;
export const generic = (value) => generic;
export const objectReturn = () => ({ call: objectReturn });
export const tupleReturn = () => [tupleReturn];
export const shadowed = function self(shadowed) { return self; };
export const object = { value: 1, next: () => object };
export const method = { value: 1, next() { return method; } };
export const accessor = { value: 1, get next() { return accessor; } };
export const tuple = [() => tuple];
export const array = [() => array];
export const nested = { inner: { next() { return nested.inner; } } };
export const memberTuple = [function self() { return self; }];
export const memberArray = [function self() { return self; }];
export const quoted = { "a-b": function self() { return self; } };
export const numeric = { 0: function self() { return self; } };
export const key = Symbol();
export const computed = { [key]: function self() { return self; } };
export const union = true ? { next: () => union } : undefined;
function create(value) {
    const result = { value, next: () => result };
    return result;
}
export const specialized = create("text");
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
export const nextLink = link.next;
export const nextCallable = callable(1);
function createHidden(value) {
    return null;
}
export const hiddenAlias = createHidden("text");
export const siblingHiddenAliases = { first: hiddenAlias, second: hiddenAlias };
export const parenthesized = (function self() { return self; });
export const asserted = (function self() { return self; });
export class Methods {
    static recur() { return Methods.recur; }
    static "a-b"() { return Methods["a-b"]; }
    static [key]() { return Methods[key]; }
    recur() { return this.recur; }
}
export function overloaded(value) { return overloaded; }
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
export const mappedCycle = build();
export const mappedCycleCopy = mappedCycle;
export const nestedCycle = { wrapped: build() };
export const cycleKey = Symbol();
export const keyedCycles = build();
export const sharedCycles = { first: mappedCycle, second: mappedCycle };
export const mutualCycle = buildMutual();
export const shadowedCycle = buildShadowed();
export const optionalCycle = buildOptional();
export const nullableCycle = buildNullable();
export const mixedCycles = wrap(optionalCycle);
export const sharedOptionalCycles = { first: optionalCycle, second: optionalCycle };
export const nullableKeys = buildNullable();
export const nullableRoot = buildNullableRoot();
export const optionalRoot = buildOptionalRoot();
export const nullableLinks = buildNullableLinks();
export const optionalNullableLinks = buildOptionalNullableLinks();
export const nullableOptionalLinks = buildNullableOptionalLinks();
export const nullishLinks = buildNullishLinks();
export const mixedUnionCycle = buildMixed();
export const _recursive = 1;
export const factory = () => function self() { return self; };
export function captured(value) {
    const node = { value, next: () => node, consume: (other) => node };
    return node;
}
export function nestedCaptured(outer) {
    return (inner) => {
        const node = {
            outer, inner, next: () => node,
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

//// [/home/src/workspaces/project/producer/dist/recursive-conditional-utils.d.ts] *new* 
type Recursive<T> = T extends Array<infer V> ? Recursive<V> : T;
export declare const f: <T>() => Recursive<T>;
export {};

//// [/home/src/workspaces/project/producer/dist/recursive-conditional-utils.js] *new* 
export const f = () => {
    return null;
};

//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.es2026.full.d.ts","../recursive-conditional-utils.ts","../index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"5f612a8da522ce136561c99ba028217b-type Recursive<T> = T extends Array<infer V> ? Recursive<V> : T;\nexport const f = <T>(): Recursive<T> => {\n    return null!;\n};","signature":"b7e553848a0db56da7124d58387f207a-type Recursive<T> = T extends Array<infer V> ? Recursive<V> : T;\nexport declare const f: <T>() => Recursive<T>;\nexport {};\n","impliedNodeFormat":1},"647cf2affc61d839035c9d49279879e5-import { f } from \"./recursive-conditional-utils\";\nexport const conditionalAliasCopy = f;\nexport function anonymousThisReturn() {\n    return {\n        relyingOnThis() {\n            return this;\n        },\n    };\n}\nexport const arrow = () => arrow;\nexport const expression = function self() { return self; };\nexport const first = () => second;\nexport const second = () => first;\nexport const generic = <T>(value: T) => generic;\nexport const objectReturn = () => ({ call: objectReturn });\nexport const tupleReturn = () => [tupleReturn] as const;\nexport const shadowed = function self(shadowed: number) { return self; };\nexport const object = { value: 1, next: () => object };\nexport const method = { value: 1, next() { return method; } };\nexport const accessor = { value: 1, get next() { return accessor; } };\nexport const tuple = [() => tuple] as const;\nexport const array = [() => array];\nexport const nested = { inner: { next() { return nested.inner; } } };\nexport const memberTuple = [function self() { return self; }] as const;\nexport const memberArray = [function self() { return self; }];\nexport const quoted = { \"a-b\": function self() { return self; } };\nexport const numeric = { 0: function self() { return self; } };\nexport const key = Symbol();\nexport const computed = { [key]: function self() { return self; } };\nexport const union = true as boolean ? { next: () => union } : undefined;\nfunction create<T>(value: T) {\n    const result = { value, next: () => result };\n    return result;\n}\nexport const specialized = create(\"text\");\nfunction createIndexed() {\n    const value: { [key: string]: typeof value } = {};\n    return value;\n}\nexport const indexed = createIndexed();\nfunction createMapped<T>() {\n    const value: { [K in keyof T]: typeof value } = null!;\n    return value;\n}\nexport const mapped = createMapped<{ next: unknown }>();\nfunction createAnnotated<T>(value: T) {\n    const node: { value: T; next: () => typeof node } = { value, next: () => node };\n    return node;\n}\nexport const viaAnnotation = createAnnotated(\"text\");\nexport type Link<T> = { value: T; next: Link<T> };\nexport type Callable<T> = { (value: T): Callable<T>; link: Link<T> };\nexport declare const link: Link<string>;\nexport declare const callable: Callable<number>;\nexport const nextLink = link.next;\nexport const nextCallable = callable(1);\nfunction createHidden<T>(value: T) {\n    type Hidden = { value: T; next: Hidden };\n    return null! as Hidden;\n}\nexport const hiddenAlias = createHidden(\"text\");\nexport const siblingHiddenAliases = { first: hiddenAlias, second: hiddenAlias };\nexport const parenthesized = (function self() { return self; });\nexport const asserted = (function self() { return self; }) satisfies () => unknown;\nexport class Methods {\n    static recur() { return Methods.recur; }\n    static \"a-b\"() { return Methods[\"a-b\"]; }\n    static [key]() { return Methods[key]; }\n    recur() { return this.recur; }\n}\nexport function overloaded(value: string): typeof overloaded;\nexport function overloaded(value: number): typeof overloaded;\nexport function overloaded(value: string | number) { return overloaded; }\nexport const nestedOwner = {\n    make<T>(outer: T) {\n        return {\n            nested<U>(inner: U) { return { outer, inner, owner: nestedOwner }; },\n            constrained<U extends T = T>(inner: U) { return { outer, inner, owner: nestedOwner }; },\n            copied<U>(inner: U): { outer: T; inner: U; owner: typeof nestedOwner } {\n                return { outer, inner, owner: nestedOwner };\n            },\n            rest<U>(...values: [U]) { return { outer, inner: values[0], owner: nestedOwner }; },\n        };\n    },\n};\nexport const nestedNumber = nestedOwner.make(1);\ntype Show<T> = { [K in keyof T]: T[K] } & unknown;\ntype Resolve<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? Resolve<M, K> : M[K][P];\n}>;\ndeclare const build: <M>() => { [K in keyof M]: Resolve<M, K> };\nexport const mappedCycle = build<{ Node: { value: number; next: \"ref\" } }>();\nexport const mappedCycleCopy = mappedCycle;\nexport const nestedCycle = { wrapped: build<{ Node: { value: string; next: \"ref\" } }>() };\nexport const cycleKey = Symbol();\nexport const keyedCycles = build<{\n    \"a-b\": { value: string; next: \"ref\" };\n    0: { value: boolean; next: \"ref\" };\n    [cycleKey]: { value: number; next: \"ref\" };\n}>();\nexport const sharedCycles = { first: mappedCycle, second: mappedCycle };\ntype ResolveMutual<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends { ref: infer R extends keyof M } ? ResolveMutual<M, R> : M[K][P];\n}>;\ndeclare const buildMutual: <M>() => { [K in keyof M]: ResolveMutual<M, K> };\nexport const mutualCycle = buildMutual<{\n    First: { value: number; next: { ref: \"Second\" } };\n    Second: { value: string; next: { ref: \"First\" } };\n}>();\ntype ResolveShadowed<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? <T>(shadowedCycle: T) => ResolveShadowed<M, K> : M[K][P];\n}>;\ndeclare const buildShadowed: <M>() => { [K in keyof M]: ResolveShadowed<M, K> };\nexport const shadowedCycle = buildShadowed<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildOptional: <M>() => { [K in keyof M]?: Resolve<M, K> };\nexport const optionalCycle = buildOptional<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildNullable: <M>() => { [K in keyof M]: Resolve<M, K> | null };\nexport const nullableCycle = buildNullable<{ Node: { value: string; next: \"ref\" } }>();\ndeclare const wrap: <T>(value: T) => { required: T; optional?: T | null };\nexport const mixedCycles = wrap(optionalCycle);\nexport const sharedOptionalCycles = { first: optionalCycle, second: optionalCycle };\nexport const nullableKeys = buildNullable<{\n    \"a-b\": { value: string; next: \"ref\" };\n    0: { value: boolean; next: \"ref\" };\n    [cycleKey]: { value: number; next: \"ref\" };\n}>();\ndeclare const buildNullableRoot: <M>() => Resolve<M, keyof M> | null;\nexport const nullableRoot = buildNullableRoot<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildOptionalRoot: <M>() => Resolve<M, keyof M> | undefined;\nexport const optionalRoot = buildOptionalRoot<{ Node: { value: string; next: \"ref\" } }>();\ntype ResolveNullable<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? ResolveNullable<M, K> | null : M[K][P];\n}>;\ndeclare const buildNullableLinks: <M>() => { [K in keyof M]: ResolveNullable<M, K> | null };\nexport const nullableLinks = buildNullableLinks<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildOptionalNullableLinks: <M>() => { [K in keyof M]?: ResolveNullable<M, K> | null };\nexport const optionalNullableLinks = buildOptionalNullableLinks<{ Node: { value: number; next: \"ref\" } }>();\ntype ResolveOptional<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? ResolveOptional<M, K> | undefined : M[K][P];\n}>;\ndeclare const buildNullableOptionalLinks: <M>() => { [K in keyof M]: ResolveOptional<M, K> | null };\nexport const nullableOptionalLinks = buildNullableOptionalLinks<{ Node: { value: number; next: \"ref\" } }>();\ntype ResolveNullish<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? ResolveNullish<M, K> | null | undefined : M[K][P];\n}>;\ndeclare const buildNullishLinks: <M>() => { [K in keyof M]?: ResolveNullish<M, K> | null };\nexport const nullishLinks = buildNullishLinks<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildMixed: <M>() => { [K in keyof M]?: Resolve<M, K> | false | null };\nexport const mixedUnionCycle = buildMixed<{ Node: { value: number; next: \"ref\" } }>();\nexport const _recursive = 1;\nexport const factory = () => function self() { return self; };\nexport function captured<T>(value: T) {\n    const node = { value, next: () => node, consume: (other: T) => node };\n    return node;\n}\nexport function nestedCaptured<T>(outer: T) {\n    return <U>(inner: U) => {\n        const node = {\n            outer, inner, next: () => node,\n            shadow: <T>(value: T) => ({ outer, inner, value, next: node }),\n        };\n        return node;\n    };\n}\nexport function constrained<T extends { value: number }, K extends keyof T>(key: K) {\n    const node = { value: null! as T[K], next: () => node };\n    return node;\n}\nexport function optionalCaptured<T>(value: T) {\n    type Node = { value: T; next: Node };\n    return null! as { node?: Node | false | null };\n}\nexport function annotatedCaptured<T>(value: T) {\n    const node: { value: typeof value; next: typeof node } = { value, next: null! };\n    return node;\n}\nexport function recursiveTuple<T>(value: T) {\n    type Tuple = readonly [T, Tuple];\n    return null! as Tuple;\n}\nexport function inferredCaptured<T>() {\n    type Node<V> = { value: V; next: Node<V> };\n    return null! as (T extends () => infer U ? Node<U> : never);\n}\nexport function mappedCaptured<T>() {\n    type Node = { [K in keyof T]: { value: T[K]; next: Node } };\n    return null! as Node;\n}\nexport function freshGeneric<T>(unused: T) {\n    const recur = <U>(value: U) => recur;\n    return recur;\n}\nexport function mutualCaptured<T, U>(left: T, right: U) {\n    type Left = { left: T; next: Right };\n    type Right = { right: U; self: Right; next: Left };\n    return { left: null! as Left, right: null! as Right };\n}\nexport class CapturedClass<T> {\n    constructor(public value: T) {}\n    make<U extends T>(inner: U) {\n        const node = { outer: this.value, inner, next: () => node };\n        return node;\n    }\n}\nexport function covariantClass() {\n    return class Node<out T> {\n        value!: T;\n        next(): Node<T> { return this; }\n    };\n}\nexport function contravariantClass() {\n    return class Node<in T> {\n        consume!: (value: T) => void;\n        next(): Node<T> { return this; }\n    };\n}\nexport namespace Nested {\n    export function captured<T>(value: T) {\n        const node = { value, next: () => node };\n        return node;\n    }\n}\ntype NonNullable<T> = \"shadowed\";"],"fileIdsList":[[2]],"options":{"composite":true,"exactOptionalPropertyTypes":true,"outDir":"./","strict":true},"referencedMap":[[3,1]],"emitDiagnosticsPerFile":[[3,[{"pos":106,"end":125,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["anonymousThisReturn"]},{"pos":3949,"end":3960,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["mappedCycle"]},{"pos":4027,"end":4042,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["mappedCycleCopy"]},{"pos":4071,"end":4082,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["nestedCycle"]},{"pos":4196,"end":4207,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["keyedCycles"]},{"pos":4368,"end":4380,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["sharedCycles"]},{"pos":4677,"end":4688,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["mutualCycle"]},{"pos":5076,"end":5089,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["shadowedCycle"]},{"pos":5238,"end":5251,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["optionalCycle"]},{"pos":5406,"end":5419,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["nullableCycle"]},{"pos":5569,"end":5580,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["mixedCycles"]},{"pos":5617,"end":5637,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["sharedOptionalCycles"]},{"pos":5702,"end":5714,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["nullableKeys"]},{"pos":5953,"end":5965,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["nullableRoot"]},{"pos":6119,"end":6131,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["optionalRoot"]},{"pos":6446,"end":6459,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["nullableLinks"]},{"pos":6641,"end":6662,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["optionalNullableLinks"]},{"pos":6999,"end":7020,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["nullableOptionalLinks"]},{"pos":7353,"end":7365,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["nullishLinks"]},{"pos":7530,"end":7545,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["mixedUnionCycle"]},{"pos":7646,"end":7653,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["factory"]},{"pos":7712,"end":7720,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["captured"]},{"pos":7846,"end":7860,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["nestedCaptured"]},{"pos":8106,"end":8117,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["constrained"]},{"pos":8272,"end":8288,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["optionalCaptured"]},{"pos":8416,"end":8433,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["annotatedCaptured"]},{"pos":8569,"end":8583,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["recursiveTuple"]},{"pos":8682,"end":8698,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["inferredCaptured"]},{"pos":8837,"end":8851,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["mappedCaptured"]},{"pos":8968,"end":8980,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["freshGeneric"]},{"pos":9075,"end":9089,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["mutualCaptured"]},{"pos":9348,"end":9352,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["make"]},{"pos":9492,"end":9506,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["covariantClass"]},{"pos":9627,"end":9645,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["contravariantClass"]},{"pos":9814,"end":9822,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["captured"]}]]],"latestChangedDtsFile":"./recursive-conditional-utils.d.ts","emitSignatures":[3]}
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../recursive-conditional-utils.ts",
        "../index.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.es2026.full.d.ts",
    "../recursive-conditional-utils.ts",
    "../index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2026.full.d.ts",
      "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../recursive-conditional-utils.ts",
      "version": "5f612a8da522ce136561c99ba028217b-type Recursive<T> = T extends Array<infer V> ? Recursive<V> : T;\nexport const f = <T>(): Recursive<T> => {\n    return null!;\n};",
      "signature": "b7e553848a0db56da7124d58387f207a-type Recursive<T> = T extends Array<infer V> ? Recursive<V> : T;\nexport declare const f: <T>() => Recursive<T>;\nexport {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "5f612a8da522ce136561c99ba028217b-type Recursive<T> = T extends Array<infer V> ? Recursive<V> : T;\nexport const f = <T>(): Recursive<T> => {\n    return null!;\n};",
        "signature": "b7e553848a0db56da7124d58387f207a-type Recursive<T> = T extends Array<infer V> ? Recursive<V> : T;\nexport declare const f: <T>() => Recursive<T>;\nexport {};\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../index.ts",
      "version": "647cf2affc61d839035c9d49279879e5-import { f } from \"./recursive-conditional-utils\";\nexport const conditionalAliasCopy = f;\nexport function anonymousThisReturn() {\n    return {\n        relyingOnThis() {\n            return this;\n        },\n    };\n}\nexport const arrow = () => arrow;\nexport const expression = function self() { return self; };\nexport const first = () => second;\nexport const second = () => first;\nexport const generic = <T>(value: T) => generic;\nexport const objectReturn = () => ({ call: objectReturn });\nexport const tupleReturn = () => [tupleReturn] as const;\nexport const shadowed = function self(shadowed: number) { return self; };\nexport const object = { value: 1, next: () => object };\nexport const method = { value: 1, next() { return method; } };\nexport const accessor = { value: 1, get next() { return accessor; } };\nexport const tuple = [() => tuple] as const;\nexport const array = [() => array];\nexport const nested = { inner: { next() { return nested.inner; } } };\nexport const memberTuple = [function self() { return self; }] as const;\nexport const memberArray = [function self() { return self; }];\nexport const quoted = { \"a-b\": function self() { return self; } };\nexport const numeric = { 0: function self() { return self; } };\nexport const key = Symbol();\nexport const computed = { [key]: function self() { return self; } };\nexport const union = true as boolean ? { next: () => union } : undefined;\nfunction create<T>(value: T) {\n    const result = { value, next: () => result };\n    return result;\n}\nexport const specialized = create(\"text\");\nfunction createIndexed() {\n    const value: { [key: string]: typeof value } = {};\n    return value;\n}\nexport const indexed = createIndexed();\nfunction createMapped<T>() {\n    const value: { [K in keyof T]: typeof value } = null!;\n    return value;\n}\nexport const mapped = createMapped<{ next: unknown }>();\nfunction createAnnotated<T>(value: T) {\n    const node: { value: T; next: () => typeof node } = { value, next: () => node };\n    return node;\n}\nexport const viaAnnotation = createAnnotated(\"text\");\nexport type Link<T> = { value: T; next: Link<T> };\nexport type Callable<T> = { (value: T): Callable<T>; link: Link<T> };\nexport declare const link: Link<string>;\nexport declare const callable: Callable<number>;\nexport const nextLink = link.next;\nexport const nextCallable = callable(1);\nfunction createHidden<T>(value: T) {\n    type Hidden = { value: T; next: Hidden };\n    return null! as Hidden;\n}\nexport const hiddenAlias = createHidden(\"text\");\nexport const siblingHiddenAliases = { first: hiddenAlias, second: hiddenAlias };\nexport const parenthesized = (function self() { return self; });\nexport const asserted = (function self() { return self; }) satisfies () => unknown;\nexport class Methods {\n    static recur() { return Methods.recur; }\n    static \"a-b\"() { return Methods[\"a-b\"]; }\n    static [key]() { return Methods[key]; }\n    recur() { return this.recur; }\n}\nexport function overloaded(value: string): typeof overloaded;\nexport function overloaded(value: number): typeof overloaded;\nexport function overloaded(value: string | number) { return overloaded; }\nexport const nestedOwner = {\n    make<T>(outer: T) {\n        return {\n            nested<U>(inner: U) { return { outer, inner, owner: nestedOwner }; },\n            constrained<U extends T = T>(inner: U) { return { outer, inner, owner: nestedOwner }; },\n            copied<U>(inner: U): { outer: T; inner: U; owner: typeof nestedOwner } {\n                return { outer, inner, owner: nestedOwner };\n            },\n            rest<U>(...values: [U]) { return { outer, inner: values[0], owner: nestedOwner }; },\n        };\n    },\n};\nexport const nestedNumber = nestedOwner.make(1);\ntype Show<T> = { [K in keyof T]: T[K] } & unknown;\ntype Resolve<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? Resolve<M, K> : M[K][P];\n}>;\ndeclare const build: <M>() => { [K in keyof M]: Resolve<M, K> };\nexport const mappedCycle = build<{ Node: { value: number; next: \"ref\" } }>();\nexport const mappedCycleCopy = mappedCycle;\nexport const nestedCycle = { wrapped: build<{ Node: { value: string; next: \"ref\" } }>() };\nexport const cycleKey = Symbol();\nexport const keyedCycles = build<{\n    \"a-b\": { value: string; next: \"ref\" };\n    0: { value: boolean; next: \"ref\" };\n    [cycleKey]: { value: number; next: \"ref\" };\n}>();\nexport const sharedCycles = { first: mappedCycle, second: mappedCycle };\ntype ResolveMutual<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends { ref: infer R extends keyof M } ? ResolveMutual<M, R> : M[K][P];\n}>;\ndeclare const buildMutual: <M>() => { [K in keyof M]: ResolveMutual<M, K> };\nexport const mutualCycle = buildMutual<{\n    First: { value: number; next: { ref: \"Second\" } };\n    Second: { value: string; next: { ref: \"First\" } };\n}>();\ntype ResolveShadowed<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? <T>(shadowedCycle: T) => ResolveShadowed<M, K> : M[K][P];\n}>;\ndeclare const buildShadowed: <M>() => { [K in keyof M]: ResolveShadowed<M, K> };\nexport const shadowedCycle = buildShadowed<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildOptional: <M>() => { [K in keyof M]?: Resolve<M, K> };\nexport const optionalCycle = buildOptional<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildNullable: <M>() => { [K in keyof M]: Resolve<M, K> | null };\nexport const nullableCycle = buildNullable<{ Node: { value: string; next: \"ref\" } }>();\ndeclare const wrap: <T>(value: T) => { required: T; optional?: T | null };\nexport const mixedCycles = wrap(optionalCycle);\nexport const sharedOptionalCycles = { first: optionalCycle, second: optionalCycle };\nexport const nullableKeys = buildNullable<{\n    \"a-b\": { value: string; next: \"ref\" };\n    0: { value: boolean; next: \"ref\" };\n    [cycleKey]: { value: number; next: \"ref\" };\n}>();\ndeclare const buildNullableRoot: <M>() => Resolve<M, keyof M> | null;\nexport const nullableRoot = buildNullableRoot<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildOptionalRoot: <M>() => Resolve<M, keyof M> | undefined;\nexport const optionalRoot = buildOptionalRoot<{ Node: { value: string; next: \"ref\" } }>();\ntype ResolveNullable<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? ResolveNullable<M, K> | null : M[K][P];\n}>;\ndeclare const buildNullableLinks: <M>() => { [K in keyof M]: ResolveNullable<M, K> | null };\nexport const nullableLinks = buildNullableLinks<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildOptionalNullableLinks: <M>() => { [K in keyof M]?: ResolveNullable<M, K> | null };\nexport const optionalNullableLinks = buildOptionalNullableLinks<{ Node: { value: number; next: \"ref\" } }>();\ntype ResolveOptional<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? ResolveOptional<M, K> | undefined : M[K][P];\n}>;\ndeclare const buildNullableOptionalLinks: <M>() => { [K in keyof M]: ResolveOptional<M, K> | null };\nexport const nullableOptionalLinks = buildNullableOptionalLinks<{ Node: { value: number; next: \"ref\" } }>();\ntype ResolveNullish<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? ResolveNullish<M, K> | null | undefined : M[K][P];\n}>;\ndeclare const buildNullishLinks: <M>() => { [K in keyof M]?: ResolveNullish<M, K> | null };\nexport const nullishLinks = buildNullishLinks<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildMixed: <M>() => { [K in keyof M]?: Resolve<M, K> | false | null };\nexport const mixedUnionCycle = buildMixed<{ Node: { value: number; next: \"ref\" } }>();\nexport const _recursive = 1;\nexport const factory = () => function self() { return self; };\nexport function captured<T>(value: T) {\n    const node = { value, next: () => node, consume: (other: T) => node };\n    return node;\n}\nexport function nestedCaptured<T>(outer: T) {\n    return <U>(inner: U) => {\n        const node = {\n            outer, inner, next: () => node,\n            shadow: <T>(value: T) => ({ outer, inner, value, next: node }),\n        };\n        return node;\n    };\n}\nexport function constrained<T extends { value: number }, K extends keyof T>(key: K) {\n    const node = { value: null! as T[K], next: () => node };\n    return node;\n}\nexport function optionalCaptured<T>(value: T) {\n    type Node = { value: T; next: Node };\n    return null! as { node?: Node | false | null };\n}\nexport function annotatedCaptured<T>(value: T) {\n    const node: { value: typeof value; next: typeof node } = { value, next: null! };\n    return node;\n}\nexport function recursiveTuple<T>(value: T) {\n    type Tuple = readonly [T, Tuple];\n    return null! as Tuple;\n}\nexport function inferredCaptured<T>() {\n    type Node<V> = { value: V; next: Node<V> };\n    return null! as (T extends () => infer U ? Node<U> : never);\n}\nexport function mappedCaptured<T>() {\n    type Node = { [K in keyof T]: { value: T[K]; next: Node } };\n    return null! as Node;\n}\nexport function freshGeneric<T>(unused: T) {\n    const recur = <U>(value: U) => recur;\n    return recur;\n}\nexport function mutualCaptured<T, U>(left: T, right: U) {\n    type Left = { left: T; next: Right };\n    type Right = { right: U; self: Right; next: Left };\n    return { left: null! as Left, right: null! as Right };\n}\nexport class CapturedClass<T> {\n    constructor(public value: T) {}\n    make<U extends T>(inner: U) {\n        const node = { outer: this.value, inner, next: () => node };\n        return node;\n    }\n}\nexport function covariantClass() {\n    return class Node<out T> {\n        value!: T;\n        next(): Node<T> { return this; }\n    };\n}\nexport function contravariantClass() {\n    return class Node<in T> {\n        consume!: (value: T) => void;\n        next(): Node<T> { return this; }\n    };\n}\nexport namespace Nested {\n    export function captured<T>(value: T) {\n        const node = { value, next: () => node };\n        return node;\n    }\n}\ntype NonNullable<T> = \"shadowed\";",
      "signature": "647cf2affc61d839035c9d49279879e5-import { f } from \"./recursive-conditional-utils\";\nexport const conditionalAliasCopy = f;\nexport function anonymousThisReturn() {\n    return {\n        relyingOnThis() {\n            return this;\n        },\n    };\n}\nexport const arrow = () => arrow;\nexport const expression = function self() { return self; };\nexport const first = () => second;\nexport const second = () => first;\nexport const generic = <T>(value: T) => generic;\nexport const objectReturn = () => ({ call: objectReturn });\nexport const tupleReturn = () => [tupleReturn] as const;\nexport const shadowed = function self(shadowed: number) { return self; };\nexport const object = { value: 1, next: () => object };\nexport const method = { value: 1, next() { return method; } };\nexport const accessor = { value: 1, get next() { return accessor; } };\nexport const tuple = [() => tuple] as const;\nexport const array = [() => array];\nexport const nested = { inner: { next() { return nested.inner; } } };\nexport const memberTuple = [function self() { return self; }] as const;\nexport const memberArray = [function self() { return self; }];\nexport const quoted = { \"a-b\": function self() { return self; } };\nexport const numeric = { 0: function self() { return self; } };\nexport const key = Symbol();\nexport const computed = { [key]: function self() { return self; } };\nexport const union = true as boolean ? { next: () => union } : undefined;\nfunction create<T>(value: T) {\n    const result = { value, next: () => result };\n    return result;\n}\nexport const specialized = create(\"text\");\nfunction createIndexed() {\n    const value: { [key: string]: typeof value } = {};\n    return value;\n}\nexport const indexed = createIndexed();\nfunction createMapped<T>() {\n    const value: { [K in keyof T]: typeof value } = null!;\n    return value;\n}\nexport const mapped = createMapped<{ next: unknown }>();\nfunction createAnnotated<T>(value: T) {\n    const node: { value: T; next: () => typeof node } = { value, next: () => node };\n    return node;\n}\nexport const viaAnnotation = createAnnotated(\"text\");\nexport type Link<T> = { value: T; next: Link<T> };\nexport type Callable<T> = { (value: T): Callable<T>; link: Link<T> };\nexport declare const link: Link<string>;\nexport declare const callable: Callable<number>;\nexport const nextLink = link.next;\nexport const nextCallable = callable(1);\nfunction createHidden<T>(value: T) {\n    type Hidden = { value: T; next: Hidden };\n    return null! as Hidden;\n}\nexport const hiddenAlias = createHidden(\"text\");\nexport const siblingHiddenAliases = { first: hiddenAlias, second: hiddenAlias };\nexport const parenthesized = (function self() { return self; });\nexport const asserted = (function self() { return self; }) satisfies () => unknown;\nexport class Methods {\n    static recur() { return Methods.recur; }\n    static \"a-b\"() { return Methods[\"a-b\"]; }\n    static [key]() { return Methods[key]; }\n    recur() { return this.recur; }\n}\nexport function overloaded(value: string): typeof overloaded;\nexport function overloaded(value: number): typeof overloaded;\nexport function overloaded(value: string | number) { return overloaded; }\nexport const nestedOwner = {\n    make<T>(outer: T) {\n        return {\n            nested<U>(inner: U) { return { outer, inner, owner: nestedOwner }; },\n            constrained<U extends T = T>(inner: U) { return { outer, inner, owner: nestedOwner }; },\n            copied<U>(inner: U): { outer: T; inner: U; owner: typeof nestedOwner } {\n                return { outer, inner, owner: nestedOwner };\n            },\n            rest<U>(...values: [U]) { return { outer, inner: values[0], owner: nestedOwner }; },\n        };\n    },\n};\nexport const nestedNumber = nestedOwner.make(1);\ntype Show<T> = { [K in keyof T]: T[K] } & unknown;\ntype Resolve<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? Resolve<M, K> : M[K][P];\n}>;\ndeclare const build: <M>() => { [K in keyof M]: Resolve<M, K> };\nexport const mappedCycle = build<{ Node: { value: number; next: \"ref\" } }>();\nexport const mappedCycleCopy = mappedCycle;\nexport const nestedCycle = { wrapped: build<{ Node: { value: string; next: \"ref\" } }>() };\nexport const cycleKey = Symbol();\nexport const keyedCycles = build<{\n    \"a-b\": { value: string; next: \"ref\" };\n    0: { value: boolean; next: \"ref\" };\n    [cycleKey]: { value: number; next: \"ref\" };\n}>();\nexport const sharedCycles = { first: mappedCycle, second: mappedCycle };\ntype ResolveMutual<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends { ref: infer R extends keyof M } ? ResolveMutual<M, R> : M[K][P];\n}>;\ndeclare const buildMutual: <M>() => { [K in keyof M]: ResolveMutual<M, K> };\nexport const mutualCycle = buildMutual<{\n    First: { value: number; next: { ref: \"Second\" } };\n    Second: { value: string; next: { ref: \"First\" } };\n}>();\ntype ResolveShadowed<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? <T>(shadowedCycle: T) => ResolveShadowed<M, K> : M[K][P];\n}>;\ndeclare const buildShadowed: <M>() => { [K in keyof M]: ResolveShadowed<M, K> };\nexport const shadowedCycle = buildShadowed<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildOptional: <M>() => { [K in keyof M]?: Resolve<M, K> };\nexport const optionalCycle = buildOptional<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildNullable: <M>() => { [K in keyof M]: Resolve<M, K> | null };\nexport const nullableCycle = buildNullable<{ Node: { value: string; next: \"ref\" } }>();\ndeclare const wrap: <T>(value: T) => { required: T; optional?: T | null };\nexport const mixedCycles = wrap(optionalCycle);\nexport const sharedOptionalCycles = { first: optionalCycle, second: optionalCycle };\nexport const nullableKeys = buildNullable<{\n    \"a-b\": { value: string; next: \"ref\" };\n    0: { value: boolean; next: \"ref\" };\n    [cycleKey]: { value: number; next: \"ref\" };\n}>();\ndeclare const buildNullableRoot: <M>() => Resolve<M, keyof M> | null;\nexport const nullableRoot = buildNullableRoot<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildOptionalRoot: <M>() => Resolve<M, keyof M> | undefined;\nexport const optionalRoot = buildOptionalRoot<{ Node: { value: string; next: \"ref\" } }>();\ntype ResolveNullable<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? ResolveNullable<M, K> | null : M[K][P];\n}>;\ndeclare const buildNullableLinks: <M>() => { [K in keyof M]: ResolveNullable<M, K> | null };\nexport const nullableLinks = buildNullableLinks<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildOptionalNullableLinks: <M>() => { [K in keyof M]?: ResolveNullable<M, K> | null };\nexport const optionalNullableLinks = buildOptionalNullableLinks<{ Node: { value: number; next: \"ref\" } }>();\ntype ResolveOptional<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? ResolveOptional<M, K> | undefined : M[K][P];\n}>;\ndeclare const buildNullableOptionalLinks: <M>() => { [K in keyof M]: ResolveOptional<M, K> | null };\nexport const nullableOptionalLinks = buildNullableOptionalLinks<{ Node: { value: number; next: \"ref\" } }>();\ntype ResolveNullish<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? ResolveNullish<M, K> | null | undefined : M[K][P];\n}>;\ndeclare const buildNullishLinks: <M>() => { [K in keyof M]?: ResolveNullish<M, K> | null };\nexport const nullishLinks = buildNullishLinks<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildMixed: <M>() => { [K in keyof M]?: Resolve<M, K> | false | null };\nexport const mixedUnionCycle = buildMixed<{ Node: { value: number; next: \"ref\" } }>();\nexport const _recursive = 1;\nexport const factory = () => function self() { return self; };\nexport function captured<T>(value: T) {\n    const node = { value, next: () => node, consume: (other: T) => node };\n    return node;\n}\nexport function nestedCaptured<T>(outer: T) {\n    return <U>(inner: U) => {\n        const node = {\n            outer, inner, next: () => node,\n            shadow: <T>(value: T) => ({ outer, inner, value, next: node }),\n        };\n        return node;\n    };\n}\nexport function constrained<T extends { value: number }, K extends keyof T>(key: K) {\n    const node = { value: null! as T[K], next: () => node };\n    return node;\n}\nexport function optionalCaptured<T>(value: T) {\n    type Node = { value: T; next: Node };\n    return null! as { node?: Node | false | null };\n}\nexport function annotatedCaptured<T>(value: T) {\n    const node: { value: typeof value; next: typeof node } = { value, next: null! };\n    return node;\n}\nexport function recursiveTuple<T>(value: T) {\n    type Tuple = readonly [T, Tuple];\n    return null! as Tuple;\n}\nexport function inferredCaptured<T>() {\n    type Node<V> = { value: V; next: Node<V> };\n    return null! as (T extends () => infer U ? Node<U> : never);\n}\nexport function mappedCaptured<T>() {\n    type Node = { [K in keyof T]: { value: T[K]; next: Node } };\n    return null! as Node;\n}\nexport function freshGeneric<T>(unused: T) {\n    const recur = <U>(value: U) => recur;\n    return recur;\n}\nexport function mutualCaptured<T, U>(left: T, right: U) {\n    type Left = { left: T; next: Right };\n    type Right = { right: U; self: Right; next: Left };\n    return { left: null! as Left, right: null! as Right };\n}\nexport class CapturedClass<T> {\n    constructor(public value: T) {}\n    make<U extends T>(inner: U) {\n        const node = { outer: this.value, inner, next: () => node };\n        return node;\n    }\n}\nexport function covariantClass() {\n    return class Node<out T> {\n        value!: T;\n        next(): Node<T> { return this; }\n    };\n}\nexport function contravariantClass() {\n    return class Node<in T> {\n        consume!: (value: T) => void;\n        next(): Node<T> { return this; }\n    };\n}\nexport namespace Nested {\n    export function captured<T>(value: T) {\n        const node = { value, next: () => node };\n        return node;\n    }\n}\ntype NonNullable<T> = \"shadowed\";",
      "impliedNodeFormat": "CommonJS"
    }
  ],
  "fileIdsList": [
    [
      "../recursive-conditional-utils.ts"
    ]
  ],
  "options": {
    "composite": true,
    "exactOptionalPropertyTypes": true,
    "outDir": "./",
    "strict": true
  },
  "referencedMap": {
    "../index.ts": [
      "../recursive-conditional-utils.ts"
    ]
  },
  "emitDiagnosticsPerFile": [
    [
      "../index.ts",
      [
        {
          "pos": 106,
          "end": 125,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "anonymousThisReturn"
          ]
        },
        {
          "pos": 3949,
          "end": 3960,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "mappedCycle"
          ]
        },
        {
          "pos": 4027,
          "end": 4042,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "mappedCycleCopy"
          ]
        },
        {
          "pos": 4071,
          "end": 4082,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "nestedCycle"
          ]
        },
        {
          "pos": 4196,
          "end": 4207,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "keyedCycles"
          ]
        },
        {
          "pos": 4368,
          "end": 4380,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "sharedCycles"
          ]
        },
        {
          "pos": 4677,
          "end": 4688,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "mutualCycle"
          ]
        },
        {
          "pos": 5076,
          "end": 5089,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "shadowedCycle"
          ]
        },
        {
          "pos": 5238,
          "end": 5251,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "optionalCycle"
          ]
        },
        {
          "pos": 5406,
          "end": 5419,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "nullableCycle"
          ]
        },
        {
          "pos": 5569,
          "end": 5580,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "mixedCycles"
          ]
        },
        {
          "pos": 5617,
          "end": 5637,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "sharedOptionalCycles"
          ]
        },
        {
          "pos": 5702,
          "end": 5714,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "nullableKeys"
          ]
        },
        {
          "pos": 5953,
          "end": 5965,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "nullableRoot"
          ]
        },
        {
          "pos": 6119,
          "end": 6131,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "optionalRoot"
          ]
        },
        {
          "pos": 6446,
          "end": 6459,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "nullableLinks"
          ]
        },
        {
          "pos": 6641,
          "end": 6662,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "optionalNullableLinks"
          ]
        },
        {
          "pos": 6999,
          "end": 7020,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "nullableOptionalLinks"
          ]
        },
        {
          "pos": 7353,
          "end": 7365,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "nullishLinks"
          ]
        },
        {
          "pos": 7530,
          "end": 7545,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "mixedUnionCycle"
          ]
        },
        {
          "pos": 7646,
          "end": 7653,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "factory"
          ]
        },
        {
          "pos": 7712,
          "end": 7720,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "captured"
          ]
        },
        {
          "pos": 7846,
          "end": 7860,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "nestedCaptured"
          ]
        },
        {
          "pos": 8106,
          "end": 8117,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "constrained"
          ]
        },
        {
          "pos": 8272,
          "end": 8288,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "optionalCaptured"
          ]
        },
        {
          "pos": 8416,
          "end": 8433,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "annotatedCaptured"
          ]
        },
        {
          "pos": 8569,
          "end": 8583,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "recursiveTuple"
          ]
        },
        {
          "pos": 8682,
          "end": 8698,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "inferredCaptured"
          ]
        },
        {
          "pos": 8837,
          "end": 8851,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "mappedCaptured"
          ]
        },
        {
          "pos": 8968,
          "end": 8980,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "freshGeneric"
          ]
        },
        {
          "pos": 9075,
          "end": 9089,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "mutualCaptured"
          ]
        },
        {
          "pos": 9348,
          "end": 9352,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "make"
          ]
        },
        {
          "pos": 9492,
          "end": 9506,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "covariantClass"
          ]
        },
        {
          "pos": 9627,
          "end": 9645,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "contravariantClass"
          ]
        },
        {
          "pos": 9814,
          "end": 9822,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "captured"
          ]
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./recursive-conditional-utils.d.ts",
  "emitSignatures": [
    {
      "file": "../index.ts",
      "original": 3
    }
  ],
  "size": 18892
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/project/producer/recursive-conditional-utils.ts
*refresh*    /home/src/workspaces/project/producer/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/producer/recursive-conditional-utils.ts

consumer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/project/consumer/index.ts
Signatures::


Edit [0]:: no change

tsgo --build consumer
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mproducer/index.ts[0m:[93m3[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'anonymousThisReturn' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m3[0m export function anonymousThisReturn() {
[7m [0m [91m                ~~~~~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m92[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'mappedCycle' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m92[0m export const mappedCycle = build<{ Node: { value: number; next: "ref" } }>();
[7m  [0m [91m             ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m93[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'mappedCycleCopy' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m93[0m export const mappedCycleCopy = mappedCycle;
[7m  [0m [91m             ~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m94[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'nestedCycle' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m94[0m export const nestedCycle = { wrapped: build<{ Node: { value: string; next: "ref" } }>() };
[7m  [0m [91m             ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m96[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'keyedCycles' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m96[0m export const keyedCycles = build<{
[7m  [0m [91m             ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m101[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'sharedCycles' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m101[0m export const sharedCycles = { first: mappedCycle, second: mappedCycle };
[7m   [0m [91m             ~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m106[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'mutualCycle' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m106[0m export const mutualCycle = buildMutual<{
[7m   [0m [91m             ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m114[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'shadowedCycle' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m114[0m export const shadowedCycle = buildShadowed<{ Node: { value: number; next: "ref" } }>();
[7m   [0m [91m             ~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m116[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'optionalCycle' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m116[0m export const optionalCycle = buildOptional<{ Node: { value: number; next: "ref" } }>();
[7m   [0m [91m             ~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m118[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'nullableCycle' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m118[0m export const nullableCycle = buildNullable<{ Node: { value: string; next: "ref" } }>();
[7m   [0m [91m             ~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m120[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'mixedCycles' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m120[0m export const mixedCycles = wrap(optionalCycle);
[7m   [0m [91m             ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m121[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'sharedOptionalCycles' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m121[0m export const sharedOptionalCycles = { first: optionalCycle, second: optionalCycle };
[7m   [0m [91m             ~~~~~~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m122[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'nullableKeys' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m122[0m export const nullableKeys = buildNullable<{
[7m   [0m [91m             ~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m128[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'nullableRoot' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m128[0m export const nullableRoot = buildNullableRoot<{ Node: { value: number; next: "ref" } }>();
[7m   [0m [91m             ~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m130[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'optionalRoot' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m130[0m export const optionalRoot = buildOptionalRoot<{ Node: { value: string; next: "ref" } }>();
[7m   [0m [91m             ~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m135[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'nullableLinks' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m135[0m export const nullableLinks = buildNullableLinks<{ Node: { value: number; next: "ref" } }>();
[7m   [0m [91m             ~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m137[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'optionalNullableLinks' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m137[0m export const optionalNullableLinks = buildOptionalNullableLinks<{ Node: { value: number; next: "ref" } }>();
[7m   [0m [91m             ~~~~~~~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m142[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'nullableOptionalLinks' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m142[0m export const nullableOptionalLinks = buildNullableOptionalLinks<{ Node: { value: number; next: "ref" } }>();
[7m   [0m [91m             ~~~~~~~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m147[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'nullishLinks' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m147[0m export const nullishLinks = buildNullishLinks<{ Node: { value: number; next: "ref" } }>();
[7m   [0m [91m             ~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m149[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'mixedUnionCycle' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m149[0m export const mixedUnionCycle = buildMixed<{ Node: { value: number; next: "ref" } }>();
[7m   [0m [91m             ~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m151[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'factory' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m151[0m export const factory = () => function self() { return self; };
[7m   [0m [91m             ~~~~~~~[0m

[96mproducer/index.ts[0m:[93m152[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'captured' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m152[0m export function captured<T>(value: T) {
[7m   [0m [91m                ~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m156[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'nestedCaptured' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m156[0m export function nestedCaptured<T>(outer: T) {
[7m   [0m [91m                ~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m165[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'constrained' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m165[0m export function constrained<T extends { value: number }, K extends keyof T>(key: K) {
[7m   [0m [91m                ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m169[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'optionalCaptured' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m169[0m export function optionalCaptured<T>(value: T) {
[7m   [0m [91m                ~~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m173[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'annotatedCaptured' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m173[0m export function annotatedCaptured<T>(value: T) {
[7m   [0m [91m                ~~~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m177[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'recursiveTuple' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m177[0m export function recursiveTuple<T>(value: T) {
[7m   [0m [91m                ~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m181[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'inferredCaptured' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m181[0m export function inferredCaptured<T>() {
[7m   [0m [91m                ~~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m185[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'mappedCaptured' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m185[0m export function mappedCaptured<T>() {
[7m   [0m [91m                ~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m189[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'freshGeneric' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m189[0m export function freshGeneric<T>(unused: T) {
[7m   [0m [91m                ~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m193[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'mutualCaptured' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m193[0m export function mutualCaptured<T, U>(left: T, right: U) {
[7m   [0m [91m                ~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m200[0m:[93m5[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'make' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m200[0m     make<U extends T>(inner: U) {
[7m   [0m [91m    ~~~~[0m

[96mproducer/index.ts[0m:[93m205[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'covariantClass' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m205[0m export function covariantClass() {
[7m   [0m [91m                ~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m211[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'contravariantClass' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m211[0m export function contravariantClass() {
[7m   [0m [91m                ~~~~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m218[0m:[93m21[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'captured' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m218[0m     export function captured<T>(value: T) {
[7m   [0m [91m                    ~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m1[0m:[93m59[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m1[0m import { conditionalAliasCopy, anonymousThisReturn } from "../producer/dist/index.js";
[7m [0m [91m                                                          ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m2[0m:[93m88[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m2[0m import { arrow, expression, first, generic, objectReturn, tupleReturn, shadowed } from "../producer/dist/index.js";
[7m [0m [91m                                                                                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m3[0m:[93m64[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m3[0m import { object, method, accessor, tuple, array, nested } from "../producer/dist/index.js";
[7m [0m [91m                                                               ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m4[0m:[93m94[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m4[0m import { memberTuple, memberArray, quoted, numeric, key, computed, union, specialized } from "../producer/dist/index.js";
[7m [0m [91m                                                                                             ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m5[0m:[93m48[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m5[0m import { indexed, mapped, viaAnnotation } from "../producer/dist/index.js";
[7m [0m [91m                                               ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m6[0m:[93m86[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m6[0m import { nextLink, nextCallable, parenthesized, asserted, Methods, overloaded } from "../producer/dist/index.js";
[7m [0m [91m                                                                                     ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m7[0m:[93m51[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m7[0m import { hiddenAlias, siblingHiddenAliases } from "../producer/dist/index.js";
[7m [0m [91m                                                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m8[0m:[93m30[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m8[0m import { nestedNumber } from "../producer/dist/index.js";
[7m [0m [91m                             ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m9[0m:[93m124[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m9[0m import { mappedCycle, mappedCycleCopy, nestedCycle, cycleKey, keyedCycles, sharedCycles, mutualCycle, shadowedCycle } from "../producer/dist/index.js";
[7m [0m [91m                                                                                                                           ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m10[0m:[93m152[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m10[0m import { optionalCycle, nullableCycle, mixedCycles, sharedOptionalCycles, nullableKeys, nullableRoot, optionalRoot, nullableLinks, nullishLinks } from "../producer/dist/index.js";
[7m  [0m [91m                                                                                                                                                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m11[0m:[93m62[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m11[0m import { optionalNullableLinks, nullableOptionalLinks } from "../producer/dist/index.js";
[7m  [0m [91m                                                             ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m12[0m:[93m142[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m12[0m import { mixedUnionCycle, factory, captured, nestedCaptured, constrained, optionalCaptured, annotatedCaptured, recursiveTuple, Nested } from "../producer/dist/index.js";
[7m  [0m [91m                                                                                                                                             ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m13[0m:[93m80[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m13[0m import { inferredCaptured, mappedCaptured, freshGeneric, mutualCaptured } from "../producer/dist/index.js";
[7m  [0m [91m                                                                               ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m14[0m:[93m31[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m14[0m import { CapturedClass } from "../producer/dist/index.js";
[7m  [0m [91m                              ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m15[0m:[93m52[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m15[0m import { covariantClass, contravariantClass } from "../producer/dist/index.js";
[7m  [0m [91m                                                   ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 50 errors in 2 files.

Errors  Files
    15  consumer/index.ts[90m:1[0m
    35  producer/index.ts[90m:3[0m

//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo] *rewrite with same content*
//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*

producer/tsconfig.json::
SemanticDiagnostics::
Signatures::

consumer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/project/consumer/index.ts
Signatures::


Edit [1]:: add a comment to the producer
//// [/home/src/workspaces/project/producer/index.ts] *modified* 
import { f } from "./recursive-conditional-utils";
export const conditionalAliasCopy = f;
export function anonymousThisReturn() {
    return {
        relyingOnThis() {
            return this;
        },
    };
}
export const arrow = () => arrow;
export const expression = function self() { return self; };
export const first = () => second;
export const second = () => first;
export const generic = <T>(value: T) => generic;
export const objectReturn = () => ({ call: objectReturn });
export const tupleReturn = () => [tupleReturn] as const;
export const shadowed = function self(shadowed: number) { return self; };
export const object = { value: 1, next: () => object };
export const method = { value: 1, next() { return method; } };
export const accessor = { value: 1, get next() { return accessor; } };
export const tuple = [() => tuple] as const;
export const array = [() => array];
export const nested = { inner: { next() { return nested.inner; } } };
export const memberTuple = [function self() { return self; }] as const;
export const memberArray = [function self() { return self; }];
export const quoted = { "a-b": function self() { return self; } };
export const numeric = { 0: function self() { return self; } };
export const key = Symbol();
export const computed = { [key]: function self() { return self; } };
export const union = true as boolean ? { next: () => union } : undefined;
function create<T>(value: T) {
    const result = { value, next: () => result };
    return result;
}
export const specialized = create("text");
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
export type Link<T> = { value: T; next: Link<T> };
export type Callable<T> = { (value: T): Callable<T>; link: Link<T> };
export declare const link: Link<string>;
export declare const callable: Callable<number>;
export const nextLink = link.next;
export const nextCallable = callable(1);
function createHidden<T>(value: T) {
    type Hidden = { value: T; next: Hidden };
    return null! as Hidden;
}
export const hiddenAlias = createHidden("text");
export const siblingHiddenAliases = { first: hiddenAlias, second: hiddenAlias };
export const parenthesized = (function self() { return self; });
export const asserted = (function self() { return self; }) satisfies () => unknown;
export class Methods {
    static recur() { return Methods.recur; }
    static "a-b"() { return Methods["a-b"]; }
    static [key]() { return Methods[key]; }
    recur() { return this.recur; }
}
export function overloaded(value: string): typeof overloaded;
export function overloaded(value: number): typeof overloaded;
export function overloaded(value: string | number) { return overloaded; }
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
export const sharedCycles = { first: mappedCycle, second: mappedCycle };
type ResolveMutual<M, K extends keyof M> = Show<{
    [P in keyof M[K]]: M[K][P] extends { ref: infer R extends keyof M } ? ResolveMutual<M, R> : M[K][P];
}>;
declare const buildMutual: <M>() => { [K in keyof M]: ResolveMutual<M, K> };
export const mutualCycle = buildMutual<{
    First: { value: number; next: { ref: "Second" } };
    Second: { value: string; next: { ref: "First" } };
}>();
type ResolveShadowed<M, K extends keyof M> = Show<{
    [P in keyof M[K]]: M[K][P] extends "ref" ? <T>(shadowedCycle: T) => ResolveShadowed<M, K> : M[K][P];
}>;
declare const buildShadowed: <M>() => { [K in keyof M]: ResolveShadowed<M, K> };
export const shadowedCycle = buildShadowed<{ Node: { value: number; next: "ref" } }>();
declare const buildOptional: <M>() => { [K in keyof M]?: Resolve<M, K> };
export const optionalCycle = buildOptional<{ Node: { value: number; next: "ref" } }>();
declare const buildNullable: <M>() => { [K in keyof M]: Resolve<M, K> | null };
export const nullableCycle = buildNullable<{ Node: { value: string; next: "ref" } }>();
declare const wrap: <T>(value: T) => { required: T; optional?: T | null };
export const mixedCycles = wrap(optionalCycle);
export const sharedOptionalCycles = { first: optionalCycle, second: optionalCycle };
export const nullableKeys = buildNullable<{
    "a-b": { value: string; next: "ref" };
    0: { value: boolean; next: "ref" };
    [cycleKey]: { value: number; next: "ref" };
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
declare const buildMixed: <M>() => { [K in keyof M]?: Resolve<M, K> | false | null };
export const mixedUnionCycle = buildMixed<{ Node: { value: number; next: "ref" } }>();
export const _recursive = 1;
export const factory = () => function self() { return self; };
export function captured<T>(value: T) {
    const node = { value, next: () => node, consume: (other: T) => node };
    return node;
}
export function nestedCaptured<T>(outer: T) {
    return <U>(inner: U) => {
        const node = {
            outer, inner, next: () => node,
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
type NonNullable<T> = "shadowed";
// comment-only edit


tsgo --build consumer
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mproducer/index.ts[0m:[93m3[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'anonymousThisReturn' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m3[0m export function anonymousThisReturn() {
[7m [0m [91m                ~~~~~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m92[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'mappedCycle' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m92[0m export const mappedCycle = build<{ Node: { value: number; next: "ref" } }>();
[7m  [0m [91m             ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m93[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'mappedCycleCopy' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m93[0m export const mappedCycleCopy = mappedCycle;
[7m  [0m [91m             ~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m94[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'nestedCycle' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m94[0m export const nestedCycle = { wrapped: build<{ Node: { value: string; next: "ref" } }>() };
[7m  [0m [91m             ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m96[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'keyedCycles' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m96[0m export const keyedCycles = build<{
[7m  [0m [91m             ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m101[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'sharedCycles' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m101[0m export const sharedCycles = { first: mappedCycle, second: mappedCycle };
[7m   [0m [91m             ~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m106[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'mutualCycle' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m106[0m export const mutualCycle = buildMutual<{
[7m   [0m [91m             ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m114[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'shadowedCycle' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m114[0m export const shadowedCycle = buildShadowed<{ Node: { value: number; next: "ref" } }>();
[7m   [0m [91m             ~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m116[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'optionalCycle' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m116[0m export const optionalCycle = buildOptional<{ Node: { value: number; next: "ref" } }>();
[7m   [0m [91m             ~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m118[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'nullableCycle' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m118[0m export const nullableCycle = buildNullable<{ Node: { value: string; next: "ref" } }>();
[7m   [0m [91m             ~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m120[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'mixedCycles' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m120[0m export const mixedCycles = wrap(optionalCycle);
[7m   [0m [91m             ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m121[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'sharedOptionalCycles' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m121[0m export const sharedOptionalCycles = { first: optionalCycle, second: optionalCycle };
[7m   [0m [91m             ~~~~~~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m122[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'nullableKeys' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m122[0m export const nullableKeys = buildNullable<{
[7m   [0m [91m             ~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m128[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'nullableRoot' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m128[0m export const nullableRoot = buildNullableRoot<{ Node: { value: number; next: "ref" } }>();
[7m   [0m [91m             ~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m130[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'optionalRoot' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m130[0m export const optionalRoot = buildOptionalRoot<{ Node: { value: string; next: "ref" } }>();
[7m   [0m [91m             ~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m135[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'nullableLinks' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m135[0m export const nullableLinks = buildNullableLinks<{ Node: { value: number; next: "ref" } }>();
[7m   [0m [91m             ~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m137[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'optionalNullableLinks' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m137[0m export const optionalNullableLinks = buildOptionalNullableLinks<{ Node: { value: number; next: "ref" } }>();
[7m   [0m [91m             ~~~~~~~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m142[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'nullableOptionalLinks' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m142[0m export const nullableOptionalLinks = buildNullableOptionalLinks<{ Node: { value: number; next: "ref" } }>();
[7m   [0m [91m             ~~~~~~~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m147[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'nullishLinks' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m147[0m export const nullishLinks = buildNullishLinks<{ Node: { value: number; next: "ref" } }>();
[7m   [0m [91m             ~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m149[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'mixedUnionCycle' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m149[0m export const mixedUnionCycle = buildMixed<{ Node: { value: number; next: "ref" } }>();
[7m   [0m [91m             ~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m151[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'factory' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m151[0m export const factory = () => function self() { return self; };
[7m   [0m [91m             ~~~~~~~[0m

[96mproducer/index.ts[0m:[93m152[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'captured' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m152[0m export function captured<T>(value: T) {
[7m   [0m [91m                ~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m156[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'nestedCaptured' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m156[0m export function nestedCaptured<T>(outer: T) {
[7m   [0m [91m                ~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m165[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'constrained' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m165[0m export function constrained<T extends { value: number }, K extends keyof T>(key: K) {
[7m   [0m [91m                ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m169[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'optionalCaptured' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m169[0m export function optionalCaptured<T>(value: T) {
[7m   [0m [91m                ~~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m173[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'annotatedCaptured' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m173[0m export function annotatedCaptured<T>(value: T) {
[7m   [0m [91m                ~~~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m177[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'recursiveTuple' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m177[0m export function recursiveTuple<T>(value: T) {
[7m   [0m [91m                ~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m181[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'inferredCaptured' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m181[0m export function inferredCaptured<T>() {
[7m   [0m [91m                ~~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m185[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'mappedCaptured' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m185[0m export function mappedCaptured<T>() {
[7m   [0m [91m                ~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m189[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'freshGeneric' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m189[0m export function freshGeneric<T>(unused: T) {
[7m   [0m [91m                ~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m193[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'mutualCaptured' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m193[0m export function mutualCaptured<T, U>(left: T, right: U) {
[7m   [0m [91m                ~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m200[0m:[93m5[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'make' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m200[0m     make<U extends T>(inner: U) {
[7m   [0m [91m    ~~~~[0m

[96mproducer/index.ts[0m:[93m205[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'covariantClass' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m205[0m export function covariantClass() {
[7m   [0m [91m                ~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m211[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'contravariantClass' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m211[0m export function contravariantClass() {
[7m   [0m [91m                ~~~~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m218[0m:[93m21[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'captured' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m218[0m     export function captured<T>(value: T) {
[7m   [0m [91m                    ~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m1[0m:[93m59[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m1[0m import { conditionalAliasCopy, anonymousThisReturn } from "../producer/dist/index.js";
[7m [0m [91m                                                          ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m2[0m:[93m88[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m2[0m import { arrow, expression, first, generic, objectReturn, tupleReturn, shadowed } from "../producer/dist/index.js";
[7m [0m [91m                                                                                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m3[0m:[93m64[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m3[0m import { object, method, accessor, tuple, array, nested } from "../producer/dist/index.js";
[7m [0m [91m                                                               ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m4[0m:[93m94[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m4[0m import { memberTuple, memberArray, quoted, numeric, key, computed, union, specialized } from "../producer/dist/index.js";
[7m [0m [91m                                                                                             ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m5[0m:[93m48[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m5[0m import { indexed, mapped, viaAnnotation } from "../producer/dist/index.js";
[7m [0m [91m                                               ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m6[0m:[93m86[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m6[0m import { nextLink, nextCallable, parenthesized, asserted, Methods, overloaded } from "../producer/dist/index.js";
[7m [0m [91m                                                                                     ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m7[0m:[93m51[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m7[0m import { hiddenAlias, siblingHiddenAliases } from "../producer/dist/index.js";
[7m [0m [91m                                                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m8[0m:[93m30[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m8[0m import { nestedNumber } from "../producer/dist/index.js";
[7m [0m [91m                             ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m9[0m:[93m124[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m9[0m import { mappedCycle, mappedCycleCopy, nestedCycle, cycleKey, keyedCycles, sharedCycles, mutualCycle, shadowedCycle } from "../producer/dist/index.js";
[7m [0m [91m                                                                                                                           ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m10[0m:[93m152[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m10[0m import { optionalCycle, nullableCycle, mixedCycles, sharedOptionalCycles, nullableKeys, nullableRoot, optionalRoot, nullableLinks, nullishLinks } from "../producer/dist/index.js";
[7m  [0m [91m                                                                                                                                                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m11[0m:[93m62[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m11[0m import { optionalNullableLinks, nullableOptionalLinks } from "../producer/dist/index.js";
[7m  [0m [91m                                                             ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m12[0m:[93m142[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m12[0m import { mixedUnionCycle, factory, captured, nestedCaptured, constrained, optionalCaptured, annotatedCaptured, recursiveTuple, Nested } from "../producer/dist/index.js";
[7m  [0m [91m                                                                                                                                             ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m13[0m:[93m80[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m13[0m import { inferredCaptured, mappedCaptured, freshGeneric, mutualCaptured } from "../producer/dist/index.js";
[7m  [0m [91m                                                                               ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m14[0m:[93m31[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m14[0m import { CapturedClass } from "../producer/dist/index.js";
[7m  [0m [91m                              ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m15[0m:[93m52[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m15[0m import { covariantClass, contravariantClass } from "../producer/dist/index.js";
[7m  [0m [91m                                                   ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 50 errors in 2 files.

Errors  Files
    15  consumer/index.ts[90m:1[0m
    35  producer/index.ts[90m:3[0m

//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo] *rewrite with same content*
//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*
//// [/home/src/workspaces/project/producer/dist/index.js] *modified* 
import { f } from "./recursive-conditional-utils";
export const conditionalAliasCopy = f;
export function anonymousThisReturn() {
    return {
        relyingOnThis() {
            return this;
        },
    };
}
export const arrow = () => arrow;
export const expression = function self() { return self; };
export const first = () => second;
export const second = () => first;
export const generic = (value) => generic;
export const objectReturn = () => ({ call: objectReturn });
export const tupleReturn = () => [tupleReturn];
export const shadowed = function self(shadowed) { return self; };
export const object = { value: 1, next: () => object };
export const method = { value: 1, next() { return method; } };
export const accessor = { value: 1, get next() { return accessor; } };
export const tuple = [() => tuple];
export const array = [() => array];
export const nested = { inner: { next() { return nested.inner; } } };
export const memberTuple = [function self() { return self; }];
export const memberArray = [function self() { return self; }];
export const quoted = { "a-b": function self() { return self; } };
export const numeric = { 0: function self() { return self; } };
export const key = Symbol();
export const computed = { [key]: function self() { return self; } };
export const union = true ? { next: () => union } : undefined;
function create(value) {
    const result = { value, next: () => result };
    return result;
}
export const specialized = create("text");
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
export const nextLink = link.next;
export const nextCallable = callable(1);
function createHidden(value) {
    return null;
}
export const hiddenAlias = createHidden("text");
export const siblingHiddenAliases = { first: hiddenAlias, second: hiddenAlias };
export const parenthesized = (function self() { return self; });
export const asserted = (function self() { return self; });
export class Methods {
    static recur() { return Methods.recur; }
    static "a-b"() { return Methods["a-b"]; }
    static [key]() { return Methods[key]; }
    recur() { return this.recur; }
}
export function overloaded(value) { return overloaded; }
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
export const mappedCycle = build();
export const mappedCycleCopy = mappedCycle;
export const nestedCycle = { wrapped: build() };
export const cycleKey = Symbol();
export const keyedCycles = build();
export const sharedCycles = { first: mappedCycle, second: mappedCycle };
export const mutualCycle = buildMutual();
export const shadowedCycle = buildShadowed();
export const optionalCycle = buildOptional();
export const nullableCycle = buildNullable();
export const mixedCycles = wrap(optionalCycle);
export const sharedOptionalCycles = { first: optionalCycle, second: optionalCycle };
export const nullableKeys = buildNullable();
export const nullableRoot = buildNullableRoot();
export const optionalRoot = buildOptionalRoot();
export const nullableLinks = buildNullableLinks();
export const optionalNullableLinks = buildOptionalNullableLinks();
export const nullableOptionalLinks = buildNullableOptionalLinks();
export const nullishLinks = buildNullishLinks();
export const mixedUnionCycle = buildMixed();
export const _recursive = 1;
export const factory = () => function self() { return self; };
export function captured(value) {
    const node = { value, next: () => node, consume: (other) => node };
    return node;
}
export function nestedCaptured(outer) {
    return (inner) => {
        const node = {
            outer, inner, next: () => node,
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
// comment-only edit

//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.es2026.full.d.ts","../recursive-conditional-utils.ts","../index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"5f612a8da522ce136561c99ba028217b-type Recursive<T> = T extends Array<infer V> ? Recursive<V> : T;\nexport const f = <T>(): Recursive<T> => {\n    return null!;\n};","signature":"b7e553848a0db56da7124d58387f207a-type Recursive<T> = T extends Array<infer V> ? Recursive<V> : T;\nexport declare const f: <T>() => Recursive<T>;\nexport {};\n","impliedNodeFormat":1},{"version":"90c799933358055d40b311c2862a4ccf-import { f } from \"./recursive-conditional-utils\";\nexport const conditionalAliasCopy = f;\nexport function anonymousThisReturn() {\n    return {\n        relyingOnThis() {\n            return this;\n        },\n    };\n}\nexport const arrow = () => arrow;\nexport const expression = function self() { return self; };\nexport const first = () => second;\nexport const second = () => first;\nexport const generic = <T>(value: T) => generic;\nexport const objectReturn = () => ({ call: objectReturn });\nexport const tupleReturn = () => [tupleReturn] as const;\nexport const shadowed = function self(shadowed: number) { return self; };\nexport const object = { value: 1, next: () => object };\nexport const method = { value: 1, next() { return method; } };\nexport const accessor = { value: 1, get next() { return accessor; } };\nexport const tuple = [() => tuple] as const;\nexport const array = [() => array];\nexport const nested = { inner: { next() { return nested.inner; } } };\nexport const memberTuple = [function self() { return self; }] as const;\nexport const memberArray = [function self() { return self; }];\nexport const quoted = { \"a-b\": function self() { return self; } };\nexport const numeric = { 0: function self() { return self; } };\nexport const key = Symbol();\nexport const computed = { [key]: function self() { return self; } };\nexport const union = true as boolean ? { next: () => union } : undefined;\nfunction create<T>(value: T) {\n    const result = { value, next: () => result };\n    return result;\n}\nexport const specialized = create(\"text\");\nfunction createIndexed() {\n    const value: { [key: string]: typeof value } = {};\n    return value;\n}\nexport const indexed = createIndexed();\nfunction createMapped<T>() {\n    const value: { [K in keyof T]: typeof value } = null!;\n    return value;\n}\nexport const mapped = createMapped<{ next: unknown }>();\nfunction createAnnotated<T>(value: T) {\n    const node: { value: T; next: () => typeof node } = { value, next: () => node };\n    return node;\n}\nexport const viaAnnotation = createAnnotated(\"text\");\nexport type Link<T> = { value: T; next: Link<T> };\nexport type Callable<T> = { (value: T): Callable<T>; link: Link<T> };\nexport declare const link: Link<string>;\nexport declare const callable: Callable<number>;\nexport const nextLink = link.next;\nexport const nextCallable = callable(1);\nfunction createHidden<T>(value: T) {\n    type Hidden = { value: T; next: Hidden };\n    return null! as Hidden;\n}\nexport const hiddenAlias = createHidden(\"text\");\nexport const siblingHiddenAliases = { first: hiddenAlias, second: hiddenAlias };\nexport const parenthesized = (function self() { return self; });\nexport const asserted = (function self() { return self; }) satisfies () => unknown;\nexport class Methods {\n    static recur() { return Methods.recur; }\n    static \"a-b\"() { return Methods[\"a-b\"]; }\n    static [key]() { return Methods[key]; }\n    recur() { return this.recur; }\n}\nexport function overloaded(value: string): typeof overloaded;\nexport function overloaded(value: number): typeof overloaded;\nexport function overloaded(value: string | number) { return overloaded; }\nexport const nestedOwner = {\n    make<T>(outer: T) {\n        return {\n            nested<U>(inner: U) { return { outer, inner, owner: nestedOwner }; },\n            constrained<U extends T = T>(inner: U) { return { outer, inner, owner: nestedOwner }; },\n            copied<U>(inner: U): { outer: T; inner: U; owner: typeof nestedOwner } {\n                return { outer, inner, owner: nestedOwner };\n            },\n            rest<U>(...values: [U]) { return { outer, inner: values[0], owner: nestedOwner }; },\n        };\n    },\n};\nexport const nestedNumber = nestedOwner.make(1);\ntype Show<T> = { [K in keyof T]: T[K] } & unknown;\ntype Resolve<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? Resolve<M, K> : M[K][P];\n}>;\ndeclare const build: <M>() => { [K in keyof M]: Resolve<M, K> };\nexport const mappedCycle = build<{ Node: { value: number; next: \"ref\" } }>();\nexport const mappedCycleCopy = mappedCycle;\nexport const nestedCycle = { wrapped: build<{ Node: { value: string; next: \"ref\" } }>() };\nexport const cycleKey = Symbol();\nexport const keyedCycles = build<{\n    \"a-b\": { value: string; next: \"ref\" };\n    0: { value: boolean; next: \"ref\" };\n    [cycleKey]: { value: number; next: \"ref\" };\n}>();\nexport const sharedCycles = { first: mappedCycle, second: mappedCycle };\ntype ResolveMutual<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends { ref: infer R extends keyof M } ? ResolveMutual<M, R> : M[K][P];\n}>;\ndeclare const buildMutual: <M>() => { [K in keyof M]: ResolveMutual<M, K> };\nexport const mutualCycle = buildMutual<{\n    First: { value: number; next: { ref: \"Second\" } };\n    Second: { value: string; next: { ref: \"First\" } };\n}>();\ntype ResolveShadowed<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? <T>(shadowedCycle: T) => ResolveShadowed<M, K> : M[K][P];\n}>;\ndeclare const buildShadowed: <M>() => { [K in keyof M]: ResolveShadowed<M, K> };\nexport const shadowedCycle = buildShadowed<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildOptional: <M>() => { [K in keyof M]?: Resolve<M, K> };\nexport const optionalCycle = buildOptional<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildNullable: <M>() => { [K in keyof M]: Resolve<M, K> | null };\nexport const nullableCycle = buildNullable<{ Node: { value: string; next: \"ref\" } }>();\ndeclare const wrap: <T>(value: T) => { required: T; optional?: T | null };\nexport const mixedCycles = wrap(optionalCycle);\nexport const sharedOptionalCycles = { first: optionalCycle, second: optionalCycle };\nexport const nullableKeys = buildNullable<{\n    \"a-b\": { value: string; next: \"ref\" };\n    0: { value: boolean; next: \"ref\" };\n    [cycleKey]: { value: number; next: \"ref\" };\n}>();\ndeclare const buildNullableRoot: <M>() => Resolve<M, keyof M> | null;\nexport const nullableRoot = buildNullableRoot<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildOptionalRoot: <M>() => Resolve<M, keyof M> | undefined;\nexport const optionalRoot = buildOptionalRoot<{ Node: { value: string; next: \"ref\" } }>();\ntype ResolveNullable<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? ResolveNullable<M, K> | null : M[K][P];\n}>;\ndeclare const buildNullableLinks: <M>() => { [K in keyof M]: ResolveNullable<M, K> | null };\nexport const nullableLinks = buildNullableLinks<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildOptionalNullableLinks: <M>() => { [K in keyof M]?: ResolveNullable<M, K> | null };\nexport const optionalNullableLinks = buildOptionalNullableLinks<{ Node: { value: number; next: \"ref\" } }>();\ntype ResolveOptional<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? ResolveOptional<M, K> | undefined : M[K][P];\n}>;\ndeclare const buildNullableOptionalLinks: <M>() => { [K in keyof M]: ResolveOptional<M, K> | null };\nexport const nullableOptionalLinks = buildNullableOptionalLinks<{ Node: { value: number; next: \"ref\" } }>();\ntype ResolveNullish<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? ResolveNullish<M, K> | null | undefined : M[K][P];\n}>;\ndeclare const buildNullishLinks: <M>() => { [K in keyof M]?: ResolveNullish<M, K> | null };\nexport const nullishLinks = buildNullishLinks<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildMixed: <M>() => { [K in keyof M]?: Resolve<M, K> | false | null };\nexport const mixedUnionCycle = buildMixed<{ Node: { value: number; next: \"ref\" } }>();\nexport const _recursive = 1;\nexport const factory = () => function self() { return self; };\nexport function captured<T>(value: T) {\n    const node = { value, next: () => node, consume: (other: T) => node };\n    return node;\n}\nexport function nestedCaptured<T>(outer: T) {\n    return <U>(inner: U) => {\n        const node = {\n            outer, inner, next: () => node,\n            shadow: <T>(value: T) => ({ outer, inner, value, next: node }),\n        };\n        return node;\n    };\n}\nexport function constrained<T extends { value: number }, K extends keyof T>(key: K) {\n    const node = { value: null! as T[K], next: () => node };\n    return node;\n}\nexport function optionalCaptured<T>(value: T) {\n    type Node = { value: T; next: Node };\n    return null! as { node?: Node | false | null };\n}\nexport function annotatedCaptured<T>(value: T) {\n    const node: { value: typeof value; next: typeof node } = { value, next: null! };\n    return node;\n}\nexport function recursiveTuple<T>(value: T) {\n    type Tuple = readonly [T, Tuple];\n    return null! as Tuple;\n}\nexport function inferredCaptured<T>() {\n    type Node<V> = { value: V; next: Node<V> };\n    return null! as (T extends () => infer U ? Node<U> : never);\n}\nexport function mappedCaptured<T>() {\n    type Node = { [K in keyof T]: { value: T[K]; next: Node } };\n    return null! as Node;\n}\nexport function freshGeneric<T>(unused: T) {\n    const recur = <U>(value: U) => recur;\n    return recur;\n}\nexport function mutualCaptured<T, U>(left: T, right: U) {\n    type Left = { left: T; next: Right };\n    type Right = { right: U; self: Right; next: Left };\n    return { left: null! as Left, right: null! as Right };\n}\nexport class CapturedClass<T> {\n    constructor(public value: T) {}\n    make<U extends T>(inner: U) {\n        const node = { outer: this.value, inner, next: () => node };\n        return node;\n    }\n}\nexport function covariantClass() {\n    return class Node<out T> {\n        value!: T;\n        next(): Node<T> { return this; }\n    };\n}\nexport function contravariantClass() {\n    return class Node<in T> {\n        consume!: (value: T) => void;\n        next(): Node<T> { return this; }\n    };\n}\nexport namespace Nested {\n    export function captured<T>(value: T) {\n        const node = { value, next: () => node };\n        return node;\n    }\n}\ntype NonNullable<T> = \"shadowed\";\n// comment-only edit\n","signature":"9ad2fef9da811fedb01df90f166a1cd4-import { f } from \"./recursive-conditional-utils\";\nexport declare const conditionalAliasCopy: typeof f;\nexport declare function anonymousThisReturn(): any;\nexport declare const arrow: () => typeof arrow;\nexport declare const expression: () => typeof expression;\nexport declare const first: () => typeof second;\nexport declare const second: () => typeof first;\nexport declare const generic: <T>(value: T) => typeof generic;\nexport declare const objectReturn: () => {\n    call: typeof objectReturn;\n};\nexport declare const tupleReturn: () => readonly [typeof tupleReturn];\nexport declare const shadowed: (shadowed: number) => typeof import(\".\").shadowed;\nexport declare const object: {\n    value: number;\n    next: () => typeof object;\n};\nexport declare const method: {\n    value: number;\n    next(): typeof method;\n};\nexport declare const accessor: {\n    value: number;\n    readonly next: typeof accessor;\n};\nexport declare const tuple: readonly [() => typeof tuple];\nexport declare const array: (() => typeof array)[];\nexport declare const nested: {\n    inner: {\n        next(): {\n            next(): (typeof nested)[\"inner\"];\n        };\n    };\n};\nexport declare const memberTuple: readonly [() => (typeof memberTuple)[0]];\nexport declare const memberArray: (() => (typeof memberArray)[0])[];\nexport declare const quoted: {\n    \"a-b\": () => (typeof quoted)[\"a-b\"];\n};\nexport declare const numeric: {\n    0: () => (typeof numeric)[0];\n};\nexport declare const key: unique symbol;\nexport declare const computed: {\n    [key]: () => (typeof computed)[typeof key];\n};\nexport declare const union: {\n    next: () => typeof union;\n} | undefined;\nexport declare const specialized: {\n    value: string;\n    next: () => typeof specialized;\n};\nexport declare const indexed: {\n    [key: string]: typeof indexed;\n};\nexport declare const mapped: {\n    next: typeof mapped;\n};\nexport declare const viaAnnotation: {\n    value: string;\n    next: () => typeof viaAnnotation;\n};\nexport type Link<T> = {\n    value: T;\n    next: Link<T>;\n};\nexport type Callable<T> = {\n    (value: T): Callable<T>;\n    link: Link<T>;\n};\nexport declare const link: Link<string>;\nexport declare const callable: Callable<number>;\nexport declare const nextLink: Link<string>;\nexport declare const nextCallable: Callable<number>;\nexport declare const hiddenAlias: {\n    value: string;\n    next: typeof hiddenAlias;\n};\nexport declare const siblingHiddenAliases: {\n    first: {\n        value: string;\n        next: (typeof siblingHiddenAliases)[\"first\"];\n    };\n    second: {\n        value: string;\n        next: (typeof siblingHiddenAliases)[\"second\"];\n    };\n};\nexport declare const parenthesized: () => typeof parenthesized;\nexport declare const asserted: () => typeof asserted;\nexport declare class Methods {\n    static recur(): (typeof Methods)[\"recur\"];\n    static \"a-b\"(): (typeof Methods)[\"a-b\"];\n    static [key](): (typeof Methods)[typeof key];\n    recur(): Methods[\"recur\"];\n}\nexport declare function overloaded(value: string): typeof overloaded;\nexport declare function overloaded(value: number): typeof overloaded;\nexport declare const nestedOwner: {\n    make<T>(outer: T): {\n        nested<U>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        constrained<U extends T = T>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        copied<U>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        rest<U>(values_0: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n    };\n};\nexport declare const nestedNumber: {\n    nested<U>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n    constrained<U extends number = number>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n    copied<U>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: typeof nestedOwner;\n    };\n    rest<U>(values_0: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n};\nexport declare const mappedCycle: any;\nexport declare const mappedCycleCopy: any;\nexport declare const nestedCycle: any;\nexport declare const cycleKey: unique symbol;\nexport declare const keyedCycles: any;\nexport declare const sharedCycles: any;\nexport declare const mutualCycle: any;\nexport declare const shadowedCycle: any;\nexport declare const optionalCycle: any;\nexport declare const nullableCycle: any;\nexport declare const mixedCycles: any;\nexport declare const sharedOptionalCycles: any;\nexport declare const nullableKeys: any;\nexport declare const nullableRoot: any;\nexport declare const optionalRoot: any;\nexport declare const nullableLinks: any;\nexport declare const optionalNullableLinks: any;\nexport declare const nullableOptionalLinks: any;\nexport declare const nullishLinks: any;\nexport declare const mixedUnionCycle: any;\nexport declare const _recursive = 1;\nexport declare const factory: any;\nexport declare function captured<T>(value: T): any;\nexport declare function nestedCaptured<T>(outer: T): any;\nexport declare function constrained<T extends {\n    value: number;\n}, K extends keyof T>(key: K): any;\nexport declare function optionalCaptured<T>(value: T): any;\nexport declare function annotatedCaptured<T>(value: T): any;\nexport declare function recursiveTuple<T>(value: T): any;\nexport declare function inferredCaptured<T>(): any;\nexport declare function mappedCaptured<T>(): any;\nexport declare function freshGeneric<T>(unused: T): any;\nexport declare function mutualCaptured<T, U>(left: T, right: U): any;\nexport declare class CapturedClass<T> {\n    value: T;\n    constructor(value: T);\n    make<U extends T>(inner: U): any;\n}\nexport declare function covariantClass(): any;\nexport declare function contravariantClass(): any;\nexport declare namespace Nested {\n    function captured<T>(value: T): any;\n}\n\n(106,19): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nanonymousThisReturn\n\n(3949,11): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nmappedCycle\n\n(4027,15): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nmappedCycleCopy\n\n(4071,11): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nnestedCycle\n\n(4196,11): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nkeyedCycles\n\n(4368,12): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nsharedCycles\n\n(4677,11): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nmutualCycle\n\n(5076,13): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nshadowedCycle\n\n(5238,13): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\noptionalCycle\n\n(5406,13): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nnullableCycle\n\n(5569,11): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nmixedCycles\n\n(5617,20): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nsharedOptionalCycles\n\n(5702,12): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nnullableKeys\n\n(5953,12): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nnullableRoot\n\n(6119,12): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\noptionalRoot\n\n(6446,13): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nnullableLinks\n\n(6641,21): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\noptionalNullableLinks\n\n(6999,21): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nnullableOptionalLinks\n\n(7353,12): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nnullishLinks\n\n(7530,15): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nmixedUnionCycle\n\n(7646,7): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nfactory\n\n(7712,8): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\ncaptured\n\n(7846,14): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nnestedCaptured\n\n(8106,11): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nconstrained\n\n(8272,16): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\noptionalCaptured\n\n(8416,17): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nannotatedCaptured\n\n(8569,14): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nrecursiveTuple\n\n(8682,16): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\ninferredCaptured\n\n(8837,14): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nmappedCaptured\n\n(8968,12): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nfreshGeneric\n\n(9075,14): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nmutualCaptured\n\n(9348,4): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nmake\n\n(9492,14): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\ncovariantClass\n\n(9627,18): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\ncontravariantClass\n\n(9814,8): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\ncaptured\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"composite":true,"exactOptionalPropertyTypes":true,"outDir":"./","strict":true},"referencedMap":[[3,1]],"emitDiagnosticsPerFile":[[3,[{"pos":106,"end":125,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["anonymousThisReturn"]},{"pos":3949,"end":3960,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["mappedCycle"]},{"pos":4027,"end":4042,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["mappedCycleCopy"]},{"pos":4071,"end":4082,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["nestedCycle"]},{"pos":4196,"end":4207,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["keyedCycles"]},{"pos":4368,"end":4380,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["sharedCycles"]},{"pos":4677,"end":4688,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["mutualCycle"]},{"pos":5076,"end":5089,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["shadowedCycle"]},{"pos":5238,"end":5251,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["optionalCycle"]},{"pos":5406,"end":5419,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["nullableCycle"]},{"pos":5569,"end":5580,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["mixedCycles"]},{"pos":5617,"end":5637,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["sharedOptionalCycles"]},{"pos":5702,"end":5714,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["nullableKeys"]},{"pos":5953,"end":5965,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["nullableRoot"]},{"pos":6119,"end":6131,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["optionalRoot"]},{"pos":6446,"end":6459,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["nullableLinks"]},{"pos":6641,"end":6662,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["optionalNullableLinks"]},{"pos":6999,"end":7020,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["nullableOptionalLinks"]},{"pos":7353,"end":7365,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["nullishLinks"]},{"pos":7530,"end":7545,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["mixedUnionCycle"]},{"pos":7646,"end":7653,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["factory"]},{"pos":7712,"end":7720,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["captured"]},{"pos":7846,"end":7860,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["nestedCaptured"]},{"pos":8106,"end":8117,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["constrained"]},{"pos":8272,"end":8288,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["optionalCaptured"]},{"pos":8416,"end":8433,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["annotatedCaptured"]},{"pos":8569,"end":8583,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["recursiveTuple"]},{"pos":8682,"end":8698,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["inferredCaptured"]},{"pos":8837,"end":8851,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["mappedCaptured"]},{"pos":8968,"end":8980,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["freshGeneric"]},{"pos":9075,"end":9089,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["mutualCaptured"]},{"pos":9348,"end":9352,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["make"]},{"pos":9492,"end":9506,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["covariantClass"]},{"pos":9627,"end":9645,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["contravariantClass"]},{"pos":9814,"end":9822,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["captured"]}]]],"latestChangedDtsFile":"./recursive-conditional-utils.d.ts","emitSignatures":[3]}
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../recursive-conditional-utils.ts",
        "../index.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.es2026.full.d.ts",
    "../recursive-conditional-utils.ts",
    "../index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2026.full.d.ts",
      "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../recursive-conditional-utils.ts",
      "version": "5f612a8da522ce136561c99ba028217b-type Recursive<T> = T extends Array<infer V> ? Recursive<V> : T;\nexport const f = <T>(): Recursive<T> => {\n    return null!;\n};",
      "signature": "b7e553848a0db56da7124d58387f207a-type Recursive<T> = T extends Array<infer V> ? Recursive<V> : T;\nexport declare const f: <T>() => Recursive<T>;\nexport {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "5f612a8da522ce136561c99ba028217b-type Recursive<T> = T extends Array<infer V> ? Recursive<V> : T;\nexport const f = <T>(): Recursive<T> => {\n    return null!;\n};",
        "signature": "b7e553848a0db56da7124d58387f207a-type Recursive<T> = T extends Array<infer V> ? Recursive<V> : T;\nexport declare const f: <T>() => Recursive<T>;\nexport {};\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../index.ts",
      "version": "90c799933358055d40b311c2862a4ccf-import { f } from \"./recursive-conditional-utils\";\nexport const conditionalAliasCopy = f;\nexport function anonymousThisReturn() {\n    return {\n        relyingOnThis() {\n            return this;\n        },\n    };\n}\nexport const arrow = () => arrow;\nexport const expression = function self() { return self; };\nexport const first = () => second;\nexport const second = () => first;\nexport const generic = <T>(value: T) => generic;\nexport const objectReturn = () => ({ call: objectReturn });\nexport const tupleReturn = () => [tupleReturn] as const;\nexport const shadowed = function self(shadowed: number) { return self; };\nexport const object = { value: 1, next: () => object };\nexport const method = { value: 1, next() { return method; } };\nexport const accessor = { value: 1, get next() { return accessor; } };\nexport const tuple = [() => tuple] as const;\nexport const array = [() => array];\nexport const nested = { inner: { next() { return nested.inner; } } };\nexport const memberTuple = [function self() { return self; }] as const;\nexport const memberArray = [function self() { return self; }];\nexport const quoted = { \"a-b\": function self() { return self; } };\nexport const numeric = { 0: function self() { return self; } };\nexport const key = Symbol();\nexport const computed = { [key]: function self() { return self; } };\nexport const union = true as boolean ? { next: () => union } : undefined;\nfunction create<T>(value: T) {\n    const result = { value, next: () => result };\n    return result;\n}\nexport const specialized = create(\"text\");\nfunction createIndexed() {\n    const value: { [key: string]: typeof value } = {};\n    return value;\n}\nexport const indexed = createIndexed();\nfunction createMapped<T>() {\n    const value: { [K in keyof T]: typeof value } = null!;\n    return value;\n}\nexport const mapped = createMapped<{ next: unknown }>();\nfunction createAnnotated<T>(value: T) {\n    const node: { value: T; next: () => typeof node } = { value, next: () => node };\n    return node;\n}\nexport const viaAnnotation = createAnnotated(\"text\");\nexport type Link<T> = { value: T; next: Link<T> };\nexport type Callable<T> = { (value: T): Callable<T>; link: Link<T> };\nexport declare const link: Link<string>;\nexport declare const callable: Callable<number>;\nexport const nextLink = link.next;\nexport const nextCallable = callable(1);\nfunction createHidden<T>(value: T) {\n    type Hidden = { value: T; next: Hidden };\n    return null! as Hidden;\n}\nexport const hiddenAlias = createHidden(\"text\");\nexport const siblingHiddenAliases = { first: hiddenAlias, second: hiddenAlias };\nexport const parenthesized = (function self() { return self; });\nexport const asserted = (function self() { return self; }) satisfies () => unknown;\nexport class Methods {\n    static recur() { return Methods.recur; }\n    static \"a-b\"() { return Methods[\"a-b\"]; }\n    static [key]() { return Methods[key]; }\n    recur() { return this.recur; }\n}\nexport function overloaded(value: string): typeof overloaded;\nexport function overloaded(value: number): typeof overloaded;\nexport function overloaded(value: string | number) { return overloaded; }\nexport const nestedOwner = {\n    make<T>(outer: T) {\n        return {\n            nested<U>(inner: U) { return { outer, inner, owner: nestedOwner }; },\n            constrained<U extends T = T>(inner: U) { return { outer, inner, owner: nestedOwner }; },\n            copied<U>(inner: U): { outer: T; inner: U; owner: typeof nestedOwner } {\n                return { outer, inner, owner: nestedOwner };\n            },\n            rest<U>(...values: [U]) { return { outer, inner: values[0], owner: nestedOwner }; },\n        };\n    },\n};\nexport const nestedNumber = nestedOwner.make(1);\ntype Show<T> = { [K in keyof T]: T[K] } & unknown;\ntype Resolve<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? Resolve<M, K> : M[K][P];\n}>;\ndeclare const build: <M>() => { [K in keyof M]: Resolve<M, K> };\nexport const mappedCycle = build<{ Node: { value: number; next: \"ref\" } }>();\nexport const mappedCycleCopy = mappedCycle;\nexport const nestedCycle = { wrapped: build<{ Node: { value: string; next: \"ref\" } }>() };\nexport const cycleKey = Symbol();\nexport const keyedCycles = build<{\n    \"a-b\": { value: string; next: \"ref\" };\n    0: { value: boolean; next: \"ref\" };\n    [cycleKey]: { value: number; next: \"ref\" };\n}>();\nexport const sharedCycles = { first: mappedCycle, second: mappedCycle };\ntype ResolveMutual<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends { ref: infer R extends keyof M } ? ResolveMutual<M, R> : M[K][P];\n}>;\ndeclare const buildMutual: <M>() => { [K in keyof M]: ResolveMutual<M, K> };\nexport const mutualCycle = buildMutual<{\n    First: { value: number; next: { ref: \"Second\" } };\n    Second: { value: string; next: { ref: \"First\" } };\n}>();\ntype ResolveShadowed<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? <T>(shadowedCycle: T) => ResolveShadowed<M, K> : M[K][P];\n}>;\ndeclare const buildShadowed: <M>() => { [K in keyof M]: ResolveShadowed<M, K> };\nexport const shadowedCycle = buildShadowed<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildOptional: <M>() => { [K in keyof M]?: Resolve<M, K> };\nexport const optionalCycle = buildOptional<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildNullable: <M>() => { [K in keyof M]: Resolve<M, K> | null };\nexport const nullableCycle = buildNullable<{ Node: { value: string; next: \"ref\" } }>();\ndeclare const wrap: <T>(value: T) => { required: T; optional?: T | null };\nexport const mixedCycles = wrap(optionalCycle);\nexport const sharedOptionalCycles = { first: optionalCycle, second: optionalCycle };\nexport const nullableKeys = buildNullable<{\n    \"a-b\": { value: string; next: \"ref\" };\n    0: { value: boolean; next: \"ref\" };\n    [cycleKey]: { value: number; next: \"ref\" };\n}>();\ndeclare const buildNullableRoot: <M>() => Resolve<M, keyof M> | null;\nexport const nullableRoot = buildNullableRoot<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildOptionalRoot: <M>() => Resolve<M, keyof M> | undefined;\nexport const optionalRoot = buildOptionalRoot<{ Node: { value: string; next: \"ref\" } }>();\ntype ResolveNullable<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? ResolveNullable<M, K> | null : M[K][P];\n}>;\ndeclare const buildNullableLinks: <M>() => { [K in keyof M]: ResolveNullable<M, K> | null };\nexport const nullableLinks = buildNullableLinks<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildOptionalNullableLinks: <M>() => { [K in keyof M]?: ResolveNullable<M, K> | null };\nexport const optionalNullableLinks = buildOptionalNullableLinks<{ Node: { value: number; next: \"ref\" } }>();\ntype ResolveOptional<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? ResolveOptional<M, K> | undefined : M[K][P];\n}>;\ndeclare const buildNullableOptionalLinks: <M>() => { [K in keyof M]: ResolveOptional<M, K> | null };\nexport const nullableOptionalLinks = buildNullableOptionalLinks<{ Node: { value: number; next: \"ref\" } }>();\ntype ResolveNullish<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? ResolveNullish<M, K> | null | undefined : M[K][P];\n}>;\ndeclare const buildNullishLinks: <M>() => { [K in keyof M]?: ResolveNullish<M, K> | null };\nexport const nullishLinks = buildNullishLinks<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildMixed: <M>() => { [K in keyof M]?: Resolve<M, K> | false | null };\nexport const mixedUnionCycle = buildMixed<{ Node: { value: number; next: \"ref\" } }>();\nexport const _recursive = 1;\nexport const factory = () => function self() { return self; };\nexport function captured<T>(value: T) {\n    const node = { value, next: () => node, consume: (other: T) => node };\n    return node;\n}\nexport function nestedCaptured<T>(outer: T) {\n    return <U>(inner: U) => {\n        const node = {\n            outer, inner, next: () => node,\n            shadow: <T>(value: T) => ({ outer, inner, value, next: node }),\n        };\n        return node;\n    };\n}\nexport function constrained<T extends { value: number }, K extends keyof T>(key: K) {\n    const node = { value: null! as T[K], next: () => node };\n    return node;\n}\nexport function optionalCaptured<T>(value: T) {\n    type Node = { value: T; next: Node };\n    return null! as { node?: Node | false | null };\n}\nexport function annotatedCaptured<T>(value: T) {\n    const node: { value: typeof value; next: typeof node } = { value, next: null! };\n    return node;\n}\nexport function recursiveTuple<T>(value: T) {\n    type Tuple = readonly [T, Tuple];\n    return null! as Tuple;\n}\nexport function inferredCaptured<T>() {\n    type Node<V> = { value: V; next: Node<V> };\n    return null! as (T extends () => infer U ? Node<U> : never);\n}\nexport function mappedCaptured<T>() {\n    type Node = { [K in keyof T]: { value: T[K]; next: Node } };\n    return null! as Node;\n}\nexport function freshGeneric<T>(unused: T) {\n    const recur = <U>(value: U) => recur;\n    return recur;\n}\nexport function mutualCaptured<T, U>(left: T, right: U) {\n    type Left = { left: T; next: Right };\n    type Right = { right: U; self: Right; next: Left };\n    return { left: null! as Left, right: null! as Right };\n}\nexport class CapturedClass<T> {\n    constructor(public value: T) {}\n    make<U extends T>(inner: U) {\n        const node = { outer: this.value, inner, next: () => node };\n        return node;\n    }\n}\nexport function covariantClass() {\n    return class Node<out T> {\n        value!: T;\n        next(): Node<T> { return this; }\n    };\n}\nexport function contravariantClass() {\n    return class Node<in T> {\n        consume!: (value: T) => void;\n        next(): Node<T> { return this; }\n    };\n}\nexport namespace Nested {\n    export function captured<T>(value: T) {\n        const node = { value, next: () => node };\n        return node;\n    }\n}\ntype NonNullable<T> = \"shadowed\";\n// comment-only edit\n",
      "signature": "9ad2fef9da811fedb01df90f166a1cd4-import { f } from \"./recursive-conditional-utils\";\nexport declare const conditionalAliasCopy: typeof f;\nexport declare function anonymousThisReturn(): any;\nexport declare const arrow: () => typeof arrow;\nexport declare const expression: () => typeof expression;\nexport declare const first: () => typeof second;\nexport declare const second: () => typeof first;\nexport declare const generic: <T>(value: T) => typeof generic;\nexport declare const objectReturn: () => {\n    call: typeof objectReturn;\n};\nexport declare const tupleReturn: () => readonly [typeof tupleReturn];\nexport declare const shadowed: (shadowed: number) => typeof import(\".\").shadowed;\nexport declare const object: {\n    value: number;\n    next: () => typeof object;\n};\nexport declare const method: {\n    value: number;\n    next(): typeof method;\n};\nexport declare const accessor: {\n    value: number;\n    readonly next: typeof accessor;\n};\nexport declare const tuple: readonly [() => typeof tuple];\nexport declare const array: (() => typeof array)[];\nexport declare const nested: {\n    inner: {\n        next(): {\n            next(): (typeof nested)[\"inner\"];\n        };\n    };\n};\nexport declare const memberTuple: readonly [() => (typeof memberTuple)[0]];\nexport declare const memberArray: (() => (typeof memberArray)[0])[];\nexport declare const quoted: {\n    \"a-b\": () => (typeof quoted)[\"a-b\"];\n};\nexport declare const numeric: {\n    0: () => (typeof numeric)[0];\n};\nexport declare const key: unique symbol;\nexport declare const computed: {\n    [key]: () => (typeof computed)[typeof key];\n};\nexport declare const union: {\n    next: () => typeof union;\n} | undefined;\nexport declare const specialized: {\n    value: string;\n    next: () => typeof specialized;\n};\nexport declare const indexed: {\n    [key: string]: typeof indexed;\n};\nexport declare const mapped: {\n    next: typeof mapped;\n};\nexport declare const viaAnnotation: {\n    value: string;\n    next: () => typeof viaAnnotation;\n};\nexport type Link<T> = {\n    value: T;\n    next: Link<T>;\n};\nexport type Callable<T> = {\n    (value: T): Callable<T>;\n    link: Link<T>;\n};\nexport declare const link: Link<string>;\nexport declare const callable: Callable<number>;\nexport declare const nextLink: Link<string>;\nexport declare const nextCallable: Callable<number>;\nexport declare const hiddenAlias: {\n    value: string;\n    next: typeof hiddenAlias;\n};\nexport declare const siblingHiddenAliases: {\n    first: {\n        value: string;\n        next: (typeof siblingHiddenAliases)[\"first\"];\n    };\n    second: {\n        value: string;\n        next: (typeof siblingHiddenAliases)[\"second\"];\n    };\n};\nexport declare const parenthesized: () => typeof parenthesized;\nexport declare const asserted: () => typeof asserted;\nexport declare class Methods {\n    static recur(): (typeof Methods)[\"recur\"];\n    static \"a-b\"(): (typeof Methods)[\"a-b\"];\n    static [key](): (typeof Methods)[typeof key];\n    recur(): Methods[\"recur\"];\n}\nexport declare function overloaded(value: string): typeof overloaded;\nexport declare function overloaded(value: number): typeof overloaded;\nexport declare const nestedOwner: {\n    make<T>(outer: T): {\n        nested<U>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        constrained<U extends T = T>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        copied<U>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        rest<U>(values_0: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n    };\n};\nexport declare const nestedNumber: {\n    nested<U>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n    constrained<U extends number = number>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n    copied<U>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: typeof nestedOwner;\n    };\n    rest<U>(values_0: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n};\nexport declare const mappedCycle: any;\nexport declare const mappedCycleCopy: any;\nexport declare const nestedCycle: any;\nexport declare const cycleKey: unique symbol;\nexport declare const keyedCycles: any;\nexport declare const sharedCycles: any;\nexport declare const mutualCycle: any;\nexport declare const shadowedCycle: any;\nexport declare const optionalCycle: any;\nexport declare const nullableCycle: any;\nexport declare const mixedCycles: any;\nexport declare const sharedOptionalCycles: any;\nexport declare const nullableKeys: any;\nexport declare const nullableRoot: any;\nexport declare const optionalRoot: any;\nexport declare const nullableLinks: any;\nexport declare const optionalNullableLinks: any;\nexport declare const nullableOptionalLinks: any;\nexport declare const nullishLinks: any;\nexport declare const mixedUnionCycle: any;\nexport declare const _recursive = 1;\nexport declare const factory: any;\nexport declare function captured<T>(value: T): any;\nexport declare function nestedCaptured<T>(outer: T): any;\nexport declare function constrained<T extends {\n    value: number;\n}, K extends keyof T>(key: K): any;\nexport declare function optionalCaptured<T>(value: T): any;\nexport declare function annotatedCaptured<T>(value: T): any;\nexport declare function recursiveTuple<T>(value: T): any;\nexport declare function inferredCaptured<T>(): any;\nexport declare function mappedCaptured<T>(): any;\nexport declare function freshGeneric<T>(unused: T): any;\nexport declare function mutualCaptured<T, U>(left: T, right: U): any;\nexport declare class CapturedClass<T> {\n    value: T;\n    constructor(value: T);\n    make<U extends T>(inner: U): any;\n}\nexport declare function covariantClass(): any;\nexport declare function contravariantClass(): any;\nexport declare namespace Nested {\n    function captured<T>(value: T): any;\n}\n\n(106,19): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nanonymousThisReturn\n\n(3949,11): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nmappedCycle\n\n(4027,15): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nmappedCycleCopy\n\n(4071,11): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nnestedCycle\n\n(4196,11): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nkeyedCycles\n\n(4368,12): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nsharedCycles\n\n(4677,11): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nmutualCycle\n\n(5076,13): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nshadowedCycle\n\n(5238,13): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\noptionalCycle\n\n(5406,13): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nnullableCycle\n\n(5569,11): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nmixedCycles\n\n(5617,20): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nsharedOptionalCycles\n\n(5702,12): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nnullableKeys\n\n(5953,12): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nnullableRoot\n\n(6119,12): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\noptionalRoot\n\n(6446,13): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nnullableLinks\n\n(6641,21): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\noptionalNullableLinks\n\n(6999,21): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nnullableOptionalLinks\n\n(7353,12): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nnullishLinks\n\n(7530,15): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nmixedUnionCycle\n\n(7646,7): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nfactory\n\n(7712,8): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\ncaptured\n\n(7846,14): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nnestedCaptured\n\n(8106,11): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nconstrained\n\n(8272,16): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\noptionalCaptured\n\n(8416,17): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nannotatedCaptured\n\n(8569,14): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nrecursiveTuple\n\n(8682,16): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\ninferredCaptured\n\n(8837,14): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nmappedCaptured\n\n(8968,12): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nfreshGeneric\n\n(9075,14): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nmutualCaptured\n\n(9348,4): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nmake\n\n(9492,14): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\ncovariantClass\n\n(9627,18): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\ncontravariantClass\n\n(9814,8): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\ncaptured\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "90c799933358055d40b311c2862a4ccf-import { f } from \"./recursive-conditional-utils\";\nexport const conditionalAliasCopy = f;\nexport function anonymousThisReturn() {\n    return {\n        relyingOnThis() {\n            return this;\n        },\n    };\n}\nexport const arrow = () => arrow;\nexport const expression = function self() { return self; };\nexport const first = () => second;\nexport const second = () => first;\nexport const generic = <T>(value: T) => generic;\nexport const objectReturn = () => ({ call: objectReturn });\nexport const tupleReturn = () => [tupleReturn] as const;\nexport const shadowed = function self(shadowed: number) { return self; };\nexport const object = { value: 1, next: () => object };\nexport const method = { value: 1, next() { return method; } };\nexport const accessor = { value: 1, get next() { return accessor; } };\nexport const tuple = [() => tuple] as const;\nexport const array = [() => array];\nexport const nested = { inner: { next() { return nested.inner; } } };\nexport const memberTuple = [function self() { return self; }] as const;\nexport const memberArray = [function self() { return self; }];\nexport const quoted = { \"a-b\": function self() { return self; } };\nexport const numeric = { 0: function self() { return self; } };\nexport const key = Symbol();\nexport const computed = { [key]: function self() { return self; } };\nexport const union = true as boolean ? { next: () => union } : undefined;\nfunction create<T>(value: T) {\n    const result = { value, next: () => result };\n    return result;\n}\nexport const specialized = create(\"text\");\nfunction createIndexed() {\n    const value: { [key: string]: typeof value } = {};\n    return value;\n}\nexport const indexed = createIndexed();\nfunction createMapped<T>() {\n    const value: { [K in keyof T]: typeof value } = null!;\n    return value;\n}\nexport const mapped = createMapped<{ next: unknown }>();\nfunction createAnnotated<T>(value: T) {\n    const node: { value: T; next: () => typeof node } = { value, next: () => node };\n    return node;\n}\nexport const viaAnnotation = createAnnotated(\"text\");\nexport type Link<T> = { value: T; next: Link<T> };\nexport type Callable<T> = { (value: T): Callable<T>; link: Link<T> };\nexport declare const link: Link<string>;\nexport declare const callable: Callable<number>;\nexport const nextLink = link.next;\nexport const nextCallable = callable(1);\nfunction createHidden<T>(value: T) {\n    type Hidden = { value: T; next: Hidden };\n    return null! as Hidden;\n}\nexport const hiddenAlias = createHidden(\"text\");\nexport const siblingHiddenAliases = { first: hiddenAlias, second: hiddenAlias };\nexport const parenthesized = (function self() { return self; });\nexport const asserted = (function self() { return self; }) satisfies () => unknown;\nexport class Methods {\n    static recur() { return Methods.recur; }\n    static \"a-b\"() { return Methods[\"a-b\"]; }\n    static [key]() { return Methods[key]; }\n    recur() { return this.recur; }\n}\nexport function overloaded(value: string): typeof overloaded;\nexport function overloaded(value: number): typeof overloaded;\nexport function overloaded(value: string | number) { return overloaded; }\nexport const nestedOwner = {\n    make<T>(outer: T) {\n        return {\n            nested<U>(inner: U) { return { outer, inner, owner: nestedOwner }; },\n            constrained<U extends T = T>(inner: U) { return { outer, inner, owner: nestedOwner }; },\n            copied<U>(inner: U): { outer: T; inner: U; owner: typeof nestedOwner } {\n                return { outer, inner, owner: nestedOwner };\n            },\n            rest<U>(...values: [U]) { return { outer, inner: values[0], owner: nestedOwner }; },\n        };\n    },\n};\nexport const nestedNumber = nestedOwner.make(1);\ntype Show<T> = { [K in keyof T]: T[K] } & unknown;\ntype Resolve<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? Resolve<M, K> : M[K][P];\n}>;\ndeclare const build: <M>() => { [K in keyof M]: Resolve<M, K> };\nexport const mappedCycle = build<{ Node: { value: number; next: \"ref\" } }>();\nexport const mappedCycleCopy = mappedCycle;\nexport const nestedCycle = { wrapped: build<{ Node: { value: string; next: \"ref\" } }>() };\nexport const cycleKey = Symbol();\nexport const keyedCycles = build<{\n    \"a-b\": { value: string; next: \"ref\" };\n    0: { value: boolean; next: \"ref\" };\n    [cycleKey]: { value: number; next: \"ref\" };\n}>();\nexport const sharedCycles = { first: mappedCycle, second: mappedCycle };\ntype ResolveMutual<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends { ref: infer R extends keyof M } ? ResolveMutual<M, R> : M[K][P];\n}>;\ndeclare const buildMutual: <M>() => { [K in keyof M]: ResolveMutual<M, K> };\nexport const mutualCycle = buildMutual<{\n    First: { value: number; next: { ref: \"Second\" } };\n    Second: { value: string; next: { ref: \"First\" } };\n}>();\ntype ResolveShadowed<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? <T>(shadowedCycle: T) => ResolveShadowed<M, K> : M[K][P];\n}>;\ndeclare const buildShadowed: <M>() => { [K in keyof M]: ResolveShadowed<M, K> };\nexport const shadowedCycle = buildShadowed<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildOptional: <M>() => { [K in keyof M]?: Resolve<M, K> };\nexport const optionalCycle = buildOptional<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildNullable: <M>() => { [K in keyof M]: Resolve<M, K> | null };\nexport const nullableCycle = buildNullable<{ Node: { value: string; next: \"ref\" } }>();\ndeclare const wrap: <T>(value: T) => { required: T; optional?: T | null };\nexport const mixedCycles = wrap(optionalCycle);\nexport const sharedOptionalCycles = { first: optionalCycle, second: optionalCycle };\nexport const nullableKeys = buildNullable<{\n    \"a-b\": { value: string; next: \"ref\" };\n    0: { value: boolean; next: \"ref\" };\n    [cycleKey]: { value: number; next: \"ref\" };\n}>();\ndeclare const buildNullableRoot: <M>() => Resolve<M, keyof M> | null;\nexport const nullableRoot = buildNullableRoot<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildOptionalRoot: <M>() => Resolve<M, keyof M> | undefined;\nexport const optionalRoot = buildOptionalRoot<{ Node: { value: string; next: \"ref\" } }>();\ntype ResolveNullable<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? ResolveNullable<M, K> | null : M[K][P];\n}>;\ndeclare const buildNullableLinks: <M>() => { [K in keyof M]: ResolveNullable<M, K> | null };\nexport const nullableLinks = buildNullableLinks<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildOptionalNullableLinks: <M>() => { [K in keyof M]?: ResolveNullable<M, K> | null };\nexport const optionalNullableLinks = buildOptionalNullableLinks<{ Node: { value: number; next: \"ref\" } }>();\ntype ResolveOptional<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? ResolveOptional<M, K> | undefined : M[K][P];\n}>;\ndeclare const buildNullableOptionalLinks: <M>() => { [K in keyof M]: ResolveOptional<M, K> | null };\nexport const nullableOptionalLinks = buildNullableOptionalLinks<{ Node: { value: number; next: \"ref\" } }>();\ntype ResolveNullish<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? ResolveNullish<M, K> | null | undefined : M[K][P];\n}>;\ndeclare const buildNullishLinks: <M>() => { [K in keyof M]?: ResolveNullish<M, K> | null };\nexport const nullishLinks = buildNullishLinks<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildMixed: <M>() => { [K in keyof M]?: Resolve<M, K> | false | null };\nexport const mixedUnionCycle = buildMixed<{ Node: { value: number; next: \"ref\" } }>();\nexport const _recursive = 1;\nexport const factory = () => function self() { return self; };\nexport function captured<T>(value: T) {\n    const node = { value, next: () => node, consume: (other: T) => node };\n    return node;\n}\nexport function nestedCaptured<T>(outer: T) {\n    return <U>(inner: U) => {\n        const node = {\n            outer, inner, next: () => node,\n            shadow: <T>(value: T) => ({ outer, inner, value, next: node }),\n        };\n        return node;\n    };\n}\nexport function constrained<T extends { value: number }, K extends keyof T>(key: K) {\n    const node = { value: null! as T[K], next: () => node };\n    return node;\n}\nexport function optionalCaptured<T>(value: T) {\n    type Node = { value: T; next: Node };\n    return null! as { node?: Node | false | null };\n}\nexport function annotatedCaptured<T>(value: T) {\n    const node: { value: typeof value; next: typeof node } = { value, next: null! };\n    return node;\n}\nexport function recursiveTuple<T>(value: T) {\n    type Tuple = readonly [T, Tuple];\n    return null! as Tuple;\n}\nexport function inferredCaptured<T>() {\n    type Node<V> = { value: V; next: Node<V> };\n    return null! as (T extends () => infer U ? Node<U> : never);\n}\nexport function mappedCaptured<T>() {\n    type Node = { [K in keyof T]: { value: T[K]; next: Node } };\n    return null! as Node;\n}\nexport function freshGeneric<T>(unused: T) {\n    const recur = <U>(value: U) => recur;\n    return recur;\n}\nexport function mutualCaptured<T, U>(left: T, right: U) {\n    type Left = { left: T; next: Right };\n    type Right = { right: U; self: Right; next: Left };\n    return { left: null! as Left, right: null! as Right };\n}\nexport class CapturedClass<T> {\n    constructor(public value: T) {}\n    make<U extends T>(inner: U) {\n        const node = { outer: this.value, inner, next: () => node };\n        return node;\n    }\n}\nexport function covariantClass() {\n    return class Node<out T> {\n        value!: T;\n        next(): Node<T> { return this; }\n    };\n}\nexport function contravariantClass() {\n    return class Node<in T> {\n        consume!: (value: T) => void;\n        next(): Node<T> { return this; }\n    };\n}\nexport namespace Nested {\n    export function captured<T>(value: T) {\n        const node = { value, next: () => node };\n        return node;\n    }\n}\ntype NonNullable<T> = \"shadowed\";\n// comment-only edit\n",
        "signature": "9ad2fef9da811fedb01df90f166a1cd4-import { f } from \"./recursive-conditional-utils\";\nexport declare const conditionalAliasCopy: typeof f;\nexport declare function anonymousThisReturn(): any;\nexport declare const arrow: () => typeof arrow;\nexport declare const expression: () => typeof expression;\nexport declare const first: () => typeof second;\nexport declare const second: () => typeof first;\nexport declare const generic: <T>(value: T) => typeof generic;\nexport declare const objectReturn: () => {\n    call: typeof objectReturn;\n};\nexport declare const tupleReturn: () => readonly [typeof tupleReturn];\nexport declare const shadowed: (shadowed: number) => typeof import(\".\").shadowed;\nexport declare const object: {\n    value: number;\n    next: () => typeof object;\n};\nexport declare const method: {\n    value: number;\n    next(): typeof method;\n};\nexport declare const accessor: {\n    value: number;\n    readonly next: typeof accessor;\n};\nexport declare const tuple: readonly [() => typeof tuple];\nexport declare const array: (() => typeof array)[];\nexport declare const nested: {\n    inner: {\n        next(): {\n            next(): (typeof nested)[\"inner\"];\n        };\n    };\n};\nexport declare const memberTuple: readonly [() => (typeof memberTuple)[0]];\nexport declare const memberArray: (() => (typeof memberArray)[0])[];\nexport declare const quoted: {\n    \"a-b\": () => (typeof quoted)[\"a-b\"];\n};\nexport declare const numeric: {\n    0: () => (typeof numeric)[0];\n};\nexport declare const key: unique symbol;\nexport declare const computed: {\n    [key]: () => (typeof computed)[typeof key];\n};\nexport declare const union: {\n    next: () => typeof union;\n} | undefined;\nexport declare const specialized: {\n    value: string;\n    next: () => typeof specialized;\n};\nexport declare const indexed: {\n    [key: string]: typeof indexed;\n};\nexport declare const mapped: {\n    next: typeof mapped;\n};\nexport declare const viaAnnotation: {\n    value: string;\n    next: () => typeof viaAnnotation;\n};\nexport type Link<T> = {\n    value: T;\n    next: Link<T>;\n};\nexport type Callable<T> = {\n    (value: T): Callable<T>;\n    link: Link<T>;\n};\nexport declare const link: Link<string>;\nexport declare const callable: Callable<number>;\nexport declare const nextLink: Link<string>;\nexport declare const nextCallable: Callable<number>;\nexport declare const hiddenAlias: {\n    value: string;\n    next: typeof hiddenAlias;\n};\nexport declare const siblingHiddenAliases: {\n    first: {\n        value: string;\n        next: (typeof siblingHiddenAliases)[\"first\"];\n    };\n    second: {\n        value: string;\n        next: (typeof siblingHiddenAliases)[\"second\"];\n    };\n};\nexport declare const parenthesized: () => typeof parenthesized;\nexport declare const asserted: () => typeof asserted;\nexport declare class Methods {\n    static recur(): (typeof Methods)[\"recur\"];\n    static \"a-b\"(): (typeof Methods)[\"a-b\"];\n    static [key](): (typeof Methods)[typeof key];\n    recur(): Methods[\"recur\"];\n}\nexport declare function overloaded(value: string): typeof overloaded;\nexport declare function overloaded(value: number): typeof overloaded;\nexport declare const nestedOwner: {\n    make<T>(outer: T): {\n        nested<U>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        constrained<U extends T = T>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        copied<U>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        rest<U>(values_0: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n    };\n};\nexport declare const nestedNumber: {\n    nested<U>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n    constrained<U extends number = number>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n    copied<U>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: typeof nestedOwner;\n    };\n    rest<U>(values_0: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n};\nexport declare const mappedCycle: any;\nexport declare const mappedCycleCopy: any;\nexport declare const nestedCycle: any;\nexport declare const cycleKey: unique symbol;\nexport declare const keyedCycles: any;\nexport declare const sharedCycles: any;\nexport declare const mutualCycle: any;\nexport declare const shadowedCycle: any;\nexport declare const optionalCycle: any;\nexport declare const nullableCycle: any;\nexport declare const mixedCycles: any;\nexport declare const sharedOptionalCycles: any;\nexport declare const nullableKeys: any;\nexport declare const nullableRoot: any;\nexport declare const optionalRoot: any;\nexport declare const nullableLinks: any;\nexport declare const optionalNullableLinks: any;\nexport declare const nullableOptionalLinks: any;\nexport declare const nullishLinks: any;\nexport declare const mixedUnionCycle: any;\nexport declare const _recursive = 1;\nexport declare const factory: any;\nexport declare function captured<T>(value: T): any;\nexport declare function nestedCaptured<T>(outer: T): any;\nexport declare function constrained<T extends {\n    value: number;\n}, K extends keyof T>(key: K): any;\nexport declare function optionalCaptured<T>(value: T): any;\nexport declare function annotatedCaptured<T>(value: T): any;\nexport declare function recursiveTuple<T>(value: T): any;\nexport declare function inferredCaptured<T>(): any;\nexport declare function mappedCaptured<T>(): any;\nexport declare function freshGeneric<T>(unused: T): any;\nexport declare function mutualCaptured<T, U>(left: T, right: U): any;\nexport declare class CapturedClass<T> {\n    value: T;\n    constructor(value: T);\n    make<U extends T>(inner: U): any;\n}\nexport declare function covariantClass(): any;\nexport declare function contravariantClass(): any;\nexport declare namespace Nested {\n    function captured<T>(value: T): any;\n}\n\n(106,19): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nanonymousThisReturn\n\n(3949,11): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nmappedCycle\n\n(4027,15): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nmappedCycleCopy\n\n(4071,11): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nnestedCycle\n\n(4196,11): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nkeyedCycles\n\n(4368,12): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nsharedCycles\n\n(4677,11): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nmutualCycle\n\n(5076,13): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nshadowedCycle\n\n(5238,13): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\noptionalCycle\n\n(5406,13): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nnullableCycle\n\n(5569,11): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nmixedCycles\n\n(5617,20): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nsharedOptionalCycles\n\n(5702,12): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nnullableKeys\n\n(5953,12): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nnullableRoot\n\n(6119,12): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\noptionalRoot\n\n(6446,13): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nnullableLinks\n\n(6641,21): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\noptionalNullableLinks\n\n(6999,21): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nnullableOptionalLinks\n\n(7353,12): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nnullishLinks\n\n(7530,15): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nmixedUnionCycle\n\n(7646,7): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nfactory\n\n(7712,8): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\ncaptured\n\n(7846,14): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nnestedCaptured\n\n(8106,11): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nconstrained\n\n(8272,16): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\noptionalCaptured\n\n(8416,17): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nannotatedCaptured\n\n(8569,14): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nrecursiveTuple\n\n(8682,16): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\ninferredCaptured\n\n(8837,14): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nmappedCaptured\n\n(8968,12): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nfreshGeneric\n\n(9075,14): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nmutualCaptured\n\n(9348,4): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nmake\n\n(9492,14): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\ncovariantClass\n\n(9627,18): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\ncontravariantClass\n\n(9814,8): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\ncaptured\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../recursive-conditional-utils.ts"
    ]
  ],
  "options": {
    "composite": true,
    "exactOptionalPropertyTypes": true,
    "outDir": "./",
    "strict": true
  },
  "referencedMap": {
    "../index.ts": [
      "../recursive-conditional-utils.ts"
    ]
  },
  "emitDiagnosticsPerFile": [
    [
      "../index.ts",
      [
        {
          "pos": 106,
          "end": 125,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "anonymousThisReturn"
          ]
        },
        {
          "pos": 3949,
          "end": 3960,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "mappedCycle"
          ]
        },
        {
          "pos": 4027,
          "end": 4042,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "mappedCycleCopy"
          ]
        },
        {
          "pos": 4071,
          "end": 4082,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "nestedCycle"
          ]
        },
        {
          "pos": 4196,
          "end": 4207,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "keyedCycles"
          ]
        },
        {
          "pos": 4368,
          "end": 4380,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "sharedCycles"
          ]
        },
        {
          "pos": 4677,
          "end": 4688,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "mutualCycle"
          ]
        },
        {
          "pos": 5076,
          "end": 5089,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "shadowedCycle"
          ]
        },
        {
          "pos": 5238,
          "end": 5251,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "optionalCycle"
          ]
        },
        {
          "pos": 5406,
          "end": 5419,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "nullableCycle"
          ]
        },
        {
          "pos": 5569,
          "end": 5580,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "mixedCycles"
          ]
        },
        {
          "pos": 5617,
          "end": 5637,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "sharedOptionalCycles"
          ]
        },
        {
          "pos": 5702,
          "end": 5714,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "nullableKeys"
          ]
        },
        {
          "pos": 5953,
          "end": 5965,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "nullableRoot"
          ]
        },
        {
          "pos": 6119,
          "end": 6131,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "optionalRoot"
          ]
        },
        {
          "pos": 6446,
          "end": 6459,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "nullableLinks"
          ]
        },
        {
          "pos": 6641,
          "end": 6662,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "optionalNullableLinks"
          ]
        },
        {
          "pos": 6999,
          "end": 7020,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "nullableOptionalLinks"
          ]
        },
        {
          "pos": 7353,
          "end": 7365,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "nullishLinks"
          ]
        },
        {
          "pos": 7530,
          "end": 7545,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "mixedUnionCycle"
          ]
        },
        {
          "pos": 7646,
          "end": 7653,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "factory"
          ]
        },
        {
          "pos": 7712,
          "end": 7720,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "captured"
          ]
        },
        {
          "pos": 7846,
          "end": 7860,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "nestedCaptured"
          ]
        },
        {
          "pos": 8106,
          "end": 8117,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "constrained"
          ]
        },
        {
          "pos": 8272,
          "end": 8288,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "optionalCaptured"
          ]
        },
        {
          "pos": 8416,
          "end": 8433,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "annotatedCaptured"
          ]
        },
        {
          "pos": 8569,
          "end": 8583,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "recursiveTuple"
          ]
        },
        {
          "pos": 8682,
          "end": 8698,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "inferredCaptured"
          ]
        },
        {
          "pos": 8837,
          "end": 8851,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "mappedCaptured"
          ]
        },
        {
          "pos": 8968,
          "end": 8980,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "freshGeneric"
          ]
        },
        {
          "pos": 9075,
          "end": 9089,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "mutualCaptured"
          ]
        },
        {
          "pos": 9348,
          "end": 9352,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "make"
          ]
        },
        {
          "pos": 9492,
          "end": 9506,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "covariantClass"
          ]
        },
        {
          "pos": 9627,
          "end": 9645,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "contravariantClass"
          ]
        },
        {
          "pos": 9814,
          "end": 9822,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "captured"
          ]
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./recursive-conditional-utils.d.ts",
  "emitSignatures": [
    {
      "file": "../index.ts",
      "original": 3
    }
  ],
  "size": 32636
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/producer/index.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/producer/index.ts

consumer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/project/consumer/index.ts
Signatures::


Edit [2]:: no change

tsgo --build consumer
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mproducer/index.ts[0m:[93m3[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'anonymousThisReturn' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m3[0m export function anonymousThisReturn() {
[7m [0m [91m                ~~~~~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m92[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'mappedCycle' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m92[0m export const mappedCycle = build<{ Node: { value: number; next: "ref" } }>();
[7m  [0m [91m             ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m93[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'mappedCycleCopy' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m93[0m export const mappedCycleCopy = mappedCycle;
[7m  [0m [91m             ~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m94[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'nestedCycle' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m94[0m export const nestedCycle = { wrapped: build<{ Node: { value: string; next: "ref" } }>() };
[7m  [0m [91m             ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m96[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'keyedCycles' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m96[0m export const keyedCycles = build<{
[7m  [0m [91m             ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m101[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'sharedCycles' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m101[0m export const sharedCycles = { first: mappedCycle, second: mappedCycle };
[7m   [0m [91m             ~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m106[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'mutualCycle' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m106[0m export const mutualCycle = buildMutual<{
[7m   [0m [91m             ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m114[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'shadowedCycle' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m114[0m export const shadowedCycle = buildShadowed<{ Node: { value: number; next: "ref" } }>();
[7m   [0m [91m             ~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m116[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'optionalCycle' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m116[0m export const optionalCycle = buildOptional<{ Node: { value: number; next: "ref" } }>();
[7m   [0m [91m             ~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m118[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'nullableCycle' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m118[0m export const nullableCycle = buildNullable<{ Node: { value: string; next: "ref" } }>();
[7m   [0m [91m             ~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m120[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'mixedCycles' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m120[0m export const mixedCycles = wrap(optionalCycle);
[7m   [0m [91m             ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m121[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'sharedOptionalCycles' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m121[0m export const sharedOptionalCycles = { first: optionalCycle, second: optionalCycle };
[7m   [0m [91m             ~~~~~~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m122[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'nullableKeys' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m122[0m export const nullableKeys = buildNullable<{
[7m   [0m [91m             ~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m128[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'nullableRoot' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m128[0m export const nullableRoot = buildNullableRoot<{ Node: { value: number; next: "ref" } }>();
[7m   [0m [91m             ~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m130[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'optionalRoot' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m130[0m export const optionalRoot = buildOptionalRoot<{ Node: { value: string; next: "ref" } }>();
[7m   [0m [91m             ~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m135[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'nullableLinks' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m135[0m export const nullableLinks = buildNullableLinks<{ Node: { value: number; next: "ref" } }>();
[7m   [0m [91m             ~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m137[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'optionalNullableLinks' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m137[0m export const optionalNullableLinks = buildOptionalNullableLinks<{ Node: { value: number; next: "ref" } }>();
[7m   [0m [91m             ~~~~~~~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m142[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'nullableOptionalLinks' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m142[0m export const nullableOptionalLinks = buildNullableOptionalLinks<{ Node: { value: number; next: "ref" } }>();
[7m   [0m [91m             ~~~~~~~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m147[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'nullishLinks' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m147[0m export const nullishLinks = buildNullishLinks<{ Node: { value: number; next: "ref" } }>();
[7m   [0m [91m             ~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m149[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'mixedUnionCycle' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m149[0m export const mixedUnionCycle = buildMixed<{ Node: { value: number; next: "ref" } }>();
[7m   [0m [91m             ~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m151[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'factory' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m151[0m export const factory = () => function self() { return self; };
[7m   [0m [91m             ~~~~~~~[0m

[96mproducer/index.ts[0m:[93m152[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'captured' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m152[0m export function captured<T>(value: T) {
[7m   [0m [91m                ~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m156[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'nestedCaptured' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m156[0m export function nestedCaptured<T>(outer: T) {
[7m   [0m [91m                ~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m165[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'constrained' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m165[0m export function constrained<T extends { value: number }, K extends keyof T>(key: K) {
[7m   [0m [91m                ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m169[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'optionalCaptured' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m169[0m export function optionalCaptured<T>(value: T) {
[7m   [0m [91m                ~~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m173[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'annotatedCaptured' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m173[0m export function annotatedCaptured<T>(value: T) {
[7m   [0m [91m                ~~~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m177[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'recursiveTuple' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m177[0m export function recursiveTuple<T>(value: T) {
[7m   [0m [91m                ~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m181[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'inferredCaptured' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m181[0m export function inferredCaptured<T>() {
[7m   [0m [91m                ~~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m185[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'mappedCaptured' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m185[0m export function mappedCaptured<T>() {
[7m   [0m [91m                ~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m189[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'freshGeneric' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m189[0m export function freshGeneric<T>(unused: T) {
[7m   [0m [91m                ~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m193[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'mutualCaptured' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m193[0m export function mutualCaptured<T, U>(left: T, right: U) {
[7m   [0m [91m                ~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m200[0m:[93m5[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'make' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m200[0m     make<U extends T>(inner: U) {
[7m   [0m [91m    ~~~~[0m

[96mproducer/index.ts[0m:[93m205[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'covariantClass' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m205[0m export function covariantClass() {
[7m   [0m [91m                ~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m211[0m:[93m17[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'contravariantClass' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m211[0m export function contravariantClass() {
[7m   [0m [91m                ~~~~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m218[0m:[93m21[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'captured' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m218[0m     export function captured<T>(value: T) {
[7m   [0m [91m                    ~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m1[0m:[93m59[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m1[0m import { conditionalAliasCopy, anonymousThisReturn } from "../producer/dist/index.js";
[7m [0m [91m                                                          ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m2[0m:[93m88[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m2[0m import { arrow, expression, first, generic, objectReturn, tupleReturn, shadowed } from "../producer/dist/index.js";
[7m [0m [91m                                                                                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m3[0m:[93m64[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m3[0m import { object, method, accessor, tuple, array, nested } from "../producer/dist/index.js";
[7m [0m [91m                                                               ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m4[0m:[93m94[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m4[0m import { memberTuple, memberArray, quoted, numeric, key, computed, union, specialized } from "../producer/dist/index.js";
[7m [0m [91m                                                                                             ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m5[0m:[93m48[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m5[0m import { indexed, mapped, viaAnnotation } from "../producer/dist/index.js";
[7m [0m [91m                                               ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m6[0m:[93m86[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m6[0m import { nextLink, nextCallable, parenthesized, asserted, Methods, overloaded } from "../producer/dist/index.js";
[7m [0m [91m                                                                                     ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m7[0m:[93m51[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m7[0m import { hiddenAlias, siblingHiddenAliases } from "../producer/dist/index.js";
[7m [0m [91m                                                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m8[0m:[93m30[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m8[0m import { nestedNumber } from "../producer/dist/index.js";
[7m [0m [91m                             ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m9[0m:[93m124[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m9[0m import { mappedCycle, mappedCycleCopy, nestedCycle, cycleKey, keyedCycles, sharedCycles, mutualCycle, shadowedCycle } from "../producer/dist/index.js";
[7m [0m [91m                                                                                                                           ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m10[0m:[93m152[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m10[0m import { optionalCycle, nullableCycle, mixedCycles, sharedOptionalCycles, nullableKeys, nullableRoot, optionalRoot, nullableLinks, nullishLinks } from "../producer/dist/index.js";
[7m  [0m [91m                                                                                                                                                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m11[0m:[93m62[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m11[0m import { optionalNullableLinks, nullableOptionalLinks } from "../producer/dist/index.js";
[7m  [0m [91m                                                             ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m12[0m:[93m142[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m12[0m import { mixedUnionCycle, factory, captured, nestedCaptured, constrained, optionalCaptured, annotatedCaptured, recursiveTuple, Nested } from "../producer/dist/index.js";
[7m  [0m [91m                                                                                                                                             ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m13[0m:[93m80[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m13[0m import { inferredCaptured, mappedCaptured, freshGeneric, mutualCaptured } from "../producer/dist/index.js";
[7m  [0m [91m                                                                               ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m14[0m:[93m31[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m14[0m import { CapturedClass } from "../producer/dist/index.js";
[7m  [0m [91m                              ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m15[0m:[93m52[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m15[0m import { covariantClass, contravariantClass } from "../producer/dist/index.js";
[7m  [0m [91m                                                   ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 50 errors in 2 files.

Errors  Files
    15  consumer/index.ts[90m:1[0m
    35  producer/index.ts[90m:3[0m

//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo] *rewrite with same content*
//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*

producer/tsconfig.json::
SemanticDiagnostics::
Signatures::

consumer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/project/consumer/index.ts
Signatures::
