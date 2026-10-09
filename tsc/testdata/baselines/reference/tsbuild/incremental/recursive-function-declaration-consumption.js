currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/consumer/index.ts] *new* 
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
//// [/home/src/workspaces/project/consumer/tsconfig.json] *new* 
{
					"compilerOptions": { "strict": true, "exactOptionalPropertyTypes": true, "noEmit": true },
					"references": [{ "path": "../producer" }]
				}
//// [/home/src/workspaces/project/producer/index.ts] *new* 
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
//// [/home/src/workspaces/project/producer/tsconfig.json] *new* 
{
					"compilerOptions": { "strict": true, "exactOptionalPropertyTypes": true, "composite": true, "outDir": "dist" }
				}

tsgo --build consumer
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mconsumer/index.ts[0m:[93m158[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => ...' is not assignable to type 'number'.

[7m158[0m const invalid: number = arrow()()();
[7m   [0m [91m      ~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m159[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => ...' is not assignable to type 'number'.

[7m159[0m const invalidExpression: number = expression()()();
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m160[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => { call: ...; }' is not assignable to type 'number'.

[7m160[0m const invalidObject: number = objectReturn().call;
[7m   [0m [91m      ~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m161[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => readonly [...]' is not assignable to type 'number'.

[7m161[0m const invalidTuple: number = tupleReturn()[0];
[7m   [0m [91m      ~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m162[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '(shadowed: number) => ...' is not assignable to type 'number'.

[7m162[0m const invalidShadowed: number = shadowed(1);
[7m   [0m [91m      ~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m163[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m163[0m const invalidObjectValue: string = object.next().value;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m164[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'readonly [() => ...]' is not assignable to type 'number'.

[7m164[0m const invalidTupleValue: number = tuple[0]();
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m165[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m165[0m const invalidSpecialized: number = specialized.next().value;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m166[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '{ next: ...; }' is not assignable to type 'number'.

[7m166[0m const invalidMapped: number = mapped.next;
[7m   [0m [91m      ~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m167[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m167[0m const invalidAnnotation: number = viaAnnotation.next().value;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m168[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m168[0m const invalidLink: number = nextLink.next.value;
[7m   [0m [91m      ~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m169[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m169[0m const invalidCallable: string = nextCallable(1).link.value;
[7m   [0m [91m      ~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m170[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m170[0m const invalidHiddenValue: number = hiddenAlias.next.next.value;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m171[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => (typeof Methods)["recur"]' is not assignable to type 'number'.

[7m171[0m const invalidMethod: number = Methods.recur()();
[7m   [0m [91m      ~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m172[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => (typeof Methods)[typeof key]' is not assignable to type 'number'.

[7m172[0m const invalidComputedMethod: number = Methods[key]()();
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m173[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'boolean'.

[7m173[0m const invalidNestedOuter: boolean = nestedString.outer;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m174[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m174[0m const invalidNestedInner: string = nestedString.inner;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m175[0m:[93m26[0m - [91merror[0m[90m TS2345: [0mArgument of type 'string' is not assignable to parameter of type 'number'.

[7m175[0m nestedNumber.constrained("wrong");
[7m   [0m [91m                         ~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m176[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m176[0m const invalidMappedCycleValue: string = mappedCycle.Node.next.next.value;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m177[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m177[0m const invalidMutualCycleValue: number = mutualCycle.First.next.value;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m178[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m178[0m const invalidShadowedMappedValue: string = shadowedCycle.Node.next(1).next("text").value;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m179[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'null' is not assignable to type '_recursive_1'.

[7m179[0m const invalidNullNext: OptionalNode["next"] = null;
[7m   [0m [91m      ~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m180[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'undefined' is not assignable to type '_recursive_1'.

[7m180[0m const invalidUndefinedNext: OptionalNode["next"] = undefined;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m181[0m:[93m42[0m - [91merror[0m[90m TS2531: [0mObject is possibly 'null'.

[7m181[0m const invalidNullableLinkValue: number = nullableLinks.Node!.next.value;
[7m   [0m [91m                                         ~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m182[0m:[93m41[0m - [91merror[0m[90m TS2533: [0mObject is possibly 'null' or 'undefined'.

[7m182[0m const invalidNullishLinkValue: number = nullishLinks.Node!.next.value;
[7m   [0m [91m                                        ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m183[0m:[93m26[0m - [91merror[0m[90m TS2345: [0mArgument of type 'number' is not assignable to parameter of type 'string'.

[7m183[0m captured("text").consume(1);
[7m   [0m [91m                         ~[0m

[96mconsumer/index.ts[0m:[93m184[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m184[0m const invalidRecursiveTupleValue: number = recursiveTuple("text")[1][0];
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m185[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m185[0m const invalidCapturedOuter: string = nestedCapturedValue.outer;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m186[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m186[0m const invalidCapturedInner: number = nestedCapturedValue.inner;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m188[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'boolean' is not assignable to type '_recursive_13'.

[7m188[0m const invalidMixedNext: WithoutFalseOrNullish<typeof mixedUnionCycle.Node>["next"] = false;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m189[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m189[0m const invalidInferredCapturedValue: number = inferredCaptured<() => string>().next.value;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m190[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m190[0m const invalidMappedCapturedValue: string = mappedCaptured<{ value: number }>().value.next.value.value;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m191[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'boolean'.

[7m191[0m const invalidMutualCapturedValue: boolean = mutualCaptured(1, "text").right.self.next.left;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m192[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m192[0m const invalidCapturedClassValue: number = capturedClassResult.outer;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m193[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '_recursive_27<unknown>' is not assignable to type '_recursive_27<string>'.
  Type 'unknown' is not assignable to type 'string'.

[7m193[0m const invalidCovariance: typeof covariantString = covariantUnknown.next();
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m194[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '_recursive_28<string>' is not assignable to type '_recursive_28<unknown>'.
  Type 'unknown' is not assignable to type 'string'.

[7m194[0m const invalidContravariance: typeof contravariantUnknown = contravariantString.next();
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~[0m


Found 36 errors in the same file, starting at: consumer/index.ts[90m:158[0m

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
//// [/home/src/workspaces/project/producer/dist/index.d.ts] *new* 
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
type _recursive_12 = {
    value: number;
    next: _recursive_12 | null | undefined;
};
type _recursive_13 = {
    value: number;
    next: _recursive_13;
};
type _recursive_14 = () => _recursive_14;
type _recursive_15<T> = {
    value: T;
    next: () => _recursive_15<T>;
    consume: (other: T) => _recursive_15<T>;
};
type _recursive_16<T, U> = {
    outer: T;
    inner: U;
    next: () => _recursive_16<T, U>;
    shadow: <T_1>(value: T_1) => {
        outer: T;
        inner: U;
        value: T_1;
        next: _recursive_16<T, U>;
    };
};
type _recursive_17<T extends {
    value: number;
}, K extends keyof T> = {
    value: T[K];
    next: () => _recursive_17<T, K>;
};
type _recursive_18<T> = {
    value: T;
    next: _recursive_18<T>;
};
type _recursive_19<T> = {
    value: T;
    next: _recursive_19<T>;
};
type _recursive_20<T> = readonly [T, _recursive_20<T>];
type _recursive_21<U> = {
    value: U;
    next: _recursive_21<U>;
};
type _recursive_22<T> = { [K in keyof T]: {
    value: T[K];
    next: _recursive_22<T>;
}; };
type _recursive_23 = <U>(value: U) => _recursive_23;
type _recursive_24<T, U> = {
    right: U;
    self: _recursive_24<T, U>;
    next: _recursive_25<T, U>;
};
type _recursive_25<T, U> = {
    left: T;
    next: _recursive_24<T, U>;
};
type _recursive_26<T, U extends T> = {
    outer: T;
    inner: U;
    next: () => _recursive_26<T, U>;
};
type _recursive_27<out T> = {
    value: T;
    next(): _recursive_27<T>;
};
type _recursive_28<in T> = {
    consume: (value: T) => void;
    next(): _recursive_28<T>;
};
export declare const arrow: () => typeof arrow;
export declare const expression: () => typeof expression;
export declare const first: () => typeof second;
export declare const second: () => typeof first;
export declare const generic: <T>(value: T) => typeof generic;
export declare const objectReturn: () => {
    call: typeof objectReturn;
};
export declare const tupleReturn: () => readonly [typeof tupleReturn];
export declare const shadowed: (shadowed: number) => typeof import(".").shadowed;
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
export declare const array: (() => typeof array)[];
export declare const nested: {
    inner: {
        next(): {
            next(): (typeof nested)["inner"];
        };
    };
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
export type Link<T> = {
    value: T;
    next: Link<T>;
};
export type Callable<T> = {
    (value: T): Callable<T>;
    link: Link<T>;
};
export declare const link: Link<string>;
export declare const callable: Callable<number>;
export declare const nextLink: Link<string>;
export declare const nextCallable: Callable<number>;
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
export declare const parenthesized: () => typeof parenthesized;
export declare const asserted: () => typeof asserted;
export declare class Methods {
    static recur(): (typeof Methods)["recur"];
    static "a-b"(): (typeof Methods)["a-b"];
    static [key](): (typeof Methods)[typeof key];
    recur(): Methods["recur"];
}
export declare function overloaded(value: string): typeof overloaded;
export declare function overloaded(value: number): typeof overloaded;
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
export declare const shadowedCycle: {
    Node: {
        value: number;
        next: <T>(shadowedCycle: T) => typeof import(".").shadowedCycle["Node"];
    };
};
export declare const optionalCycle: {
    Node?: _recursive_1;
};
export declare const nullableCycle: {
    Node: _recursive_2 | null;
};
export declare const mixedCycles: {
    required: {
        Node?: _recursive_3;
    };
    optional?: {
        Node?: _recursive_3;
    } | null;
};
export declare const sharedOptionalCycles: {
    first: {
        Node?: _recursive_4;
    };
    second: {
        Node?: _recursive_4;
    };
};
export declare const nullableKeys: {
    "a-b": _recursive_5 | null;
    0: _recursive_6 | null;
    [cycleKey]: _recursive_7 | null;
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
    Node?: _recursive_10 | null;
};
export declare const nullableOptionalLinks: {
    Node: _recursive_11 | null;
};
export declare const nullishLinks: {
    Node?: _recursive_12 | null;
};
export declare const mixedUnionCycle: {
    Node?: false | _recursive_13 | null;
};
export declare const _recursive = 1;
export declare const factory: () => () => _recursive_14;
export declare function captured<T>(value: T): _recursive_15<T>;
export declare function nestedCaptured<T>(outer: T): <U>(inner: U) => _recursive_16<T, U>;
export declare function constrained<T extends {
    value: number;
}, K extends keyof T>(key: K): _recursive_17<T, K>;
export declare function optionalCaptured<T>(value: T): {
    node?: _recursive_18<T> | false | null;
};
export declare function annotatedCaptured<T>(value: T): _recursive_19<T>;
export declare function recursiveTuple<T>(value: T): _recursive_20<T>;
export declare function inferredCaptured<T>(): (T extends () => infer U ? _recursive_21<U> : never);
export declare function mappedCaptured<T>(): _recursive_22<T>;
export declare function freshGeneric<T>(unused: T): _recursive_23;
export declare function mutualCaptured<T, U>(left: T, right: U): {
    left: _recursive_25<T, U>;
    right: _recursive_24<T, U>;
};
export declare class CapturedClass<T> {
    value: T;
    constructor(value: T);
    make<U extends T>(inner: U): _recursive_26<T, U>;
}
export declare function covariantClass(): {
    new <T>(): _recursive_27<T>;
};
export declare function contravariantClass(): {
    new <T>(): _recursive_28<T>;
};
export declare namespace Nested {
    type _recursive_29<T> = {
        value: T;
        next: () => _recursive_29<T>;
    };
    export function captured<T>(value: T): _recursive_29<T>;
    export {};
}
export {};

//// [/home/src/workspaces/project/producer/dist/index.js] *new* 
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

//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.es2026.full.d.ts","../index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"0127123bf85d43331672f7890bd05d57-export const arrow = () => arrow;\nexport const expression = function self() { return self; };\nexport const first = () => second;\nexport const second = () => first;\nexport const generic = <T>(value: T) => generic;\nexport const objectReturn = () => ({ call: objectReturn });\nexport const tupleReturn = () => [tupleReturn] as const;\nexport const shadowed = function self(shadowed: number) { return self; };\nexport const object = { value: 1, next: () => object };\nexport const method = { value: 1, next() { return method; } };\nexport const accessor = { value: 1, get next() { return accessor; } };\nexport const tuple = [() => tuple] as const;\nexport const array = [() => array];\nexport const nested = { inner: { next() { return nested.inner; } } };\nexport const memberTuple = [function self() { return self; }] as const;\nexport const memberArray = [function self() { return self; }];\nexport const quoted = { \"a-b\": function self() { return self; } };\nexport const numeric = { 0: function self() { return self; } };\nexport const key = Symbol();\nexport const computed = { [key]: function self() { return self; } };\nexport const union = true as boolean ? { next: () => union } : undefined;\nfunction create<T>(value: T) {\n    const result = { value, next: () => result };\n    return result;\n}\nexport const specialized = create(\"text\");\nfunction createIndexed() {\n    const value: { [key: string]: typeof value } = {};\n    return value;\n}\nexport const indexed = createIndexed();\nfunction createMapped<T>() {\n    const value: { [K in keyof T]: typeof value } = null!;\n    return value;\n}\nexport const mapped = createMapped<{ next: unknown }>();\nfunction createAnnotated<T>(value: T) {\n    const node: { value: T; next: () => typeof node } = { value, next: () => node };\n    return node;\n}\nexport const viaAnnotation = createAnnotated(\"text\");\nexport type Link<T> = { value: T; next: Link<T> };\nexport type Callable<T> = { (value: T): Callable<T>; link: Link<T> };\nexport declare const link: Link<string>;\nexport declare const callable: Callable<number>;\nexport const nextLink = link.next;\nexport const nextCallable = callable(1);\nfunction createHidden<T>(value: T) {\n    type Hidden = { value: T; next: Hidden };\n    return null! as Hidden;\n}\nexport const hiddenAlias = createHidden(\"text\");\nexport const siblingHiddenAliases = { first: hiddenAlias, second: hiddenAlias };\nexport const parenthesized = (function self() { return self; });\nexport const asserted = (function self() { return self; }) satisfies () => unknown;\nexport class Methods {\n    static recur() { return Methods.recur; }\n    static \"a-b\"() { return Methods[\"a-b\"]; }\n    static [key]() { return Methods[key]; }\n    recur() { return this.recur; }\n}\nexport function overloaded(value: string): typeof overloaded;\nexport function overloaded(value: number): typeof overloaded;\nexport function overloaded(value: string | number) { return overloaded; }\nexport const nestedOwner = {\n    make<T>(outer: T) {\n        return {\n            nested<U>(inner: U) { return { outer, inner, owner: nestedOwner }; },\n            constrained<U extends T = T>(inner: U) { return { outer, inner, owner: nestedOwner }; },\n            copied<U>(inner: U): { outer: T; inner: U; owner: typeof nestedOwner } {\n                return { outer, inner, owner: nestedOwner };\n            },\n            rest<U>(...values: [U]) { return { outer, inner: values[0], owner: nestedOwner }; },\n        };\n    },\n};\nexport const nestedNumber = nestedOwner.make(1);\ntype Show<T> = { [K in keyof T]: T[K] } & unknown;\ntype Resolve<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? Resolve<M, K> : M[K][P];\n}>;\ndeclare const build: <M>() => { [K in keyof M]: Resolve<M, K> };\nexport const mappedCycle = build<{ Node: { value: number; next: \"ref\" } }>();\nexport const mappedCycleCopy = mappedCycle;\nexport const nestedCycle = { wrapped: build<{ Node: { value: string; next: \"ref\" } }>() };\nexport const cycleKey = Symbol();\nexport const keyedCycles = build<{\n    \"a-b\": { value: string; next: \"ref\" };\n    0: { value: boolean; next: \"ref\" };\n    [cycleKey]: { value: number; next: \"ref\" };\n}>();\nexport const sharedCycles = { first: mappedCycle, second: mappedCycle };\ntype ResolveMutual<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends { ref: infer R extends keyof M } ? ResolveMutual<M, R> : M[K][P];\n}>;\ndeclare const buildMutual: <M>() => { [K in keyof M]: ResolveMutual<M, K> };\nexport const mutualCycle = buildMutual<{\n    First: { value: number; next: { ref: \"Second\" } };\n    Second: { value: string; next: { ref: \"First\" } };\n}>();\ntype ResolveShadowed<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? <T>(shadowedCycle: T) => ResolveShadowed<M, K> : M[K][P];\n}>;\ndeclare const buildShadowed: <M>() => { [K in keyof M]: ResolveShadowed<M, K> };\nexport const shadowedCycle = buildShadowed<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildOptional: <M>() => { [K in keyof M]?: Resolve<M, K> };\nexport const optionalCycle = buildOptional<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildNullable: <M>() => { [K in keyof M]: Resolve<M, K> | null };\nexport const nullableCycle = buildNullable<{ Node: { value: string; next: \"ref\" } }>();\ndeclare const wrap: <T>(value: T) => { required: T; optional?: T | null };\nexport const mixedCycles = wrap(optionalCycle);\nexport const sharedOptionalCycles = { first: optionalCycle, second: optionalCycle };\nexport const nullableKeys = buildNullable<{\n    \"a-b\": { value: string; next: \"ref\" };\n    0: { value: boolean; next: \"ref\" };\n    [cycleKey]: { value: number; next: \"ref\" };\n}>();\ndeclare const buildNullableRoot: <M>() => Resolve<M, keyof M> | null;\nexport const nullableRoot = buildNullableRoot<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildOptionalRoot: <M>() => Resolve<M, keyof M> | undefined;\nexport const optionalRoot = buildOptionalRoot<{ Node: { value: string; next: \"ref\" } }>();\ntype ResolveNullable<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? ResolveNullable<M, K> | null : M[K][P];\n}>;\ndeclare const buildNullableLinks: <M>() => { [K in keyof M]: ResolveNullable<M, K> | null };\nexport const nullableLinks = buildNullableLinks<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildOptionalNullableLinks: <M>() => { [K in keyof M]?: ResolveNullable<M, K> | null };\nexport const optionalNullableLinks = buildOptionalNullableLinks<{ Node: { value: number; next: \"ref\" } }>();\ntype ResolveOptional<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? ResolveOptional<M, K> | undefined : M[K][P];\n}>;\ndeclare const buildNullableOptionalLinks: <M>() => { [K in keyof M]: ResolveOptional<M, K> | null };\nexport const nullableOptionalLinks = buildNullableOptionalLinks<{ Node: { value: number; next: \"ref\" } }>();\ntype ResolveNullish<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? ResolveNullish<M, K> | null | undefined : M[K][P];\n}>;\ndeclare const buildNullishLinks: <M>() => { [K in keyof M]?: ResolveNullish<M, K> | null };\nexport const nullishLinks = buildNullishLinks<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildMixed: <M>() => { [K in keyof M]?: Resolve<M, K> | false | null };\nexport const mixedUnionCycle = buildMixed<{ Node: { value: number; next: \"ref\" } }>();\nexport const _recursive = 1;\nexport const factory = () => function self() { return self; };\nexport function captured<T>(value: T) {\n    const node = { value, next: () => node, consume: (other: T) => node };\n    return node;\n}\nexport function nestedCaptured<T>(outer: T) {\n    return <U>(inner: U) => {\n        const node = {\n            outer, inner, next: () => node,\n            shadow: <T>(value: T) => ({ outer, inner, value, next: node }),\n        };\n        return node;\n    };\n}\nexport function constrained<T extends { value: number }, K extends keyof T>(key: K) {\n    const node = { value: null! as T[K], next: () => node };\n    return node;\n}\nexport function optionalCaptured<T>(value: T) {\n    type Node = { value: T; next: Node };\n    return null! as { node?: Node | false | null };\n}\nexport function annotatedCaptured<T>(value: T) {\n    const node: { value: typeof value; next: typeof node } = { value, next: null! };\n    return node;\n}\nexport function recursiveTuple<T>(value: T) {\n    type Tuple = readonly [T, Tuple];\n    return null! as Tuple;\n}\nexport function inferredCaptured<T>() {\n    type Node<V> = { value: V; next: Node<V> };\n    return null! as (T extends () => infer U ? Node<U> : never);\n}\nexport function mappedCaptured<T>() {\n    type Node = { [K in keyof T]: { value: T[K]; next: Node } };\n    return null! as Node;\n}\nexport function freshGeneric<T>(unused: T) {\n    const recur = <U>(value: U) => recur;\n    return recur;\n}\nexport function mutualCaptured<T, U>(left: T, right: U) {\n    type Left = { left: T; next: Right };\n    type Right = { right: U; self: Right; next: Left };\n    return { left: null! as Left, right: null! as Right };\n}\nexport class CapturedClass<T> {\n    constructor(public value: T) {}\n    make<U extends T>(inner: U) {\n        const node = { outer: this.value, inner, next: () => node };\n        return node;\n    }\n}\nexport function covariantClass() {\n    return class Node<out T> {\n        value!: T;\n        next(): Node<T> { return this; }\n    };\n}\nexport function contravariantClass() {\n    return class Node<in T> {\n        consume!: (value: T) => void;\n        next(): Node<T> { return this; }\n    };\n}\nexport namespace Nested {\n    export function captured<T>(value: T) {\n        const node = { value, next: () => node };\n        return node;\n    }\n}\ntype NonNullable<T> = \"shadowed\";","signature":"850dc9bfa8257128f209cdd8c49501cd-type _recursive_1 = {\n    value: number;\n    next: _recursive_1;\n};\ntype _recursive_2 = {\n    value: string;\n    next: _recursive_2;\n};\ntype _recursive_3 = {\n    value: number;\n    next: _recursive_3;\n};\ntype _recursive_4 = {\n    value: number;\n    next: _recursive_4;\n};\ntype _recursive_5 = {\n    value: string;\n    next: _recursive_5;\n};\ntype _recursive_6 = {\n    value: boolean;\n    next: _recursive_6;\n};\ntype _recursive_7 = {\n    value: number;\n    next: _recursive_7;\n};\ntype _recursive_8 = {\n    value: number;\n    next: _recursive_8;\n};\ntype _recursive_9 = {\n    value: string;\n    next: _recursive_9;\n};\ntype _recursive_10 = {\n    value: number;\n    next: _recursive_10 | null;\n};\ntype _recursive_11 = {\n    value: number;\n    next: _recursive_11 | undefined;\n};\ntype _recursive_12 = {\n    value: number;\n    next: _recursive_12 | null | undefined;\n};\ntype _recursive_13 = {\n    value: number;\n    next: _recursive_13;\n};\ntype _recursive_14 = () => _recursive_14;\ntype _recursive_15<T> = {\n    value: T;\n    next: () => _recursive_15<T>;\n    consume: (other: T) => _recursive_15<T>;\n};\ntype _recursive_16<T, U> = {\n    outer: T;\n    inner: U;\n    next: () => _recursive_16<T, U>;\n    shadow: <T_1>(value: T_1) => {\n        outer: T;\n        inner: U;\n        value: T_1;\n        next: _recursive_16<T, U>;\n    };\n};\ntype _recursive_17<T extends {\n    value: number;\n}, K extends keyof T> = {\n    value: T[K];\n    next: () => _recursive_17<T, K>;\n};\ntype _recursive_18<T> = {\n    value: T;\n    next: _recursive_18<T>;\n};\ntype _recursive_19<T> = {\n    value: T;\n    next: _recursive_19<T>;\n};\ntype _recursive_20<T> = readonly [T, _recursive_20<T>];\ntype _recursive_21<U> = {\n    value: U;\n    next: _recursive_21<U>;\n};\ntype _recursive_22<T> = { [K in keyof T]: {\n    value: T[K];\n    next: _recursive_22<T>;\n}; };\ntype _recursive_23 = <U>(value: U) => _recursive_23;\ntype _recursive_24<T, U> = {\n    right: U;\n    self: _recursive_24<T, U>;\n    next: _recursive_25<T, U>;\n};\ntype _recursive_25<T, U> = {\n    left: T;\n    next: _recursive_24<T, U>;\n};\ntype _recursive_26<T, U extends T> = {\n    outer: T;\n    inner: U;\n    next: () => _recursive_26<T, U>;\n};\ntype _recursive_27<out T> = {\n    value: T;\n    next(): _recursive_27<T>;\n};\ntype _recursive_28<in T> = {\n    consume: (value: T) => void;\n    next(): _recursive_28<T>;\n};\nexport declare const arrow: () => typeof arrow;\nexport declare const expression: () => typeof expression;\nexport declare const first: () => typeof second;\nexport declare const second: () => typeof first;\nexport declare const generic: <T>(value: T) => typeof generic;\nexport declare const objectReturn: () => {\n    call: typeof objectReturn;\n};\nexport declare const tupleReturn: () => readonly [typeof tupleReturn];\nexport declare const shadowed: (shadowed: number) => typeof import(\".\").shadowed;\nexport declare const object: {\n    value: number;\n    next: () => typeof object;\n};\nexport declare const method: {\n    value: number;\n    next(): typeof method;\n};\nexport declare const accessor: {\n    value: number;\n    readonly next: typeof accessor;\n};\nexport declare const tuple: readonly [() => typeof tuple];\nexport declare const array: (() => typeof array)[];\nexport declare const nested: {\n    inner: {\n        next(): {\n            next(): (typeof nested)[\"inner\"];\n        };\n    };\n};\nexport declare const memberTuple: readonly [() => () => (typeof memberTuple)[0]];\nexport declare const memberArray: (() => (typeof memberArray)[0])[];\nexport declare const quoted: {\n    \"a-b\": () => () => (typeof quoted)[\"a-b\"];\n};\nexport declare const numeric: {\n    0: () => () => (typeof numeric)[0];\n};\nexport declare const key: unique symbol;\nexport declare const computed: {\n    [key]: () => (typeof computed)[typeof key];\n};\nexport declare const union: {\n    next: () => typeof union;\n} | undefined;\nexport declare const specialized: {\n    value: string;\n    next: () => typeof specialized;\n};\nexport declare const indexed: {\n    [key: string]: typeof indexed;\n};\nexport declare const mapped: {\n    next: typeof mapped;\n};\nexport declare const viaAnnotation: {\n    value: string;\n    next: () => typeof viaAnnotation;\n};\nexport type Link<T> = {\n    value: T;\n    next: Link<T>;\n};\nexport type Callable<T> = {\n    (value: T): Callable<T>;\n    link: Link<T>;\n};\nexport declare const link: Link<string>;\nexport declare const callable: Callable<number>;\nexport declare const nextLink: Link<string>;\nexport declare const nextCallable: Callable<number>;\nexport declare const hiddenAlias: {\n    value: string;\n    next: typeof hiddenAlias;\n};\nexport declare const siblingHiddenAliases: {\n    first: {\n        value: string;\n        next: (typeof siblingHiddenAliases)[\"first\"];\n    };\n    second: {\n        value: string;\n        next: (typeof siblingHiddenAliases)[\"second\"];\n    };\n};\nexport declare const parenthesized: () => typeof parenthesized;\nexport declare const asserted: () => typeof asserted;\nexport declare class Methods {\n    static recur(): (typeof Methods)[\"recur\"];\n    static \"a-b\"(): (typeof Methods)[\"a-b\"];\n    static [key](): (typeof Methods)[typeof key];\n    recur(): Methods[\"recur\"];\n}\nexport declare function overloaded(value: string): typeof overloaded;\nexport declare function overloaded(value: number): typeof overloaded;\nexport declare const nestedOwner: {\n    make<T>(outer: T): {\n        nested<U>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        constrained<U extends T = T>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        copied<U>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        rest<U>(values_0: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n    };\n};\nexport declare const nestedNumber: {\n    nested<U>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n    constrained<U extends number = number>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n    copied<U>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: typeof nestedOwner;\n    };\n    rest<U>(values_0: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n};\nexport declare const mappedCycle: {\n    Node: {\n        value: number;\n        next: (typeof mappedCycle)[\"Node\"];\n    };\n};\nexport declare const mappedCycleCopy: {\n    Node: {\n        value: number;\n        next: (typeof mappedCycleCopy)[\"Node\"];\n    };\n};\nexport declare const nestedCycle: {\n    wrapped: {\n        Node: {\n            value: string;\n            next: (typeof nestedCycle)[\"wrapped\"][\"Node\"];\n        };\n    };\n};\nexport declare const cycleKey: unique symbol;\nexport declare const keyedCycles: {\n    \"a-b\": {\n        value: string;\n        next: (typeof keyedCycles)[\"a-b\"];\n    };\n    0: {\n        value: boolean;\n        next: (typeof keyedCycles)[0];\n    };\n    [cycleKey]: {\n        value: number;\n        next: (typeof keyedCycles)[typeof cycleKey];\n    };\n};\nexport declare const sharedCycles: {\n    first: {\n        Node: {\n            value: number;\n            next: (typeof sharedCycles)[\"first\"][\"Node\"];\n        };\n    };\n    second: {\n        Node: {\n            value: number;\n            next: (typeof sharedCycles)[\"second\"][\"Node\"];\n        };\n    };\n};\nexport declare const mutualCycle: {\n    First: {\n        value: number;\n        next: {\n            value: string;\n            next: (typeof mutualCycle)[\"First\"];\n        };\n    };\n    Second: {\n        value: string;\n        next: {\n            value: number;\n            next: (typeof mutualCycle)[\"Second\"];\n        };\n    };\n};\nexport declare const shadowedCycle: {\n    Node: {\n        value: number;\n        next: <T>(shadowedCycle: T) => typeof import(\".\").shadowedCycle[\"Node\"];\n    };\n};\nexport declare const optionalCycle: {\n    Node?: _recursive_1;\n};\nexport declare const nullableCycle: {\n    Node: _recursive_2 | null;\n};\nexport declare const mixedCycles: {\n    required: {\n        Node?: _recursive_3;\n    };\n    optional?: {\n        Node?: _recursive_3;\n    } | null;\n};\nexport declare const sharedOptionalCycles: {\n    first: {\n        Node?: _recursive_4;\n    };\n    second: {\n        Node?: _recursive_4;\n    };\n};\nexport declare const nullableKeys: {\n    \"a-b\": _recursive_5 | null;\n    0: _recursive_6 | null;\n    [cycleKey]: _recursive_7 | null;\n};\nexport declare const nullableRoot: _recursive_8 | null;\nexport declare const optionalRoot: _recursive_9 | undefined;\nexport declare const nullableLinks: {\n    Node: {\n        value: number;\n        next: (typeof nullableLinks)[\"Node\"];\n    } | null;\n};\nexport declare const optionalNullableLinks: {\n    Node?: _recursive_10 | null;\n};\nexport declare const nullableOptionalLinks: {\n    Node: _recursive_11 | null;\n};\nexport declare const nullishLinks: {\n    Node?: _recursive_12 | null;\n};\nexport declare const mixedUnionCycle: {\n    Node?: false | _recursive_13 | null;\n};\nexport declare const _recursive = 1;\nexport declare const factory: () => () => _recursive_14;\nexport declare function captured<T>(value: T): _recursive_15<T>;\nexport declare function nestedCaptured<T>(outer: T): <U>(inner: U) => _recursive_16<T, U>;\nexport declare function constrained<T extends {\n    value: number;\n}, K extends keyof T>(key: K): _recursive_17<T, K>;\nexport declare function optionalCaptured<T>(value: T): {\n    node?: _recursive_18<T> | false | null;\n};\nexport declare function annotatedCaptured<T>(value: T): _recursive_19<T>;\nexport declare function recursiveTuple<T>(value: T): _recursive_20<T>;\nexport declare function inferredCaptured<T>(): (T extends () => infer U ? _recursive_21<U> : never);\nexport declare function mappedCaptured<T>(): _recursive_22<T>;\nexport declare function freshGeneric<T>(unused: T): _recursive_23;\nexport declare function mutualCaptured<T, U>(left: T, right: U): {\n    left: _recursive_25<T, U>;\n    right: _recursive_24<T, U>;\n};\nexport declare class CapturedClass<T> {\n    value: T;\n    constructor(value: T);\n    make<U extends T>(inner: U): _recursive_26<T, U>;\n}\nexport declare function covariantClass(): {\n    new <T>(): _recursive_27<T>;\n};\nexport declare function contravariantClass(): {\n    new <T>(): _recursive_28<T>;\n};\nexport declare namespace Nested {\n    type _recursive_29<T> = {\n        value: T;\n        next: () => _recursive_29<T>;\n    };\n    export function captured<T>(value: T): _recursive_29<T>;\n    export {};\n}\nexport {};\n","impliedNodeFormat":1}],"options":{"composite":true,"exactOptionalPropertyTypes":true,"outDir":"./","strict":true},"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../index.ts"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.es2026.full.d.ts",
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
      "fileName": "../index.ts",
      "version": "0127123bf85d43331672f7890bd05d57-export const arrow = () => arrow;\nexport const expression = function self() { return self; };\nexport const first = () => second;\nexport const second = () => first;\nexport const generic = <T>(value: T) => generic;\nexport const objectReturn = () => ({ call: objectReturn });\nexport const tupleReturn = () => [tupleReturn] as const;\nexport const shadowed = function self(shadowed: number) { return self; };\nexport const object = { value: 1, next: () => object };\nexport const method = { value: 1, next() { return method; } };\nexport const accessor = { value: 1, get next() { return accessor; } };\nexport const tuple = [() => tuple] as const;\nexport const array = [() => array];\nexport const nested = { inner: { next() { return nested.inner; } } };\nexport const memberTuple = [function self() { return self; }] as const;\nexport const memberArray = [function self() { return self; }];\nexport const quoted = { \"a-b\": function self() { return self; } };\nexport const numeric = { 0: function self() { return self; } };\nexport const key = Symbol();\nexport const computed = { [key]: function self() { return self; } };\nexport const union = true as boolean ? { next: () => union } : undefined;\nfunction create<T>(value: T) {\n    const result = { value, next: () => result };\n    return result;\n}\nexport const specialized = create(\"text\");\nfunction createIndexed() {\n    const value: { [key: string]: typeof value } = {};\n    return value;\n}\nexport const indexed = createIndexed();\nfunction createMapped<T>() {\n    const value: { [K in keyof T]: typeof value } = null!;\n    return value;\n}\nexport const mapped = createMapped<{ next: unknown }>();\nfunction createAnnotated<T>(value: T) {\n    const node: { value: T; next: () => typeof node } = { value, next: () => node };\n    return node;\n}\nexport const viaAnnotation = createAnnotated(\"text\");\nexport type Link<T> = { value: T; next: Link<T> };\nexport type Callable<T> = { (value: T): Callable<T>; link: Link<T> };\nexport declare const link: Link<string>;\nexport declare const callable: Callable<number>;\nexport const nextLink = link.next;\nexport const nextCallable = callable(1);\nfunction createHidden<T>(value: T) {\n    type Hidden = { value: T; next: Hidden };\n    return null! as Hidden;\n}\nexport const hiddenAlias = createHidden(\"text\");\nexport const siblingHiddenAliases = { first: hiddenAlias, second: hiddenAlias };\nexport const parenthesized = (function self() { return self; });\nexport const asserted = (function self() { return self; }) satisfies () => unknown;\nexport class Methods {\n    static recur() { return Methods.recur; }\n    static \"a-b\"() { return Methods[\"a-b\"]; }\n    static [key]() { return Methods[key]; }\n    recur() { return this.recur; }\n}\nexport function overloaded(value: string): typeof overloaded;\nexport function overloaded(value: number): typeof overloaded;\nexport function overloaded(value: string | number) { return overloaded; }\nexport const nestedOwner = {\n    make<T>(outer: T) {\n        return {\n            nested<U>(inner: U) { return { outer, inner, owner: nestedOwner }; },\n            constrained<U extends T = T>(inner: U) { return { outer, inner, owner: nestedOwner }; },\n            copied<U>(inner: U): { outer: T; inner: U; owner: typeof nestedOwner } {\n                return { outer, inner, owner: nestedOwner };\n            },\n            rest<U>(...values: [U]) { return { outer, inner: values[0], owner: nestedOwner }; },\n        };\n    },\n};\nexport const nestedNumber = nestedOwner.make(1);\ntype Show<T> = { [K in keyof T]: T[K] } & unknown;\ntype Resolve<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? Resolve<M, K> : M[K][P];\n}>;\ndeclare const build: <M>() => { [K in keyof M]: Resolve<M, K> };\nexport const mappedCycle = build<{ Node: { value: number; next: \"ref\" } }>();\nexport const mappedCycleCopy = mappedCycle;\nexport const nestedCycle = { wrapped: build<{ Node: { value: string; next: \"ref\" } }>() };\nexport const cycleKey = Symbol();\nexport const keyedCycles = build<{\n    \"a-b\": { value: string; next: \"ref\" };\n    0: { value: boolean; next: \"ref\" };\n    [cycleKey]: { value: number; next: \"ref\" };\n}>();\nexport const sharedCycles = { first: mappedCycle, second: mappedCycle };\ntype ResolveMutual<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends { ref: infer R extends keyof M } ? ResolveMutual<M, R> : M[K][P];\n}>;\ndeclare const buildMutual: <M>() => { [K in keyof M]: ResolveMutual<M, K> };\nexport const mutualCycle = buildMutual<{\n    First: { value: number; next: { ref: \"Second\" } };\n    Second: { value: string; next: { ref: \"First\" } };\n}>();\ntype ResolveShadowed<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? <T>(shadowedCycle: T) => ResolveShadowed<M, K> : M[K][P];\n}>;\ndeclare const buildShadowed: <M>() => { [K in keyof M]: ResolveShadowed<M, K> };\nexport const shadowedCycle = buildShadowed<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildOptional: <M>() => { [K in keyof M]?: Resolve<M, K> };\nexport const optionalCycle = buildOptional<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildNullable: <M>() => { [K in keyof M]: Resolve<M, K> | null };\nexport const nullableCycle = buildNullable<{ Node: { value: string; next: \"ref\" } }>();\ndeclare const wrap: <T>(value: T) => { required: T; optional?: T | null };\nexport const mixedCycles = wrap(optionalCycle);\nexport const sharedOptionalCycles = { first: optionalCycle, second: optionalCycle };\nexport const nullableKeys = buildNullable<{\n    \"a-b\": { value: string; next: \"ref\" };\n    0: { value: boolean; next: \"ref\" };\n    [cycleKey]: { value: number; next: \"ref\" };\n}>();\ndeclare const buildNullableRoot: <M>() => Resolve<M, keyof M> | null;\nexport const nullableRoot = buildNullableRoot<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildOptionalRoot: <M>() => Resolve<M, keyof M> | undefined;\nexport const optionalRoot = buildOptionalRoot<{ Node: { value: string; next: \"ref\" } }>();\ntype ResolveNullable<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? ResolveNullable<M, K> | null : M[K][P];\n}>;\ndeclare const buildNullableLinks: <M>() => { [K in keyof M]: ResolveNullable<M, K> | null };\nexport const nullableLinks = buildNullableLinks<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildOptionalNullableLinks: <M>() => { [K in keyof M]?: ResolveNullable<M, K> | null };\nexport const optionalNullableLinks = buildOptionalNullableLinks<{ Node: { value: number; next: \"ref\" } }>();\ntype ResolveOptional<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? ResolveOptional<M, K> | undefined : M[K][P];\n}>;\ndeclare const buildNullableOptionalLinks: <M>() => { [K in keyof M]: ResolveOptional<M, K> | null };\nexport const nullableOptionalLinks = buildNullableOptionalLinks<{ Node: { value: number; next: \"ref\" } }>();\ntype ResolveNullish<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? ResolveNullish<M, K> | null | undefined : M[K][P];\n}>;\ndeclare const buildNullishLinks: <M>() => { [K in keyof M]?: ResolveNullish<M, K> | null };\nexport const nullishLinks = buildNullishLinks<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildMixed: <M>() => { [K in keyof M]?: Resolve<M, K> | false | null };\nexport const mixedUnionCycle = buildMixed<{ Node: { value: number; next: \"ref\" } }>();\nexport const _recursive = 1;\nexport const factory = () => function self() { return self; };\nexport function captured<T>(value: T) {\n    const node = { value, next: () => node, consume: (other: T) => node };\n    return node;\n}\nexport function nestedCaptured<T>(outer: T) {\n    return <U>(inner: U) => {\n        const node = {\n            outer, inner, next: () => node,\n            shadow: <T>(value: T) => ({ outer, inner, value, next: node }),\n        };\n        return node;\n    };\n}\nexport function constrained<T extends { value: number }, K extends keyof T>(key: K) {\n    const node = { value: null! as T[K], next: () => node };\n    return node;\n}\nexport function optionalCaptured<T>(value: T) {\n    type Node = { value: T; next: Node };\n    return null! as { node?: Node | false | null };\n}\nexport function annotatedCaptured<T>(value: T) {\n    const node: { value: typeof value; next: typeof node } = { value, next: null! };\n    return node;\n}\nexport function recursiveTuple<T>(value: T) {\n    type Tuple = readonly [T, Tuple];\n    return null! as Tuple;\n}\nexport function inferredCaptured<T>() {\n    type Node<V> = { value: V; next: Node<V> };\n    return null! as (T extends () => infer U ? Node<U> : never);\n}\nexport function mappedCaptured<T>() {\n    type Node = { [K in keyof T]: { value: T[K]; next: Node } };\n    return null! as Node;\n}\nexport function freshGeneric<T>(unused: T) {\n    const recur = <U>(value: U) => recur;\n    return recur;\n}\nexport function mutualCaptured<T, U>(left: T, right: U) {\n    type Left = { left: T; next: Right };\n    type Right = { right: U; self: Right; next: Left };\n    return { left: null! as Left, right: null! as Right };\n}\nexport class CapturedClass<T> {\n    constructor(public value: T) {}\n    make<U extends T>(inner: U) {\n        const node = { outer: this.value, inner, next: () => node };\n        return node;\n    }\n}\nexport function covariantClass() {\n    return class Node<out T> {\n        value!: T;\n        next(): Node<T> { return this; }\n    };\n}\nexport function contravariantClass() {\n    return class Node<in T> {\n        consume!: (value: T) => void;\n        next(): Node<T> { return this; }\n    };\n}\nexport namespace Nested {\n    export function captured<T>(value: T) {\n        const node = { value, next: () => node };\n        return node;\n    }\n}\ntype NonNullable<T> = \"shadowed\";",
      "signature": "850dc9bfa8257128f209cdd8c49501cd-type _recursive_1 = {\n    value: number;\n    next: _recursive_1;\n};\ntype _recursive_2 = {\n    value: string;\n    next: _recursive_2;\n};\ntype _recursive_3 = {\n    value: number;\n    next: _recursive_3;\n};\ntype _recursive_4 = {\n    value: number;\n    next: _recursive_4;\n};\ntype _recursive_5 = {\n    value: string;\n    next: _recursive_5;\n};\ntype _recursive_6 = {\n    value: boolean;\n    next: _recursive_6;\n};\ntype _recursive_7 = {\n    value: number;\n    next: _recursive_7;\n};\ntype _recursive_8 = {\n    value: number;\n    next: _recursive_8;\n};\ntype _recursive_9 = {\n    value: string;\n    next: _recursive_9;\n};\ntype _recursive_10 = {\n    value: number;\n    next: _recursive_10 | null;\n};\ntype _recursive_11 = {\n    value: number;\n    next: _recursive_11 | undefined;\n};\ntype _recursive_12 = {\n    value: number;\n    next: _recursive_12 | null | undefined;\n};\ntype _recursive_13 = {\n    value: number;\n    next: _recursive_13;\n};\ntype _recursive_14 = () => _recursive_14;\ntype _recursive_15<T> = {\n    value: T;\n    next: () => _recursive_15<T>;\n    consume: (other: T) => _recursive_15<T>;\n};\ntype _recursive_16<T, U> = {\n    outer: T;\n    inner: U;\n    next: () => _recursive_16<T, U>;\n    shadow: <T_1>(value: T_1) => {\n        outer: T;\n        inner: U;\n        value: T_1;\n        next: _recursive_16<T, U>;\n    };\n};\ntype _recursive_17<T extends {\n    value: number;\n}, K extends keyof T> = {\n    value: T[K];\n    next: () => _recursive_17<T, K>;\n};\ntype _recursive_18<T> = {\n    value: T;\n    next: _recursive_18<T>;\n};\ntype _recursive_19<T> = {\n    value: T;\n    next: _recursive_19<T>;\n};\ntype _recursive_20<T> = readonly [T, _recursive_20<T>];\ntype _recursive_21<U> = {\n    value: U;\n    next: _recursive_21<U>;\n};\ntype _recursive_22<T> = { [K in keyof T]: {\n    value: T[K];\n    next: _recursive_22<T>;\n}; };\ntype _recursive_23 = <U>(value: U) => _recursive_23;\ntype _recursive_24<T, U> = {\n    right: U;\n    self: _recursive_24<T, U>;\n    next: _recursive_25<T, U>;\n};\ntype _recursive_25<T, U> = {\n    left: T;\n    next: _recursive_24<T, U>;\n};\ntype _recursive_26<T, U extends T> = {\n    outer: T;\n    inner: U;\n    next: () => _recursive_26<T, U>;\n};\ntype _recursive_27<out T> = {\n    value: T;\n    next(): _recursive_27<T>;\n};\ntype _recursive_28<in T> = {\n    consume: (value: T) => void;\n    next(): _recursive_28<T>;\n};\nexport declare const arrow: () => typeof arrow;\nexport declare const expression: () => typeof expression;\nexport declare const first: () => typeof second;\nexport declare const second: () => typeof first;\nexport declare const generic: <T>(value: T) => typeof generic;\nexport declare const objectReturn: () => {\n    call: typeof objectReturn;\n};\nexport declare const tupleReturn: () => readonly [typeof tupleReturn];\nexport declare const shadowed: (shadowed: number) => typeof import(\".\").shadowed;\nexport declare const object: {\n    value: number;\n    next: () => typeof object;\n};\nexport declare const method: {\n    value: number;\n    next(): typeof method;\n};\nexport declare const accessor: {\n    value: number;\n    readonly next: typeof accessor;\n};\nexport declare const tuple: readonly [() => typeof tuple];\nexport declare const array: (() => typeof array)[];\nexport declare const nested: {\n    inner: {\n        next(): {\n            next(): (typeof nested)[\"inner\"];\n        };\n    };\n};\nexport declare const memberTuple: readonly [() => () => (typeof memberTuple)[0]];\nexport declare const memberArray: (() => (typeof memberArray)[0])[];\nexport declare const quoted: {\n    \"a-b\": () => () => (typeof quoted)[\"a-b\"];\n};\nexport declare const numeric: {\n    0: () => () => (typeof numeric)[0];\n};\nexport declare const key: unique symbol;\nexport declare const computed: {\n    [key]: () => (typeof computed)[typeof key];\n};\nexport declare const union: {\n    next: () => typeof union;\n} | undefined;\nexport declare const specialized: {\n    value: string;\n    next: () => typeof specialized;\n};\nexport declare const indexed: {\n    [key: string]: typeof indexed;\n};\nexport declare const mapped: {\n    next: typeof mapped;\n};\nexport declare const viaAnnotation: {\n    value: string;\n    next: () => typeof viaAnnotation;\n};\nexport type Link<T> = {\n    value: T;\n    next: Link<T>;\n};\nexport type Callable<T> = {\n    (value: T): Callable<T>;\n    link: Link<T>;\n};\nexport declare const link: Link<string>;\nexport declare const callable: Callable<number>;\nexport declare const nextLink: Link<string>;\nexport declare const nextCallable: Callable<number>;\nexport declare const hiddenAlias: {\n    value: string;\n    next: typeof hiddenAlias;\n};\nexport declare const siblingHiddenAliases: {\n    first: {\n        value: string;\n        next: (typeof siblingHiddenAliases)[\"first\"];\n    };\n    second: {\n        value: string;\n        next: (typeof siblingHiddenAliases)[\"second\"];\n    };\n};\nexport declare const parenthesized: () => typeof parenthesized;\nexport declare const asserted: () => typeof asserted;\nexport declare class Methods {\n    static recur(): (typeof Methods)[\"recur\"];\n    static \"a-b\"(): (typeof Methods)[\"a-b\"];\n    static [key](): (typeof Methods)[typeof key];\n    recur(): Methods[\"recur\"];\n}\nexport declare function overloaded(value: string): typeof overloaded;\nexport declare function overloaded(value: number): typeof overloaded;\nexport declare const nestedOwner: {\n    make<T>(outer: T): {\n        nested<U>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        constrained<U extends T = T>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        copied<U>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        rest<U>(values_0: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n    };\n};\nexport declare const nestedNumber: {\n    nested<U>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n    constrained<U extends number = number>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n    copied<U>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: typeof nestedOwner;\n    };\n    rest<U>(values_0: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n};\nexport declare const mappedCycle: {\n    Node: {\n        value: number;\n        next: (typeof mappedCycle)[\"Node\"];\n    };\n};\nexport declare const mappedCycleCopy: {\n    Node: {\n        value: number;\n        next: (typeof mappedCycleCopy)[\"Node\"];\n    };\n};\nexport declare const nestedCycle: {\n    wrapped: {\n        Node: {\n            value: string;\n            next: (typeof nestedCycle)[\"wrapped\"][\"Node\"];\n        };\n    };\n};\nexport declare const cycleKey: unique symbol;\nexport declare const keyedCycles: {\n    \"a-b\": {\n        value: string;\n        next: (typeof keyedCycles)[\"a-b\"];\n    };\n    0: {\n        value: boolean;\n        next: (typeof keyedCycles)[0];\n    };\n    [cycleKey]: {\n        value: number;\n        next: (typeof keyedCycles)[typeof cycleKey];\n    };\n};\nexport declare const sharedCycles: {\n    first: {\n        Node: {\n            value: number;\n            next: (typeof sharedCycles)[\"first\"][\"Node\"];\n        };\n    };\n    second: {\n        Node: {\n            value: number;\n            next: (typeof sharedCycles)[\"second\"][\"Node\"];\n        };\n    };\n};\nexport declare const mutualCycle: {\n    First: {\n        value: number;\n        next: {\n            value: string;\n            next: (typeof mutualCycle)[\"First\"];\n        };\n    };\n    Second: {\n        value: string;\n        next: {\n            value: number;\n            next: (typeof mutualCycle)[\"Second\"];\n        };\n    };\n};\nexport declare const shadowedCycle: {\n    Node: {\n        value: number;\n        next: <T>(shadowedCycle: T) => typeof import(\".\").shadowedCycle[\"Node\"];\n    };\n};\nexport declare const optionalCycle: {\n    Node?: _recursive_1;\n};\nexport declare const nullableCycle: {\n    Node: _recursive_2 | null;\n};\nexport declare const mixedCycles: {\n    required: {\n        Node?: _recursive_3;\n    };\n    optional?: {\n        Node?: _recursive_3;\n    } | null;\n};\nexport declare const sharedOptionalCycles: {\n    first: {\n        Node?: _recursive_4;\n    };\n    second: {\n        Node?: _recursive_4;\n    };\n};\nexport declare const nullableKeys: {\n    \"a-b\": _recursive_5 | null;\n    0: _recursive_6 | null;\n    [cycleKey]: _recursive_7 | null;\n};\nexport declare const nullableRoot: _recursive_8 | null;\nexport declare const optionalRoot: _recursive_9 | undefined;\nexport declare const nullableLinks: {\n    Node: {\n        value: number;\n        next: (typeof nullableLinks)[\"Node\"];\n    } | null;\n};\nexport declare const optionalNullableLinks: {\n    Node?: _recursive_10 | null;\n};\nexport declare const nullableOptionalLinks: {\n    Node: _recursive_11 | null;\n};\nexport declare const nullishLinks: {\n    Node?: _recursive_12 | null;\n};\nexport declare const mixedUnionCycle: {\n    Node?: false | _recursive_13 | null;\n};\nexport declare const _recursive = 1;\nexport declare const factory: () => () => _recursive_14;\nexport declare function captured<T>(value: T): _recursive_15<T>;\nexport declare function nestedCaptured<T>(outer: T): <U>(inner: U) => _recursive_16<T, U>;\nexport declare function constrained<T extends {\n    value: number;\n}, K extends keyof T>(key: K): _recursive_17<T, K>;\nexport declare function optionalCaptured<T>(value: T): {\n    node?: _recursive_18<T> | false | null;\n};\nexport declare function annotatedCaptured<T>(value: T): _recursive_19<T>;\nexport declare function recursiveTuple<T>(value: T): _recursive_20<T>;\nexport declare function inferredCaptured<T>(): (T extends () => infer U ? _recursive_21<U> : never);\nexport declare function mappedCaptured<T>(): _recursive_22<T>;\nexport declare function freshGeneric<T>(unused: T): _recursive_23;\nexport declare function mutualCaptured<T, U>(left: T, right: U): {\n    left: _recursive_25<T, U>;\n    right: _recursive_24<T, U>;\n};\nexport declare class CapturedClass<T> {\n    value: T;\n    constructor(value: T);\n    make<U extends T>(inner: U): _recursive_26<T, U>;\n}\nexport declare function covariantClass(): {\n    new <T>(): _recursive_27<T>;\n};\nexport declare function contravariantClass(): {\n    new <T>(): _recursive_28<T>;\n};\nexport declare namespace Nested {\n    type _recursive_29<T> = {\n        value: T;\n        next: () => _recursive_29<T>;\n    };\n    export function captured<T>(value: T): _recursive_29<T>;\n    export {};\n}\nexport {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "0127123bf85d43331672f7890bd05d57-export const arrow = () => arrow;\nexport const expression = function self() { return self; };\nexport const first = () => second;\nexport const second = () => first;\nexport const generic = <T>(value: T) => generic;\nexport const objectReturn = () => ({ call: objectReturn });\nexport const tupleReturn = () => [tupleReturn] as const;\nexport const shadowed = function self(shadowed: number) { return self; };\nexport const object = { value: 1, next: () => object };\nexport const method = { value: 1, next() { return method; } };\nexport const accessor = { value: 1, get next() { return accessor; } };\nexport const tuple = [() => tuple] as const;\nexport const array = [() => array];\nexport const nested = { inner: { next() { return nested.inner; } } };\nexport const memberTuple = [function self() { return self; }] as const;\nexport const memberArray = [function self() { return self; }];\nexport const quoted = { \"a-b\": function self() { return self; } };\nexport const numeric = { 0: function self() { return self; } };\nexport const key = Symbol();\nexport const computed = { [key]: function self() { return self; } };\nexport const union = true as boolean ? { next: () => union } : undefined;\nfunction create<T>(value: T) {\n    const result = { value, next: () => result };\n    return result;\n}\nexport const specialized = create(\"text\");\nfunction createIndexed() {\n    const value: { [key: string]: typeof value } = {};\n    return value;\n}\nexport const indexed = createIndexed();\nfunction createMapped<T>() {\n    const value: { [K in keyof T]: typeof value } = null!;\n    return value;\n}\nexport const mapped = createMapped<{ next: unknown }>();\nfunction createAnnotated<T>(value: T) {\n    const node: { value: T; next: () => typeof node } = { value, next: () => node };\n    return node;\n}\nexport const viaAnnotation = createAnnotated(\"text\");\nexport type Link<T> = { value: T; next: Link<T> };\nexport type Callable<T> = { (value: T): Callable<T>; link: Link<T> };\nexport declare const link: Link<string>;\nexport declare const callable: Callable<number>;\nexport const nextLink = link.next;\nexport const nextCallable = callable(1);\nfunction createHidden<T>(value: T) {\n    type Hidden = { value: T; next: Hidden };\n    return null! as Hidden;\n}\nexport const hiddenAlias = createHidden(\"text\");\nexport const siblingHiddenAliases = { first: hiddenAlias, second: hiddenAlias };\nexport const parenthesized = (function self() { return self; });\nexport const asserted = (function self() { return self; }) satisfies () => unknown;\nexport class Methods {\n    static recur() { return Methods.recur; }\n    static \"a-b\"() { return Methods[\"a-b\"]; }\n    static [key]() { return Methods[key]; }\n    recur() { return this.recur; }\n}\nexport function overloaded(value: string): typeof overloaded;\nexport function overloaded(value: number): typeof overloaded;\nexport function overloaded(value: string | number) { return overloaded; }\nexport const nestedOwner = {\n    make<T>(outer: T) {\n        return {\n            nested<U>(inner: U) { return { outer, inner, owner: nestedOwner }; },\n            constrained<U extends T = T>(inner: U) { return { outer, inner, owner: nestedOwner }; },\n            copied<U>(inner: U): { outer: T; inner: U; owner: typeof nestedOwner } {\n                return { outer, inner, owner: nestedOwner };\n            },\n            rest<U>(...values: [U]) { return { outer, inner: values[0], owner: nestedOwner }; },\n        };\n    },\n};\nexport const nestedNumber = nestedOwner.make(1);\ntype Show<T> = { [K in keyof T]: T[K] } & unknown;\ntype Resolve<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? Resolve<M, K> : M[K][P];\n}>;\ndeclare const build: <M>() => { [K in keyof M]: Resolve<M, K> };\nexport const mappedCycle = build<{ Node: { value: number; next: \"ref\" } }>();\nexport const mappedCycleCopy = mappedCycle;\nexport const nestedCycle = { wrapped: build<{ Node: { value: string; next: \"ref\" } }>() };\nexport const cycleKey = Symbol();\nexport const keyedCycles = build<{\n    \"a-b\": { value: string; next: \"ref\" };\n    0: { value: boolean; next: \"ref\" };\n    [cycleKey]: { value: number; next: \"ref\" };\n}>();\nexport const sharedCycles = { first: mappedCycle, second: mappedCycle };\ntype ResolveMutual<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends { ref: infer R extends keyof M } ? ResolveMutual<M, R> : M[K][P];\n}>;\ndeclare const buildMutual: <M>() => { [K in keyof M]: ResolveMutual<M, K> };\nexport const mutualCycle = buildMutual<{\n    First: { value: number; next: { ref: \"Second\" } };\n    Second: { value: string; next: { ref: \"First\" } };\n}>();\ntype ResolveShadowed<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? <T>(shadowedCycle: T) => ResolveShadowed<M, K> : M[K][P];\n}>;\ndeclare const buildShadowed: <M>() => { [K in keyof M]: ResolveShadowed<M, K> };\nexport const shadowedCycle = buildShadowed<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildOptional: <M>() => { [K in keyof M]?: Resolve<M, K> };\nexport const optionalCycle = buildOptional<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildNullable: <M>() => { [K in keyof M]: Resolve<M, K> | null };\nexport const nullableCycle = buildNullable<{ Node: { value: string; next: \"ref\" } }>();\ndeclare const wrap: <T>(value: T) => { required: T; optional?: T | null };\nexport const mixedCycles = wrap(optionalCycle);\nexport const sharedOptionalCycles = { first: optionalCycle, second: optionalCycle };\nexport const nullableKeys = buildNullable<{\n    \"a-b\": { value: string; next: \"ref\" };\n    0: { value: boolean; next: \"ref\" };\n    [cycleKey]: { value: number; next: \"ref\" };\n}>();\ndeclare const buildNullableRoot: <M>() => Resolve<M, keyof M> | null;\nexport const nullableRoot = buildNullableRoot<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildOptionalRoot: <M>() => Resolve<M, keyof M> | undefined;\nexport const optionalRoot = buildOptionalRoot<{ Node: { value: string; next: \"ref\" } }>();\ntype ResolveNullable<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? ResolveNullable<M, K> | null : M[K][P];\n}>;\ndeclare const buildNullableLinks: <M>() => { [K in keyof M]: ResolveNullable<M, K> | null };\nexport const nullableLinks = buildNullableLinks<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildOptionalNullableLinks: <M>() => { [K in keyof M]?: ResolveNullable<M, K> | null };\nexport const optionalNullableLinks = buildOptionalNullableLinks<{ Node: { value: number; next: \"ref\" } }>();\ntype ResolveOptional<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? ResolveOptional<M, K> | undefined : M[K][P];\n}>;\ndeclare const buildNullableOptionalLinks: <M>() => { [K in keyof M]: ResolveOptional<M, K> | null };\nexport const nullableOptionalLinks = buildNullableOptionalLinks<{ Node: { value: number; next: \"ref\" } }>();\ntype ResolveNullish<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? ResolveNullish<M, K> | null | undefined : M[K][P];\n}>;\ndeclare const buildNullishLinks: <M>() => { [K in keyof M]?: ResolveNullish<M, K> | null };\nexport const nullishLinks = buildNullishLinks<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildMixed: <M>() => { [K in keyof M]?: Resolve<M, K> | false | null };\nexport const mixedUnionCycle = buildMixed<{ Node: { value: number; next: \"ref\" } }>();\nexport const _recursive = 1;\nexport const factory = () => function self() { return self; };\nexport function captured<T>(value: T) {\n    const node = { value, next: () => node, consume: (other: T) => node };\n    return node;\n}\nexport function nestedCaptured<T>(outer: T) {\n    return <U>(inner: U) => {\n        const node = {\n            outer, inner, next: () => node,\n            shadow: <T>(value: T) => ({ outer, inner, value, next: node }),\n        };\n        return node;\n    };\n}\nexport function constrained<T extends { value: number }, K extends keyof T>(key: K) {\n    const node = { value: null! as T[K], next: () => node };\n    return node;\n}\nexport function optionalCaptured<T>(value: T) {\n    type Node = { value: T; next: Node };\n    return null! as { node?: Node | false | null };\n}\nexport function annotatedCaptured<T>(value: T) {\n    const node: { value: typeof value; next: typeof node } = { value, next: null! };\n    return node;\n}\nexport function recursiveTuple<T>(value: T) {\n    type Tuple = readonly [T, Tuple];\n    return null! as Tuple;\n}\nexport function inferredCaptured<T>() {\n    type Node<V> = { value: V; next: Node<V> };\n    return null! as (T extends () => infer U ? Node<U> : never);\n}\nexport function mappedCaptured<T>() {\n    type Node = { [K in keyof T]: { value: T[K]; next: Node } };\n    return null! as Node;\n}\nexport function freshGeneric<T>(unused: T) {\n    const recur = <U>(value: U) => recur;\n    return recur;\n}\nexport function mutualCaptured<T, U>(left: T, right: U) {\n    type Left = { left: T; next: Right };\n    type Right = { right: U; self: Right; next: Left };\n    return { left: null! as Left, right: null! as Right };\n}\nexport class CapturedClass<T> {\n    constructor(public value: T) {}\n    make<U extends T>(inner: U) {\n        const node = { outer: this.value, inner, next: () => node };\n        return node;\n    }\n}\nexport function covariantClass() {\n    return class Node<out T> {\n        value!: T;\n        next(): Node<T> { return this; }\n    };\n}\nexport function contravariantClass() {\n    return class Node<in T> {\n        consume!: (value: T) => void;\n        next(): Node<T> { return this; }\n    };\n}\nexport namespace Nested {\n    export function captured<T>(value: T) {\n        const node = { value, next: () => node };\n        return node;\n    }\n}\ntype NonNullable<T> = \"shadowed\";",
        "signature": "850dc9bfa8257128f209cdd8c49501cd-type _recursive_1 = {\n    value: number;\n    next: _recursive_1;\n};\ntype _recursive_2 = {\n    value: string;\n    next: _recursive_2;\n};\ntype _recursive_3 = {\n    value: number;\n    next: _recursive_3;\n};\ntype _recursive_4 = {\n    value: number;\n    next: _recursive_4;\n};\ntype _recursive_5 = {\n    value: string;\n    next: _recursive_5;\n};\ntype _recursive_6 = {\n    value: boolean;\n    next: _recursive_6;\n};\ntype _recursive_7 = {\n    value: number;\n    next: _recursive_7;\n};\ntype _recursive_8 = {\n    value: number;\n    next: _recursive_8;\n};\ntype _recursive_9 = {\n    value: string;\n    next: _recursive_9;\n};\ntype _recursive_10 = {\n    value: number;\n    next: _recursive_10 | null;\n};\ntype _recursive_11 = {\n    value: number;\n    next: _recursive_11 | undefined;\n};\ntype _recursive_12 = {\n    value: number;\n    next: _recursive_12 | null | undefined;\n};\ntype _recursive_13 = {\n    value: number;\n    next: _recursive_13;\n};\ntype _recursive_14 = () => _recursive_14;\ntype _recursive_15<T> = {\n    value: T;\n    next: () => _recursive_15<T>;\n    consume: (other: T) => _recursive_15<T>;\n};\ntype _recursive_16<T, U> = {\n    outer: T;\n    inner: U;\n    next: () => _recursive_16<T, U>;\n    shadow: <T_1>(value: T_1) => {\n        outer: T;\n        inner: U;\n        value: T_1;\n        next: _recursive_16<T, U>;\n    };\n};\ntype _recursive_17<T extends {\n    value: number;\n}, K extends keyof T> = {\n    value: T[K];\n    next: () => _recursive_17<T, K>;\n};\ntype _recursive_18<T> = {\n    value: T;\n    next: _recursive_18<T>;\n};\ntype _recursive_19<T> = {\n    value: T;\n    next: _recursive_19<T>;\n};\ntype _recursive_20<T> = readonly [T, _recursive_20<T>];\ntype _recursive_21<U> = {\n    value: U;\n    next: _recursive_21<U>;\n};\ntype _recursive_22<T> = { [K in keyof T]: {\n    value: T[K];\n    next: _recursive_22<T>;\n}; };\ntype _recursive_23 = <U>(value: U) => _recursive_23;\ntype _recursive_24<T, U> = {\n    right: U;\n    self: _recursive_24<T, U>;\n    next: _recursive_25<T, U>;\n};\ntype _recursive_25<T, U> = {\n    left: T;\n    next: _recursive_24<T, U>;\n};\ntype _recursive_26<T, U extends T> = {\n    outer: T;\n    inner: U;\n    next: () => _recursive_26<T, U>;\n};\ntype _recursive_27<out T> = {\n    value: T;\n    next(): _recursive_27<T>;\n};\ntype _recursive_28<in T> = {\n    consume: (value: T) => void;\n    next(): _recursive_28<T>;\n};\nexport declare const arrow: () => typeof arrow;\nexport declare const expression: () => typeof expression;\nexport declare const first: () => typeof second;\nexport declare const second: () => typeof first;\nexport declare const generic: <T>(value: T) => typeof generic;\nexport declare const objectReturn: () => {\n    call: typeof objectReturn;\n};\nexport declare const tupleReturn: () => readonly [typeof tupleReturn];\nexport declare const shadowed: (shadowed: number) => typeof import(\".\").shadowed;\nexport declare const object: {\n    value: number;\n    next: () => typeof object;\n};\nexport declare const method: {\n    value: number;\n    next(): typeof method;\n};\nexport declare const accessor: {\n    value: number;\n    readonly next: typeof accessor;\n};\nexport declare const tuple: readonly [() => typeof tuple];\nexport declare const array: (() => typeof array)[];\nexport declare const nested: {\n    inner: {\n        next(): {\n            next(): (typeof nested)[\"inner\"];\n        };\n    };\n};\nexport declare const memberTuple: readonly [() => () => (typeof memberTuple)[0]];\nexport declare const memberArray: (() => (typeof memberArray)[0])[];\nexport declare const quoted: {\n    \"a-b\": () => () => (typeof quoted)[\"a-b\"];\n};\nexport declare const numeric: {\n    0: () => () => (typeof numeric)[0];\n};\nexport declare const key: unique symbol;\nexport declare const computed: {\n    [key]: () => (typeof computed)[typeof key];\n};\nexport declare const union: {\n    next: () => typeof union;\n} | undefined;\nexport declare const specialized: {\n    value: string;\n    next: () => typeof specialized;\n};\nexport declare const indexed: {\n    [key: string]: typeof indexed;\n};\nexport declare const mapped: {\n    next: typeof mapped;\n};\nexport declare const viaAnnotation: {\n    value: string;\n    next: () => typeof viaAnnotation;\n};\nexport type Link<T> = {\n    value: T;\n    next: Link<T>;\n};\nexport type Callable<T> = {\n    (value: T): Callable<T>;\n    link: Link<T>;\n};\nexport declare const link: Link<string>;\nexport declare const callable: Callable<number>;\nexport declare const nextLink: Link<string>;\nexport declare const nextCallable: Callable<number>;\nexport declare const hiddenAlias: {\n    value: string;\n    next: typeof hiddenAlias;\n};\nexport declare const siblingHiddenAliases: {\n    first: {\n        value: string;\n        next: (typeof siblingHiddenAliases)[\"first\"];\n    };\n    second: {\n        value: string;\n        next: (typeof siblingHiddenAliases)[\"second\"];\n    };\n};\nexport declare const parenthesized: () => typeof parenthesized;\nexport declare const asserted: () => typeof asserted;\nexport declare class Methods {\n    static recur(): (typeof Methods)[\"recur\"];\n    static \"a-b\"(): (typeof Methods)[\"a-b\"];\n    static [key](): (typeof Methods)[typeof key];\n    recur(): Methods[\"recur\"];\n}\nexport declare function overloaded(value: string): typeof overloaded;\nexport declare function overloaded(value: number): typeof overloaded;\nexport declare const nestedOwner: {\n    make<T>(outer: T): {\n        nested<U>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        constrained<U extends T = T>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        copied<U>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        rest<U>(values_0: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n    };\n};\nexport declare const nestedNumber: {\n    nested<U>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n    constrained<U extends number = number>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n    copied<U>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: typeof nestedOwner;\n    };\n    rest<U>(values_0: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n};\nexport declare const mappedCycle: {\n    Node: {\n        value: number;\n        next: (typeof mappedCycle)[\"Node\"];\n    };\n};\nexport declare const mappedCycleCopy: {\n    Node: {\n        value: number;\n        next: (typeof mappedCycleCopy)[\"Node\"];\n    };\n};\nexport declare const nestedCycle: {\n    wrapped: {\n        Node: {\n            value: string;\n            next: (typeof nestedCycle)[\"wrapped\"][\"Node\"];\n        };\n    };\n};\nexport declare const cycleKey: unique symbol;\nexport declare const keyedCycles: {\n    \"a-b\": {\n        value: string;\n        next: (typeof keyedCycles)[\"a-b\"];\n    };\n    0: {\n        value: boolean;\n        next: (typeof keyedCycles)[0];\n    };\n    [cycleKey]: {\n        value: number;\n        next: (typeof keyedCycles)[typeof cycleKey];\n    };\n};\nexport declare const sharedCycles: {\n    first: {\n        Node: {\n            value: number;\n            next: (typeof sharedCycles)[\"first\"][\"Node\"];\n        };\n    };\n    second: {\n        Node: {\n            value: number;\n            next: (typeof sharedCycles)[\"second\"][\"Node\"];\n        };\n    };\n};\nexport declare const mutualCycle: {\n    First: {\n        value: number;\n        next: {\n            value: string;\n            next: (typeof mutualCycle)[\"First\"];\n        };\n    };\n    Second: {\n        value: string;\n        next: {\n            value: number;\n            next: (typeof mutualCycle)[\"Second\"];\n        };\n    };\n};\nexport declare const shadowedCycle: {\n    Node: {\n        value: number;\n        next: <T>(shadowedCycle: T) => typeof import(\".\").shadowedCycle[\"Node\"];\n    };\n};\nexport declare const optionalCycle: {\n    Node?: _recursive_1;\n};\nexport declare const nullableCycle: {\n    Node: _recursive_2 | null;\n};\nexport declare const mixedCycles: {\n    required: {\n        Node?: _recursive_3;\n    };\n    optional?: {\n        Node?: _recursive_3;\n    } | null;\n};\nexport declare const sharedOptionalCycles: {\n    first: {\n        Node?: _recursive_4;\n    };\n    second: {\n        Node?: _recursive_4;\n    };\n};\nexport declare const nullableKeys: {\n    \"a-b\": _recursive_5 | null;\n    0: _recursive_6 | null;\n    [cycleKey]: _recursive_7 | null;\n};\nexport declare const nullableRoot: _recursive_8 | null;\nexport declare const optionalRoot: _recursive_9 | undefined;\nexport declare const nullableLinks: {\n    Node: {\n        value: number;\n        next: (typeof nullableLinks)[\"Node\"];\n    } | null;\n};\nexport declare const optionalNullableLinks: {\n    Node?: _recursive_10 | null;\n};\nexport declare const nullableOptionalLinks: {\n    Node: _recursive_11 | null;\n};\nexport declare const nullishLinks: {\n    Node?: _recursive_12 | null;\n};\nexport declare const mixedUnionCycle: {\n    Node?: false | _recursive_13 | null;\n};\nexport declare const _recursive = 1;\nexport declare const factory: () => () => _recursive_14;\nexport declare function captured<T>(value: T): _recursive_15<T>;\nexport declare function nestedCaptured<T>(outer: T): <U>(inner: U) => _recursive_16<T, U>;\nexport declare function constrained<T extends {\n    value: number;\n}, K extends keyof T>(key: K): _recursive_17<T, K>;\nexport declare function optionalCaptured<T>(value: T): {\n    node?: _recursive_18<T> | false | null;\n};\nexport declare function annotatedCaptured<T>(value: T): _recursive_19<T>;\nexport declare function recursiveTuple<T>(value: T): _recursive_20<T>;\nexport declare function inferredCaptured<T>(): (T extends () => infer U ? _recursive_21<U> : never);\nexport declare function mappedCaptured<T>(): _recursive_22<T>;\nexport declare function freshGeneric<T>(unused: T): _recursive_23;\nexport declare function mutualCaptured<T, U>(left: T, right: U): {\n    left: _recursive_25<T, U>;\n    right: _recursive_24<T, U>;\n};\nexport declare class CapturedClass<T> {\n    value: T;\n    constructor(value: T);\n    make<U extends T>(inner: U): _recursive_26<T, U>;\n}\nexport declare function covariantClass(): {\n    new <T>(): _recursive_27<T>;\n};\nexport declare function contravariantClass(): {\n    new <T>(): _recursive_28<T>;\n};\nexport declare namespace Nested {\n    type _recursive_29<T> = {\n        value: T;\n        next: () => _recursive_29<T>;\n    };\n    export function captured<T>(value: T): _recursive_29<T>;\n    export {};\n}\nexport {};\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true,
    "exactOptionalPropertyTypes": true,
    "outDir": "./",
    "strict": true
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 24520
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/project/producer/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/producer/index.ts

consumer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/project/producer/dist/index.d.ts
*refresh*    /home/src/workspaces/project/consumer/index.ts
Signatures::


Edit [0]:: no change

tsgo --build consumer
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mconsumer/index.ts[0m:[93m158[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => ...' is not assignable to type 'number'.

[7m158[0m const invalid: number = arrow()()();
[7m   [0m [91m      ~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m159[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => ...' is not assignable to type 'number'.

[7m159[0m const invalidExpression: number = expression()()();
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m160[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => { call: ...; }' is not assignable to type 'number'.

[7m160[0m const invalidObject: number = objectReturn().call;
[7m   [0m [91m      ~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m161[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => readonly [...]' is not assignable to type 'number'.

[7m161[0m const invalidTuple: number = tupleReturn()[0];
[7m   [0m [91m      ~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m162[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '(shadowed: number) => ...' is not assignable to type 'number'.

[7m162[0m const invalidShadowed: number = shadowed(1);
[7m   [0m [91m      ~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m163[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m163[0m const invalidObjectValue: string = object.next().value;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m164[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'readonly [() => ...]' is not assignable to type 'number'.

[7m164[0m const invalidTupleValue: number = tuple[0]();
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m165[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m165[0m const invalidSpecialized: number = specialized.next().value;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m166[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '{ next: ...; }' is not assignable to type 'number'.

[7m166[0m const invalidMapped: number = mapped.next;
[7m   [0m [91m      ~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m167[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m167[0m const invalidAnnotation: number = viaAnnotation.next().value;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m168[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m168[0m const invalidLink: number = nextLink.next.value;
[7m   [0m [91m      ~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m169[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m169[0m const invalidCallable: string = nextCallable(1).link.value;
[7m   [0m [91m      ~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m170[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m170[0m const invalidHiddenValue: number = hiddenAlias.next.next.value;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m171[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => (typeof Methods)["recur"]' is not assignable to type 'number'.

[7m171[0m const invalidMethod: number = Methods.recur()();
[7m   [0m [91m      ~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m172[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => (typeof Methods)[typeof key]' is not assignable to type 'number'.

[7m172[0m const invalidComputedMethod: number = Methods[key]()();
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m173[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'boolean'.

[7m173[0m const invalidNestedOuter: boolean = nestedString.outer;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m174[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m174[0m const invalidNestedInner: string = nestedString.inner;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m175[0m:[93m26[0m - [91merror[0m[90m TS2345: [0mArgument of type 'string' is not assignable to parameter of type 'number'.

[7m175[0m nestedNumber.constrained("wrong");
[7m   [0m [91m                         ~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m176[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m176[0m const invalidMappedCycleValue: string = mappedCycle.Node.next.next.value;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m177[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m177[0m const invalidMutualCycleValue: number = mutualCycle.First.next.value;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m178[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m178[0m const invalidShadowedMappedValue: string = shadowedCycle.Node.next(1).next("text").value;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m179[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'null' is not assignable to type '_recursive_1'.

[7m179[0m const invalidNullNext: OptionalNode["next"] = null;
[7m   [0m [91m      ~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m180[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'undefined' is not assignable to type '_recursive_1'.

[7m180[0m const invalidUndefinedNext: OptionalNode["next"] = undefined;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m181[0m:[93m42[0m - [91merror[0m[90m TS2531: [0mObject is possibly 'null'.

[7m181[0m const invalidNullableLinkValue: number = nullableLinks.Node!.next.value;
[7m   [0m [91m                                         ~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m182[0m:[93m41[0m - [91merror[0m[90m TS2533: [0mObject is possibly 'null' or 'undefined'.

[7m182[0m const invalidNullishLinkValue: number = nullishLinks.Node!.next.value;
[7m   [0m [91m                                        ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m183[0m:[93m26[0m - [91merror[0m[90m TS2345: [0mArgument of type 'number' is not assignable to parameter of type 'string'.

[7m183[0m captured("text").consume(1);
[7m   [0m [91m                         ~[0m

[96mconsumer/index.ts[0m:[93m184[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m184[0m const invalidRecursiveTupleValue: number = recursiveTuple("text")[1][0];
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m185[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m185[0m const invalidCapturedOuter: string = nestedCapturedValue.outer;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m186[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m186[0m const invalidCapturedInner: number = nestedCapturedValue.inner;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m188[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'boolean' is not assignable to type '_recursive_13'.

[7m188[0m const invalidMixedNext: WithoutFalseOrNullish<typeof mixedUnionCycle.Node>["next"] = false;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m189[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m189[0m const invalidInferredCapturedValue: number = inferredCaptured<() => string>().next.value;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m190[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m190[0m const invalidMappedCapturedValue: string = mappedCaptured<{ value: number }>().value.next.value.value;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m191[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'boolean'.

[7m191[0m const invalidMutualCapturedValue: boolean = mutualCaptured(1, "text").right.self.next.left;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m192[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m192[0m const invalidCapturedClassValue: number = capturedClassResult.outer;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m193[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '_recursive_27<unknown>' is not assignable to type '_recursive_27<string>'.
  Type 'unknown' is not assignable to type 'string'.

[7m193[0m const invalidCovariance: typeof covariantString = covariantUnknown.next();
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m194[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '_recursive_28<string>' is not assignable to type '_recursive_28<unknown>'.
  Type 'unknown' is not assignable to type 'string'.

[7m194[0m const invalidContravariance: typeof contravariantUnknown = contravariantString.next();
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~[0m


Found 36 errors in the same file, starting at: consumer/index.ts[90m:158[0m

//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo] *rewrite with same content*
//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*

consumer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/project/producer/dist/index.d.ts
*refresh*    /home/src/workspaces/project/consumer/index.ts
Signatures::


Edit [1]:: add a comment to the producer
//// [/home/src/workspaces/project/producer/index.ts] *modified* 
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
[96mconsumer/index.ts[0m:[93m158[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => ...' is not assignable to type 'number'.

[7m158[0m const invalid: number = arrow()()();
[7m   [0m [91m      ~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m159[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => ...' is not assignable to type 'number'.

[7m159[0m const invalidExpression: number = expression()()();
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m160[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => { call: ...; }' is not assignable to type 'number'.

[7m160[0m const invalidObject: number = objectReturn().call;
[7m   [0m [91m      ~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m161[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => readonly [...]' is not assignable to type 'number'.

[7m161[0m const invalidTuple: number = tupleReturn()[0];
[7m   [0m [91m      ~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m162[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '(shadowed: number) => ...' is not assignable to type 'number'.

[7m162[0m const invalidShadowed: number = shadowed(1);
[7m   [0m [91m      ~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m163[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m163[0m const invalidObjectValue: string = object.next().value;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m164[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'readonly [() => ...]' is not assignable to type 'number'.

[7m164[0m const invalidTupleValue: number = tuple[0]();
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m165[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m165[0m const invalidSpecialized: number = specialized.next().value;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m166[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '{ next: ...; }' is not assignable to type 'number'.

[7m166[0m const invalidMapped: number = mapped.next;
[7m   [0m [91m      ~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m167[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m167[0m const invalidAnnotation: number = viaAnnotation.next().value;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m168[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m168[0m const invalidLink: number = nextLink.next.value;
[7m   [0m [91m      ~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m169[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m169[0m const invalidCallable: string = nextCallable(1).link.value;
[7m   [0m [91m      ~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m170[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m170[0m const invalidHiddenValue: number = hiddenAlias.next.next.value;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m171[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => (typeof Methods)["recur"]' is not assignable to type 'number'.

[7m171[0m const invalidMethod: number = Methods.recur()();
[7m   [0m [91m      ~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m172[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => (typeof Methods)[typeof key]' is not assignable to type 'number'.

[7m172[0m const invalidComputedMethod: number = Methods[key]()();
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m173[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'boolean'.

[7m173[0m const invalidNestedOuter: boolean = nestedString.outer;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m174[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m174[0m const invalidNestedInner: string = nestedString.inner;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m175[0m:[93m26[0m - [91merror[0m[90m TS2345: [0mArgument of type 'string' is not assignable to parameter of type 'number'.

[7m175[0m nestedNumber.constrained("wrong");
[7m   [0m [91m                         ~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m176[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m176[0m const invalidMappedCycleValue: string = mappedCycle.Node.next.next.value;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m177[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m177[0m const invalidMutualCycleValue: number = mutualCycle.First.next.value;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m178[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m178[0m const invalidShadowedMappedValue: string = shadowedCycle.Node.next(1).next("text").value;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m179[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'null' is not assignable to type '_recursive_1'.

[7m179[0m const invalidNullNext: OptionalNode["next"] = null;
[7m   [0m [91m      ~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m180[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'undefined' is not assignable to type '_recursive_1'.

[7m180[0m const invalidUndefinedNext: OptionalNode["next"] = undefined;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m181[0m:[93m42[0m - [91merror[0m[90m TS2531: [0mObject is possibly 'null'.

[7m181[0m const invalidNullableLinkValue: number = nullableLinks.Node!.next.value;
[7m   [0m [91m                                         ~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m182[0m:[93m41[0m - [91merror[0m[90m TS2533: [0mObject is possibly 'null' or 'undefined'.

[7m182[0m const invalidNullishLinkValue: number = nullishLinks.Node!.next.value;
[7m   [0m [91m                                        ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m183[0m:[93m26[0m - [91merror[0m[90m TS2345: [0mArgument of type 'number' is not assignable to parameter of type 'string'.

[7m183[0m captured("text").consume(1);
[7m   [0m [91m                         ~[0m

[96mconsumer/index.ts[0m:[93m184[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m184[0m const invalidRecursiveTupleValue: number = recursiveTuple("text")[1][0];
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m185[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m185[0m const invalidCapturedOuter: string = nestedCapturedValue.outer;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m186[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m186[0m const invalidCapturedInner: number = nestedCapturedValue.inner;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m188[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'boolean' is not assignable to type '_recursive_13'.

[7m188[0m const invalidMixedNext: WithoutFalseOrNullish<typeof mixedUnionCycle.Node>["next"] = false;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m189[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m189[0m const invalidInferredCapturedValue: number = inferredCaptured<() => string>().next.value;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m190[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m190[0m const invalidMappedCapturedValue: string = mappedCaptured<{ value: number }>().value.next.value.value;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m191[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'boolean'.

[7m191[0m const invalidMutualCapturedValue: boolean = mutualCaptured(1, "text").right.self.next.left;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m192[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m192[0m const invalidCapturedClassValue: number = capturedClassResult.outer;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m193[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '_recursive_27<unknown>' is not assignable to type '_recursive_27<string>'.
  Type 'unknown' is not assignable to type 'string'.

[7m193[0m const invalidCovariance: typeof covariantString = covariantUnknown.next();
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m194[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '_recursive_28<string>' is not assignable to type '_recursive_28<unknown>'.
  Type 'unknown' is not assignable to type 'string'.

[7m194[0m const invalidContravariance: typeof contravariantUnknown = contravariantString.next();
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~[0m


Found 36 errors in the same file, starting at: consumer/index.ts[90m:158[0m

//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo] *rewrite with same content*
//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*
//// [/home/src/workspaces/project/producer/dist/index.js] *modified* 
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
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.es2026.full.d.ts","../index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"8be79633abc8e3e9d5c07f355c360ccf-export const arrow = () => arrow;\nexport const expression = function self() { return self; };\nexport const first = () => second;\nexport const second = () => first;\nexport const generic = <T>(value: T) => generic;\nexport const objectReturn = () => ({ call: objectReturn });\nexport const tupleReturn = () => [tupleReturn] as const;\nexport const shadowed = function self(shadowed: number) { return self; };\nexport const object = { value: 1, next: () => object };\nexport const method = { value: 1, next() { return method; } };\nexport const accessor = { value: 1, get next() { return accessor; } };\nexport const tuple = [() => tuple] as const;\nexport const array = [() => array];\nexport const nested = { inner: { next() { return nested.inner; } } };\nexport const memberTuple = [function self() { return self; }] as const;\nexport const memberArray = [function self() { return self; }];\nexport const quoted = { \"a-b\": function self() { return self; } };\nexport const numeric = { 0: function self() { return self; } };\nexport const key = Symbol();\nexport const computed = { [key]: function self() { return self; } };\nexport const union = true as boolean ? { next: () => union } : undefined;\nfunction create<T>(value: T) {\n    const result = { value, next: () => result };\n    return result;\n}\nexport const specialized = create(\"text\");\nfunction createIndexed() {\n    const value: { [key: string]: typeof value } = {};\n    return value;\n}\nexport const indexed = createIndexed();\nfunction createMapped<T>() {\n    const value: { [K in keyof T]: typeof value } = null!;\n    return value;\n}\nexport const mapped = createMapped<{ next: unknown }>();\nfunction createAnnotated<T>(value: T) {\n    const node: { value: T; next: () => typeof node } = { value, next: () => node };\n    return node;\n}\nexport const viaAnnotation = createAnnotated(\"text\");\nexport type Link<T> = { value: T; next: Link<T> };\nexport type Callable<T> = { (value: T): Callable<T>; link: Link<T> };\nexport declare const link: Link<string>;\nexport declare const callable: Callable<number>;\nexport const nextLink = link.next;\nexport const nextCallable = callable(1);\nfunction createHidden<T>(value: T) {\n    type Hidden = { value: T; next: Hidden };\n    return null! as Hidden;\n}\nexport const hiddenAlias = createHidden(\"text\");\nexport const siblingHiddenAliases = { first: hiddenAlias, second: hiddenAlias };\nexport const parenthesized = (function self() { return self; });\nexport const asserted = (function self() { return self; }) satisfies () => unknown;\nexport class Methods {\n    static recur() { return Methods.recur; }\n    static \"a-b\"() { return Methods[\"a-b\"]; }\n    static [key]() { return Methods[key]; }\n    recur() { return this.recur; }\n}\nexport function overloaded(value: string): typeof overloaded;\nexport function overloaded(value: number): typeof overloaded;\nexport function overloaded(value: string | number) { return overloaded; }\nexport const nestedOwner = {\n    make<T>(outer: T) {\n        return {\n            nested<U>(inner: U) { return { outer, inner, owner: nestedOwner }; },\n            constrained<U extends T = T>(inner: U) { return { outer, inner, owner: nestedOwner }; },\n            copied<U>(inner: U): { outer: T; inner: U; owner: typeof nestedOwner } {\n                return { outer, inner, owner: nestedOwner };\n            },\n            rest<U>(...values: [U]) { return { outer, inner: values[0], owner: nestedOwner }; },\n        };\n    },\n};\nexport const nestedNumber = nestedOwner.make(1);\ntype Show<T> = { [K in keyof T]: T[K] } & unknown;\ntype Resolve<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? Resolve<M, K> : M[K][P];\n}>;\ndeclare const build: <M>() => { [K in keyof M]: Resolve<M, K> };\nexport const mappedCycle = build<{ Node: { value: number; next: \"ref\" } }>();\nexport const mappedCycleCopy = mappedCycle;\nexport const nestedCycle = { wrapped: build<{ Node: { value: string; next: \"ref\" } }>() };\nexport const cycleKey = Symbol();\nexport const keyedCycles = build<{\n    \"a-b\": { value: string; next: \"ref\" };\n    0: { value: boolean; next: \"ref\" };\n    [cycleKey]: { value: number; next: \"ref\" };\n}>();\nexport const sharedCycles = { first: mappedCycle, second: mappedCycle };\ntype ResolveMutual<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends { ref: infer R extends keyof M } ? ResolveMutual<M, R> : M[K][P];\n}>;\ndeclare const buildMutual: <M>() => { [K in keyof M]: ResolveMutual<M, K> };\nexport const mutualCycle = buildMutual<{\n    First: { value: number; next: { ref: \"Second\" } };\n    Second: { value: string; next: { ref: \"First\" } };\n}>();\ntype ResolveShadowed<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? <T>(shadowedCycle: T) => ResolveShadowed<M, K> : M[K][P];\n}>;\ndeclare const buildShadowed: <M>() => { [K in keyof M]: ResolveShadowed<M, K> };\nexport const shadowedCycle = buildShadowed<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildOptional: <M>() => { [K in keyof M]?: Resolve<M, K> };\nexport const optionalCycle = buildOptional<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildNullable: <M>() => { [K in keyof M]: Resolve<M, K> | null };\nexport const nullableCycle = buildNullable<{ Node: { value: string; next: \"ref\" } }>();\ndeclare const wrap: <T>(value: T) => { required: T; optional?: T | null };\nexport const mixedCycles = wrap(optionalCycle);\nexport const sharedOptionalCycles = { first: optionalCycle, second: optionalCycle };\nexport const nullableKeys = buildNullable<{\n    \"a-b\": { value: string; next: \"ref\" };\n    0: { value: boolean; next: \"ref\" };\n    [cycleKey]: { value: number; next: \"ref\" };\n}>();\ndeclare const buildNullableRoot: <M>() => Resolve<M, keyof M> | null;\nexport const nullableRoot = buildNullableRoot<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildOptionalRoot: <M>() => Resolve<M, keyof M> | undefined;\nexport const optionalRoot = buildOptionalRoot<{ Node: { value: string; next: \"ref\" } }>();\ntype ResolveNullable<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? ResolveNullable<M, K> | null : M[K][P];\n}>;\ndeclare const buildNullableLinks: <M>() => { [K in keyof M]: ResolveNullable<M, K> | null };\nexport const nullableLinks = buildNullableLinks<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildOptionalNullableLinks: <M>() => { [K in keyof M]?: ResolveNullable<M, K> | null };\nexport const optionalNullableLinks = buildOptionalNullableLinks<{ Node: { value: number; next: \"ref\" } }>();\ntype ResolveOptional<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? ResolveOptional<M, K> | undefined : M[K][P];\n}>;\ndeclare const buildNullableOptionalLinks: <M>() => { [K in keyof M]: ResolveOptional<M, K> | null };\nexport const nullableOptionalLinks = buildNullableOptionalLinks<{ Node: { value: number; next: \"ref\" } }>();\ntype ResolveNullish<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? ResolveNullish<M, K> | null | undefined : M[K][P];\n}>;\ndeclare const buildNullishLinks: <M>() => { [K in keyof M]?: ResolveNullish<M, K> | null };\nexport const nullishLinks = buildNullishLinks<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildMixed: <M>() => { [K in keyof M]?: Resolve<M, K> | false | null };\nexport const mixedUnionCycle = buildMixed<{ Node: { value: number; next: \"ref\" } }>();\nexport const _recursive = 1;\nexport const factory = () => function self() { return self; };\nexport function captured<T>(value: T) {\n    const node = { value, next: () => node, consume: (other: T) => node };\n    return node;\n}\nexport function nestedCaptured<T>(outer: T) {\n    return <U>(inner: U) => {\n        const node = {\n            outer, inner, next: () => node,\n            shadow: <T>(value: T) => ({ outer, inner, value, next: node }),\n        };\n        return node;\n    };\n}\nexport function constrained<T extends { value: number }, K extends keyof T>(key: K) {\n    const node = { value: null! as T[K], next: () => node };\n    return node;\n}\nexport function optionalCaptured<T>(value: T) {\n    type Node = { value: T; next: Node };\n    return null! as { node?: Node | false | null };\n}\nexport function annotatedCaptured<T>(value: T) {\n    const node: { value: typeof value; next: typeof node } = { value, next: null! };\n    return node;\n}\nexport function recursiveTuple<T>(value: T) {\n    type Tuple = readonly [T, Tuple];\n    return null! as Tuple;\n}\nexport function inferredCaptured<T>() {\n    type Node<V> = { value: V; next: Node<V> };\n    return null! as (T extends () => infer U ? Node<U> : never);\n}\nexport function mappedCaptured<T>() {\n    type Node = { [K in keyof T]: { value: T[K]; next: Node } };\n    return null! as Node;\n}\nexport function freshGeneric<T>(unused: T) {\n    const recur = <U>(value: U) => recur;\n    return recur;\n}\nexport function mutualCaptured<T, U>(left: T, right: U) {\n    type Left = { left: T; next: Right };\n    type Right = { right: U; self: Right; next: Left };\n    return { left: null! as Left, right: null! as Right };\n}\nexport class CapturedClass<T> {\n    constructor(public value: T) {}\n    make<U extends T>(inner: U) {\n        const node = { outer: this.value, inner, next: () => node };\n        return node;\n    }\n}\nexport function covariantClass() {\n    return class Node<out T> {\n        value!: T;\n        next(): Node<T> { return this; }\n    };\n}\nexport function contravariantClass() {\n    return class Node<in T> {\n        consume!: (value: T) => void;\n        next(): Node<T> { return this; }\n    };\n}\nexport namespace Nested {\n    export function captured<T>(value: T) {\n        const node = { value, next: () => node };\n        return node;\n    }\n}\ntype NonNullable<T> = \"shadowed\";\n// comment-only edit\n","signature":"850dc9bfa8257128f209cdd8c49501cd-type _recursive_1 = {\n    value: number;\n    next: _recursive_1;\n};\ntype _recursive_2 = {\n    value: string;\n    next: _recursive_2;\n};\ntype _recursive_3 = {\n    value: number;\n    next: _recursive_3;\n};\ntype _recursive_4 = {\n    value: number;\n    next: _recursive_4;\n};\ntype _recursive_5 = {\n    value: string;\n    next: _recursive_5;\n};\ntype _recursive_6 = {\n    value: boolean;\n    next: _recursive_6;\n};\ntype _recursive_7 = {\n    value: number;\n    next: _recursive_7;\n};\ntype _recursive_8 = {\n    value: number;\n    next: _recursive_8;\n};\ntype _recursive_9 = {\n    value: string;\n    next: _recursive_9;\n};\ntype _recursive_10 = {\n    value: number;\n    next: _recursive_10 | null;\n};\ntype _recursive_11 = {\n    value: number;\n    next: _recursive_11 | undefined;\n};\ntype _recursive_12 = {\n    value: number;\n    next: _recursive_12 | null | undefined;\n};\ntype _recursive_13 = {\n    value: number;\n    next: _recursive_13;\n};\ntype _recursive_14 = () => _recursive_14;\ntype _recursive_15<T> = {\n    value: T;\n    next: () => _recursive_15<T>;\n    consume: (other: T) => _recursive_15<T>;\n};\ntype _recursive_16<T, U> = {\n    outer: T;\n    inner: U;\n    next: () => _recursive_16<T, U>;\n    shadow: <T_1>(value: T_1) => {\n        outer: T;\n        inner: U;\n        value: T_1;\n        next: _recursive_16<T, U>;\n    };\n};\ntype _recursive_17<T extends {\n    value: number;\n}, K extends keyof T> = {\n    value: T[K];\n    next: () => _recursive_17<T, K>;\n};\ntype _recursive_18<T> = {\n    value: T;\n    next: _recursive_18<T>;\n};\ntype _recursive_19<T> = {\n    value: T;\n    next: _recursive_19<T>;\n};\ntype _recursive_20<T> = readonly [T, _recursive_20<T>];\ntype _recursive_21<U> = {\n    value: U;\n    next: _recursive_21<U>;\n};\ntype _recursive_22<T> = { [K in keyof T]: {\n    value: T[K];\n    next: _recursive_22<T>;\n}; };\ntype _recursive_23 = <U>(value: U) => _recursive_23;\ntype _recursive_24<T, U> = {\n    right: U;\n    self: _recursive_24<T, U>;\n    next: _recursive_25<T, U>;\n};\ntype _recursive_25<T, U> = {\n    left: T;\n    next: _recursive_24<T, U>;\n};\ntype _recursive_26<T, U extends T> = {\n    outer: T;\n    inner: U;\n    next: () => _recursive_26<T, U>;\n};\ntype _recursive_27<out T> = {\n    value: T;\n    next(): _recursive_27<T>;\n};\ntype _recursive_28<in T> = {\n    consume: (value: T) => void;\n    next(): _recursive_28<T>;\n};\nexport declare const arrow: () => typeof arrow;\nexport declare const expression: () => typeof expression;\nexport declare const first: () => typeof second;\nexport declare const second: () => typeof first;\nexport declare const generic: <T>(value: T) => typeof generic;\nexport declare const objectReturn: () => {\n    call: typeof objectReturn;\n};\nexport declare const tupleReturn: () => readonly [typeof tupleReturn];\nexport declare const shadowed: (shadowed: number) => typeof import(\".\").shadowed;\nexport declare const object: {\n    value: number;\n    next: () => typeof object;\n};\nexport declare const method: {\n    value: number;\n    next(): typeof method;\n};\nexport declare const accessor: {\n    value: number;\n    readonly next: typeof accessor;\n};\nexport declare const tuple: readonly [() => typeof tuple];\nexport declare const array: (() => typeof array)[];\nexport declare const nested: {\n    inner: {\n        next(): {\n            next(): (typeof nested)[\"inner\"];\n        };\n    };\n};\nexport declare const memberTuple: readonly [() => () => (typeof memberTuple)[0]];\nexport declare const memberArray: (() => (typeof memberArray)[0])[];\nexport declare const quoted: {\n    \"a-b\": () => () => (typeof quoted)[\"a-b\"];\n};\nexport declare const numeric: {\n    0: () => () => (typeof numeric)[0];\n};\nexport declare const key: unique symbol;\nexport declare const computed: {\n    [key]: () => (typeof computed)[typeof key];\n};\nexport declare const union: {\n    next: () => typeof union;\n} | undefined;\nexport declare const specialized: {\n    value: string;\n    next: () => typeof specialized;\n};\nexport declare const indexed: {\n    [key: string]: typeof indexed;\n};\nexport declare const mapped: {\n    next: typeof mapped;\n};\nexport declare const viaAnnotation: {\n    value: string;\n    next: () => typeof viaAnnotation;\n};\nexport type Link<T> = {\n    value: T;\n    next: Link<T>;\n};\nexport type Callable<T> = {\n    (value: T): Callable<T>;\n    link: Link<T>;\n};\nexport declare const link: Link<string>;\nexport declare const callable: Callable<number>;\nexport declare const nextLink: Link<string>;\nexport declare const nextCallable: Callable<number>;\nexport declare const hiddenAlias: {\n    value: string;\n    next: typeof hiddenAlias;\n};\nexport declare const siblingHiddenAliases: {\n    first: {\n        value: string;\n        next: (typeof siblingHiddenAliases)[\"first\"];\n    };\n    second: {\n        value: string;\n        next: (typeof siblingHiddenAliases)[\"second\"];\n    };\n};\nexport declare const parenthesized: () => typeof parenthesized;\nexport declare const asserted: () => typeof asserted;\nexport declare class Methods {\n    static recur(): (typeof Methods)[\"recur\"];\n    static \"a-b\"(): (typeof Methods)[\"a-b\"];\n    static [key](): (typeof Methods)[typeof key];\n    recur(): Methods[\"recur\"];\n}\nexport declare function overloaded(value: string): typeof overloaded;\nexport declare function overloaded(value: number): typeof overloaded;\nexport declare const nestedOwner: {\n    make<T>(outer: T): {\n        nested<U>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        constrained<U extends T = T>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        copied<U>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        rest<U>(values_0: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n    };\n};\nexport declare const nestedNumber: {\n    nested<U>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n    constrained<U extends number = number>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n    copied<U>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: typeof nestedOwner;\n    };\n    rest<U>(values_0: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n};\nexport declare const mappedCycle: {\n    Node: {\n        value: number;\n        next: (typeof mappedCycle)[\"Node\"];\n    };\n};\nexport declare const mappedCycleCopy: {\n    Node: {\n        value: number;\n        next: (typeof mappedCycleCopy)[\"Node\"];\n    };\n};\nexport declare const nestedCycle: {\n    wrapped: {\n        Node: {\n            value: string;\n            next: (typeof nestedCycle)[\"wrapped\"][\"Node\"];\n        };\n    };\n};\nexport declare const cycleKey: unique symbol;\nexport declare const keyedCycles: {\n    \"a-b\": {\n        value: string;\n        next: (typeof keyedCycles)[\"a-b\"];\n    };\n    0: {\n        value: boolean;\n        next: (typeof keyedCycles)[0];\n    };\n    [cycleKey]: {\n        value: number;\n        next: (typeof keyedCycles)[typeof cycleKey];\n    };\n};\nexport declare const sharedCycles: {\n    first: {\n        Node: {\n            value: number;\n            next: (typeof sharedCycles)[\"first\"][\"Node\"];\n        };\n    };\n    second: {\n        Node: {\n            value: number;\n            next: (typeof sharedCycles)[\"second\"][\"Node\"];\n        };\n    };\n};\nexport declare const mutualCycle: {\n    First: {\n        value: number;\n        next: {\n            value: string;\n            next: (typeof mutualCycle)[\"First\"];\n        };\n    };\n    Second: {\n        value: string;\n        next: {\n            value: number;\n            next: (typeof mutualCycle)[\"Second\"];\n        };\n    };\n};\nexport declare const shadowedCycle: {\n    Node: {\n        value: number;\n        next: <T>(shadowedCycle: T) => typeof import(\".\").shadowedCycle[\"Node\"];\n    };\n};\nexport declare const optionalCycle: {\n    Node?: _recursive_1;\n};\nexport declare const nullableCycle: {\n    Node: _recursive_2 | null;\n};\nexport declare const mixedCycles: {\n    required: {\n        Node?: _recursive_3;\n    };\n    optional?: {\n        Node?: _recursive_3;\n    } | null;\n};\nexport declare const sharedOptionalCycles: {\n    first: {\n        Node?: _recursive_4;\n    };\n    second: {\n        Node?: _recursive_4;\n    };\n};\nexport declare const nullableKeys: {\n    \"a-b\": _recursive_5 | null;\n    0: _recursive_6 | null;\n    [cycleKey]: _recursive_7 | null;\n};\nexport declare const nullableRoot: _recursive_8 | null;\nexport declare const optionalRoot: _recursive_9 | undefined;\nexport declare const nullableLinks: {\n    Node: {\n        value: number;\n        next: (typeof nullableLinks)[\"Node\"];\n    } | null;\n};\nexport declare const optionalNullableLinks: {\n    Node?: _recursive_10 | null;\n};\nexport declare const nullableOptionalLinks: {\n    Node: _recursive_11 | null;\n};\nexport declare const nullishLinks: {\n    Node?: _recursive_12 | null;\n};\nexport declare const mixedUnionCycle: {\n    Node?: false | _recursive_13 | null;\n};\nexport declare const _recursive = 1;\nexport declare const factory: () => () => _recursive_14;\nexport declare function captured<T>(value: T): _recursive_15<T>;\nexport declare function nestedCaptured<T>(outer: T): <U>(inner: U) => _recursive_16<T, U>;\nexport declare function constrained<T extends {\n    value: number;\n}, K extends keyof T>(key: K): _recursive_17<T, K>;\nexport declare function optionalCaptured<T>(value: T): {\n    node?: _recursive_18<T> | false | null;\n};\nexport declare function annotatedCaptured<T>(value: T): _recursive_19<T>;\nexport declare function recursiveTuple<T>(value: T): _recursive_20<T>;\nexport declare function inferredCaptured<T>(): (T extends () => infer U ? _recursive_21<U> : never);\nexport declare function mappedCaptured<T>(): _recursive_22<T>;\nexport declare function freshGeneric<T>(unused: T): _recursive_23;\nexport declare function mutualCaptured<T, U>(left: T, right: U): {\n    left: _recursive_25<T, U>;\n    right: _recursive_24<T, U>;\n};\nexport declare class CapturedClass<T> {\n    value: T;\n    constructor(value: T);\n    make<U extends T>(inner: U): _recursive_26<T, U>;\n}\nexport declare function covariantClass(): {\n    new <T>(): _recursive_27<T>;\n};\nexport declare function contravariantClass(): {\n    new <T>(): _recursive_28<T>;\n};\nexport declare namespace Nested {\n    type _recursive_29<T> = {\n        value: T;\n        next: () => _recursive_29<T>;\n    };\n    export function captured<T>(value: T): _recursive_29<T>;\n    export {};\n}\nexport {};\n","impliedNodeFormat":1}],"options":{"composite":true,"exactOptionalPropertyTypes":true,"outDir":"./","strict":true},"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../index.ts"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.es2026.full.d.ts",
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
      "fileName": "../index.ts",
      "version": "8be79633abc8e3e9d5c07f355c360ccf-export const arrow = () => arrow;\nexport const expression = function self() { return self; };\nexport const first = () => second;\nexport const second = () => first;\nexport const generic = <T>(value: T) => generic;\nexport const objectReturn = () => ({ call: objectReturn });\nexport const tupleReturn = () => [tupleReturn] as const;\nexport const shadowed = function self(shadowed: number) { return self; };\nexport const object = { value: 1, next: () => object };\nexport const method = { value: 1, next() { return method; } };\nexport const accessor = { value: 1, get next() { return accessor; } };\nexport const tuple = [() => tuple] as const;\nexport const array = [() => array];\nexport const nested = { inner: { next() { return nested.inner; } } };\nexport const memberTuple = [function self() { return self; }] as const;\nexport const memberArray = [function self() { return self; }];\nexport const quoted = { \"a-b\": function self() { return self; } };\nexport const numeric = { 0: function self() { return self; } };\nexport const key = Symbol();\nexport const computed = { [key]: function self() { return self; } };\nexport const union = true as boolean ? { next: () => union } : undefined;\nfunction create<T>(value: T) {\n    const result = { value, next: () => result };\n    return result;\n}\nexport const specialized = create(\"text\");\nfunction createIndexed() {\n    const value: { [key: string]: typeof value } = {};\n    return value;\n}\nexport const indexed = createIndexed();\nfunction createMapped<T>() {\n    const value: { [K in keyof T]: typeof value } = null!;\n    return value;\n}\nexport const mapped = createMapped<{ next: unknown }>();\nfunction createAnnotated<T>(value: T) {\n    const node: { value: T; next: () => typeof node } = { value, next: () => node };\n    return node;\n}\nexport const viaAnnotation = createAnnotated(\"text\");\nexport type Link<T> = { value: T; next: Link<T> };\nexport type Callable<T> = { (value: T): Callable<T>; link: Link<T> };\nexport declare const link: Link<string>;\nexport declare const callable: Callable<number>;\nexport const nextLink = link.next;\nexport const nextCallable = callable(1);\nfunction createHidden<T>(value: T) {\n    type Hidden = { value: T; next: Hidden };\n    return null! as Hidden;\n}\nexport const hiddenAlias = createHidden(\"text\");\nexport const siblingHiddenAliases = { first: hiddenAlias, second: hiddenAlias };\nexport const parenthesized = (function self() { return self; });\nexport const asserted = (function self() { return self; }) satisfies () => unknown;\nexport class Methods {\n    static recur() { return Methods.recur; }\n    static \"a-b\"() { return Methods[\"a-b\"]; }\n    static [key]() { return Methods[key]; }\n    recur() { return this.recur; }\n}\nexport function overloaded(value: string): typeof overloaded;\nexport function overloaded(value: number): typeof overloaded;\nexport function overloaded(value: string | number) { return overloaded; }\nexport const nestedOwner = {\n    make<T>(outer: T) {\n        return {\n            nested<U>(inner: U) { return { outer, inner, owner: nestedOwner }; },\n            constrained<U extends T = T>(inner: U) { return { outer, inner, owner: nestedOwner }; },\n            copied<U>(inner: U): { outer: T; inner: U; owner: typeof nestedOwner } {\n                return { outer, inner, owner: nestedOwner };\n            },\n            rest<U>(...values: [U]) { return { outer, inner: values[0], owner: nestedOwner }; },\n        };\n    },\n};\nexport const nestedNumber = nestedOwner.make(1);\ntype Show<T> = { [K in keyof T]: T[K] } & unknown;\ntype Resolve<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? Resolve<M, K> : M[K][P];\n}>;\ndeclare const build: <M>() => { [K in keyof M]: Resolve<M, K> };\nexport const mappedCycle = build<{ Node: { value: number; next: \"ref\" } }>();\nexport const mappedCycleCopy = mappedCycle;\nexport const nestedCycle = { wrapped: build<{ Node: { value: string; next: \"ref\" } }>() };\nexport const cycleKey = Symbol();\nexport const keyedCycles = build<{\n    \"a-b\": { value: string; next: \"ref\" };\n    0: { value: boolean; next: \"ref\" };\n    [cycleKey]: { value: number; next: \"ref\" };\n}>();\nexport const sharedCycles = { first: mappedCycle, second: mappedCycle };\ntype ResolveMutual<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends { ref: infer R extends keyof M } ? ResolveMutual<M, R> : M[K][P];\n}>;\ndeclare const buildMutual: <M>() => { [K in keyof M]: ResolveMutual<M, K> };\nexport const mutualCycle = buildMutual<{\n    First: { value: number; next: { ref: \"Second\" } };\n    Second: { value: string; next: { ref: \"First\" } };\n}>();\ntype ResolveShadowed<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? <T>(shadowedCycle: T) => ResolveShadowed<M, K> : M[K][P];\n}>;\ndeclare const buildShadowed: <M>() => { [K in keyof M]: ResolveShadowed<M, K> };\nexport const shadowedCycle = buildShadowed<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildOptional: <M>() => { [K in keyof M]?: Resolve<M, K> };\nexport const optionalCycle = buildOptional<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildNullable: <M>() => { [K in keyof M]: Resolve<M, K> | null };\nexport const nullableCycle = buildNullable<{ Node: { value: string; next: \"ref\" } }>();\ndeclare const wrap: <T>(value: T) => { required: T; optional?: T | null };\nexport const mixedCycles = wrap(optionalCycle);\nexport const sharedOptionalCycles = { first: optionalCycle, second: optionalCycle };\nexport const nullableKeys = buildNullable<{\n    \"a-b\": { value: string; next: \"ref\" };\n    0: { value: boolean; next: \"ref\" };\n    [cycleKey]: { value: number; next: \"ref\" };\n}>();\ndeclare const buildNullableRoot: <M>() => Resolve<M, keyof M> | null;\nexport const nullableRoot = buildNullableRoot<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildOptionalRoot: <M>() => Resolve<M, keyof M> | undefined;\nexport const optionalRoot = buildOptionalRoot<{ Node: { value: string; next: \"ref\" } }>();\ntype ResolveNullable<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? ResolveNullable<M, K> | null : M[K][P];\n}>;\ndeclare const buildNullableLinks: <M>() => { [K in keyof M]: ResolveNullable<M, K> | null };\nexport const nullableLinks = buildNullableLinks<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildOptionalNullableLinks: <M>() => { [K in keyof M]?: ResolveNullable<M, K> | null };\nexport const optionalNullableLinks = buildOptionalNullableLinks<{ Node: { value: number; next: \"ref\" } }>();\ntype ResolveOptional<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? ResolveOptional<M, K> | undefined : M[K][P];\n}>;\ndeclare const buildNullableOptionalLinks: <M>() => { [K in keyof M]: ResolveOptional<M, K> | null };\nexport const nullableOptionalLinks = buildNullableOptionalLinks<{ Node: { value: number; next: \"ref\" } }>();\ntype ResolveNullish<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? ResolveNullish<M, K> | null | undefined : M[K][P];\n}>;\ndeclare const buildNullishLinks: <M>() => { [K in keyof M]?: ResolveNullish<M, K> | null };\nexport const nullishLinks = buildNullishLinks<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildMixed: <M>() => { [K in keyof M]?: Resolve<M, K> | false | null };\nexport const mixedUnionCycle = buildMixed<{ Node: { value: number; next: \"ref\" } }>();\nexport const _recursive = 1;\nexport const factory = () => function self() { return self; };\nexport function captured<T>(value: T) {\n    const node = { value, next: () => node, consume: (other: T) => node };\n    return node;\n}\nexport function nestedCaptured<T>(outer: T) {\n    return <U>(inner: U) => {\n        const node = {\n            outer, inner, next: () => node,\n            shadow: <T>(value: T) => ({ outer, inner, value, next: node }),\n        };\n        return node;\n    };\n}\nexport function constrained<T extends { value: number }, K extends keyof T>(key: K) {\n    const node = { value: null! as T[K], next: () => node };\n    return node;\n}\nexport function optionalCaptured<T>(value: T) {\n    type Node = { value: T; next: Node };\n    return null! as { node?: Node | false | null };\n}\nexport function annotatedCaptured<T>(value: T) {\n    const node: { value: typeof value; next: typeof node } = { value, next: null! };\n    return node;\n}\nexport function recursiveTuple<T>(value: T) {\n    type Tuple = readonly [T, Tuple];\n    return null! as Tuple;\n}\nexport function inferredCaptured<T>() {\n    type Node<V> = { value: V; next: Node<V> };\n    return null! as (T extends () => infer U ? Node<U> : never);\n}\nexport function mappedCaptured<T>() {\n    type Node = { [K in keyof T]: { value: T[K]; next: Node } };\n    return null! as Node;\n}\nexport function freshGeneric<T>(unused: T) {\n    const recur = <U>(value: U) => recur;\n    return recur;\n}\nexport function mutualCaptured<T, U>(left: T, right: U) {\n    type Left = { left: T; next: Right };\n    type Right = { right: U; self: Right; next: Left };\n    return { left: null! as Left, right: null! as Right };\n}\nexport class CapturedClass<T> {\n    constructor(public value: T) {}\n    make<U extends T>(inner: U) {\n        const node = { outer: this.value, inner, next: () => node };\n        return node;\n    }\n}\nexport function covariantClass() {\n    return class Node<out T> {\n        value!: T;\n        next(): Node<T> { return this; }\n    };\n}\nexport function contravariantClass() {\n    return class Node<in T> {\n        consume!: (value: T) => void;\n        next(): Node<T> { return this; }\n    };\n}\nexport namespace Nested {\n    export function captured<T>(value: T) {\n        const node = { value, next: () => node };\n        return node;\n    }\n}\ntype NonNullable<T> = \"shadowed\";\n// comment-only edit\n",
      "signature": "850dc9bfa8257128f209cdd8c49501cd-type _recursive_1 = {\n    value: number;\n    next: _recursive_1;\n};\ntype _recursive_2 = {\n    value: string;\n    next: _recursive_2;\n};\ntype _recursive_3 = {\n    value: number;\n    next: _recursive_3;\n};\ntype _recursive_4 = {\n    value: number;\n    next: _recursive_4;\n};\ntype _recursive_5 = {\n    value: string;\n    next: _recursive_5;\n};\ntype _recursive_6 = {\n    value: boolean;\n    next: _recursive_6;\n};\ntype _recursive_7 = {\n    value: number;\n    next: _recursive_7;\n};\ntype _recursive_8 = {\n    value: number;\n    next: _recursive_8;\n};\ntype _recursive_9 = {\n    value: string;\n    next: _recursive_9;\n};\ntype _recursive_10 = {\n    value: number;\n    next: _recursive_10 | null;\n};\ntype _recursive_11 = {\n    value: number;\n    next: _recursive_11 | undefined;\n};\ntype _recursive_12 = {\n    value: number;\n    next: _recursive_12 | null | undefined;\n};\ntype _recursive_13 = {\n    value: number;\n    next: _recursive_13;\n};\ntype _recursive_14 = () => _recursive_14;\ntype _recursive_15<T> = {\n    value: T;\n    next: () => _recursive_15<T>;\n    consume: (other: T) => _recursive_15<T>;\n};\ntype _recursive_16<T, U> = {\n    outer: T;\n    inner: U;\n    next: () => _recursive_16<T, U>;\n    shadow: <T_1>(value: T_1) => {\n        outer: T;\n        inner: U;\n        value: T_1;\n        next: _recursive_16<T, U>;\n    };\n};\ntype _recursive_17<T extends {\n    value: number;\n}, K extends keyof T> = {\n    value: T[K];\n    next: () => _recursive_17<T, K>;\n};\ntype _recursive_18<T> = {\n    value: T;\n    next: _recursive_18<T>;\n};\ntype _recursive_19<T> = {\n    value: T;\n    next: _recursive_19<T>;\n};\ntype _recursive_20<T> = readonly [T, _recursive_20<T>];\ntype _recursive_21<U> = {\n    value: U;\n    next: _recursive_21<U>;\n};\ntype _recursive_22<T> = { [K in keyof T]: {\n    value: T[K];\n    next: _recursive_22<T>;\n}; };\ntype _recursive_23 = <U>(value: U) => _recursive_23;\ntype _recursive_24<T, U> = {\n    right: U;\n    self: _recursive_24<T, U>;\n    next: _recursive_25<T, U>;\n};\ntype _recursive_25<T, U> = {\n    left: T;\n    next: _recursive_24<T, U>;\n};\ntype _recursive_26<T, U extends T> = {\n    outer: T;\n    inner: U;\n    next: () => _recursive_26<T, U>;\n};\ntype _recursive_27<out T> = {\n    value: T;\n    next(): _recursive_27<T>;\n};\ntype _recursive_28<in T> = {\n    consume: (value: T) => void;\n    next(): _recursive_28<T>;\n};\nexport declare const arrow: () => typeof arrow;\nexport declare const expression: () => typeof expression;\nexport declare const first: () => typeof second;\nexport declare const second: () => typeof first;\nexport declare const generic: <T>(value: T) => typeof generic;\nexport declare const objectReturn: () => {\n    call: typeof objectReturn;\n};\nexport declare const tupleReturn: () => readonly [typeof tupleReturn];\nexport declare const shadowed: (shadowed: number) => typeof import(\".\").shadowed;\nexport declare const object: {\n    value: number;\n    next: () => typeof object;\n};\nexport declare const method: {\n    value: number;\n    next(): typeof method;\n};\nexport declare const accessor: {\n    value: number;\n    readonly next: typeof accessor;\n};\nexport declare const tuple: readonly [() => typeof tuple];\nexport declare const array: (() => typeof array)[];\nexport declare const nested: {\n    inner: {\n        next(): {\n            next(): (typeof nested)[\"inner\"];\n        };\n    };\n};\nexport declare const memberTuple: readonly [() => () => (typeof memberTuple)[0]];\nexport declare const memberArray: (() => (typeof memberArray)[0])[];\nexport declare const quoted: {\n    \"a-b\": () => () => (typeof quoted)[\"a-b\"];\n};\nexport declare const numeric: {\n    0: () => () => (typeof numeric)[0];\n};\nexport declare const key: unique symbol;\nexport declare const computed: {\n    [key]: () => (typeof computed)[typeof key];\n};\nexport declare const union: {\n    next: () => typeof union;\n} | undefined;\nexport declare const specialized: {\n    value: string;\n    next: () => typeof specialized;\n};\nexport declare const indexed: {\n    [key: string]: typeof indexed;\n};\nexport declare const mapped: {\n    next: typeof mapped;\n};\nexport declare const viaAnnotation: {\n    value: string;\n    next: () => typeof viaAnnotation;\n};\nexport type Link<T> = {\n    value: T;\n    next: Link<T>;\n};\nexport type Callable<T> = {\n    (value: T): Callable<T>;\n    link: Link<T>;\n};\nexport declare const link: Link<string>;\nexport declare const callable: Callable<number>;\nexport declare const nextLink: Link<string>;\nexport declare const nextCallable: Callable<number>;\nexport declare const hiddenAlias: {\n    value: string;\n    next: typeof hiddenAlias;\n};\nexport declare const siblingHiddenAliases: {\n    first: {\n        value: string;\n        next: (typeof siblingHiddenAliases)[\"first\"];\n    };\n    second: {\n        value: string;\n        next: (typeof siblingHiddenAliases)[\"second\"];\n    };\n};\nexport declare const parenthesized: () => typeof parenthesized;\nexport declare const asserted: () => typeof asserted;\nexport declare class Methods {\n    static recur(): (typeof Methods)[\"recur\"];\n    static \"a-b\"(): (typeof Methods)[\"a-b\"];\n    static [key](): (typeof Methods)[typeof key];\n    recur(): Methods[\"recur\"];\n}\nexport declare function overloaded(value: string): typeof overloaded;\nexport declare function overloaded(value: number): typeof overloaded;\nexport declare const nestedOwner: {\n    make<T>(outer: T): {\n        nested<U>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        constrained<U extends T = T>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        copied<U>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        rest<U>(values_0: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n    };\n};\nexport declare const nestedNumber: {\n    nested<U>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n    constrained<U extends number = number>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n    copied<U>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: typeof nestedOwner;\n    };\n    rest<U>(values_0: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n};\nexport declare const mappedCycle: {\n    Node: {\n        value: number;\n        next: (typeof mappedCycle)[\"Node\"];\n    };\n};\nexport declare const mappedCycleCopy: {\n    Node: {\n        value: number;\n        next: (typeof mappedCycleCopy)[\"Node\"];\n    };\n};\nexport declare const nestedCycle: {\n    wrapped: {\n        Node: {\n            value: string;\n            next: (typeof nestedCycle)[\"wrapped\"][\"Node\"];\n        };\n    };\n};\nexport declare const cycleKey: unique symbol;\nexport declare const keyedCycles: {\n    \"a-b\": {\n        value: string;\n        next: (typeof keyedCycles)[\"a-b\"];\n    };\n    0: {\n        value: boolean;\n        next: (typeof keyedCycles)[0];\n    };\n    [cycleKey]: {\n        value: number;\n        next: (typeof keyedCycles)[typeof cycleKey];\n    };\n};\nexport declare const sharedCycles: {\n    first: {\n        Node: {\n            value: number;\n            next: (typeof sharedCycles)[\"first\"][\"Node\"];\n        };\n    };\n    second: {\n        Node: {\n            value: number;\n            next: (typeof sharedCycles)[\"second\"][\"Node\"];\n        };\n    };\n};\nexport declare const mutualCycle: {\n    First: {\n        value: number;\n        next: {\n            value: string;\n            next: (typeof mutualCycle)[\"First\"];\n        };\n    };\n    Second: {\n        value: string;\n        next: {\n            value: number;\n            next: (typeof mutualCycle)[\"Second\"];\n        };\n    };\n};\nexport declare const shadowedCycle: {\n    Node: {\n        value: number;\n        next: <T>(shadowedCycle: T) => typeof import(\".\").shadowedCycle[\"Node\"];\n    };\n};\nexport declare const optionalCycle: {\n    Node?: _recursive_1;\n};\nexport declare const nullableCycle: {\n    Node: _recursive_2 | null;\n};\nexport declare const mixedCycles: {\n    required: {\n        Node?: _recursive_3;\n    };\n    optional?: {\n        Node?: _recursive_3;\n    } | null;\n};\nexport declare const sharedOptionalCycles: {\n    first: {\n        Node?: _recursive_4;\n    };\n    second: {\n        Node?: _recursive_4;\n    };\n};\nexport declare const nullableKeys: {\n    \"a-b\": _recursive_5 | null;\n    0: _recursive_6 | null;\n    [cycleKey]: _recursive_7 | null;\n};\nexport declare const nullableRoot: _recursive_8 | null;\nexport declare const optionalRoot: _recursive_9 | undefined;\nexport declare const nullableLinks: {\n    Node: {\n        value: number;\n        next: (typeof nullableLinks)[\"Node\"];\n    } | null;\n};\nexport declare const optionalNullableLinks: {\n    Node?: _recursive_10 | null;\n};\nexport declare const nullableOptionalLinks: {\n    Node: _recursive_11 | null;\n};\nexport declare const nullishLinks: {\n    Node?: _recursive_12 | null;\n};\nexport declare const mixedUnionCycle: {\n    Node?: false | _recursive_13 | null;\n};\nexport declare const _recursive = 1;\nexport declare const factory: () => () => _recursive_14;\nexport declare function captured<T>(value: T): _recursive_15<T>;\nexport declare function nestedCaptured<T>(outer: T): <U>(inner: U) => _recursive_16<T, U>;\nexport declare function constrained<T extends {\n    value: number;\n}, K extends keyof T>(key: K): _recursive_17<T, K>;\nexport declare function optionalCaptured<T>(value: T): {\n    node?: _recursive_18<T> | false | null;\n};\nexport declare function annotatedCaptured<T>(value: T): _recursive_19<T>;\nexport declare function recursiveTuple<T>(value: T): _recursive_20<T>;\nexport declare function inferredCaptured<T>(): (T extends () => infer U ? _recursive_21<U> : never);\nexport declare function mappedCaptured<T>(): _recursive_22<T>;\nexport declare function freshGeneric<T>(unused: T): _recursive_23;\nexport declare function mutualCaptured<T, U>(left: T, right: U): {\n    left: _recursive_25<T, U>;\n    right: _recursive_24<T, U>;\n};\nexport declare class CapturedClass<T> {\n    value: T;\n    constructor(value: T);\n    make<U extends T>(inner: U): _recursive_26<T, U>;\n}\nexport declare function covariantClass(): {\n    new <T>(): _recursive_27<T>;\n};\nexport declare function contravariantClass(): {\n    new <T>(): _recursive_28<T>;\n};\nexport declare namespace Nested {\n    type _recursive_29<T> = {\n        value: T;\n        next: () => _recursive_29<T>;\n    };\n    export function captured<T>(value: T): _recursive_29<T>;\n    export {};\n}\nexport {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8be79633abc8e3e9d5c07f355c360ccf-export const arrow = () => arrow;\nexport const expression = function self() { return self; };\nexport const first = () => second;\nexport const second = () => first;\nexport const generic = <T>(value: T) => generic;\nexport const objectReturn = () => ({ call: objectReturn });\nexport const tupleReturn = () => [tupleReturn] as const;\nexport const shadowed = function self(shadowed: number) { return self; };\nexport const object = { value: 1, next: () => object };\nexport const method = { value: 1, next() { return method; } };\nexport const accessor = { value: 1, get next() { return accessor; } };\nexport const tuple = [() => tuple] as const;\nexport const array = [() => array];\nexport const nested = { inner: { next() { return nested.inner; } } };\nexport const memberTuple = [function self() { return self; }] as const;\nexport const memberArray = [function self() { return self; }];\nexport const quoted = { \"a-b\": function self() { return self; } };\nexport const numeric = { 0: function self() { return self; } };\nexport const key = Symbol();\nexport const computed = { [key]: function self() { return self; } };\nexport const union = true as boolean ? { next: () => union } : undefined;\nfunction create<T>(value: T) {\n    const result = { value, next: () => result };\n    return result;\n}\nexport const specialized = create(\"text\");\nfunction createIndexed() {\n    const value: { [key: string]: typeof value } = {};\n    return value;\n}\nexport const indexed = createIndexed();\nfunction createMapped<T>() {\n    const value: { [K in keyof T]: typeof value } = null!;\n    return value;\n}\nexport const mapped = createMapped<{ next: unknown }>();\nfunction createAnnotated<T>(value: T) {\n    const node: { value: T; next: () => typeof node } = { value, next: () => node };\n    return node;\n}\nexport const viaAnnotation = createAnnotated(\"text\");\nexport type Link<T> = { value: T; next: Link<T> };\nexport type Callable<T> = { (value: T): Callable<T>; link: Link<T> };\nexport declare const link: Link<string>;\nexport declare const callable: Callable<number>;\nexport const nextLink = link.next;\nexport const nextCallable = callable(1);\nfunction createHidden<T>(value: T) {\n    type Hidden = { value: T; next: Hidden };\n    return null! as Hidden;\n}\nexport const hiddenAlias = createHidden(\"text\");\nexport const siblingHiddenAliases = { first: hiddenAlias, second: hiddenAlias };\nexport const parenthesized = (function self() { return self; });\nexport const asserted = (function self() { return self; }) satisfies () => unknown;\nexport class Methods {\n    static recur() { return Methods.recur; }\n    static \"a-b\"() { return Methods[\"a-b\"]; }\n    static [key]() { return Methods[key]; }\n    recur() { return this.recur; }\n}\nexport function overloaded(value: string): typeof overloaded;\nexport function overloaded(value: number): typeof overloaded;\nexport function overloaded(value: string | number) { return overloaded; }\nexport const nestedOwner = {\n    make<T>(outer: T) {\n        return {\n            nested<U>(inner: U) { return { outer, inner, owner: nestedOwner }; },\n            constrained<U extends T = T>(inner: U) { return { outer, inner, owner: nestedOwner }; },\n            copied<U>(inner: U): { outer: T; inner: U; owner: typeof nestedOwner } {\n                return { outer, inner, owner: nestedOwner };\n            },\n            rest<U>(...values: [U]) { return { outer, inner: values[0], owner: nestedOwner }; },\n        };\n    },\n};\nexport const nestedNumber = nestedOwner.make(1);\ntype Show<T> = { [K in keyof T]: T[K] } & unknown;\ntype Resolve<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? Resolve<M, K> : M[K][P];\n}>;\ndeclare const build: <M>() => { [K in keyof M]: Resolve<M, K> };\nexport const mappedCycle = build<{ Node: { value: number; next: \"ref\" } }>();\nexport const mappedCycleCopy = mappedCycle;\nexport const nestedCycle = { wrapped: build<{ Node: { value: string; next: \"ref\" } }>() };\nexport const cycleKey = Symbol();\nexport const keyedCycles = build<{\n    \"a-b\": { value: string; next: \"ref\" };\n    0: { value: boolean; next: \"ref\" };\n    [cycleKey]: { value: number; next: \"ref\" };\n}>();\nexport const sharedCycles = { first: mappedCycle, second: mappedCycle };\ntype ResolveMutual<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends { ref: infer R extends keyof M } ? ResolveMutual<M, R> : M[K][P];\n}>;\ndeclare const buildMutual: <M>() => { [K in keyof M]: ResolveMutual<M, K> };\nexport const mutualCycle = buildMutual<{\n    First: { value: number; next: { ref: \"Second\" } };\n    Second: { value: string; next: { ref: \"First\" } };\n}>();\ntype ResolveShadowed<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? <T>(shadowedCycle: T) => ResolveShadowed<M, K> : M[K][P];\n}>;\ndeclare const buildShadowed: <M>() => { [K in keyof M]: ResolveShadowed<M, K> };\nexport const shadowedCycle = buildShadowed<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildOptional: <M>() => { [K in keyof M]?: Resolve<M, K> };\nexport const optionalCycle = buildOptional<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildNullable: <M>() => { [K in keyof M]: Resolve<M, K> | null };\nexport const nullableCycle = buildNullable<{ Node: { value: string; next: \"ref\" } }>();\ndeclare const wrap: <T>(value: T) => { required: T; optional?: T | null };\nexport const mixedCycles = wrap(optionalCycle);\nexport const sharedOptionalCycles = { first: optionalCycle, second: optionalCycle };\nexport const nullableKeys = buildNullable<{\n    \"a-b\": { value: string; next: \"ref\" };\n    0: { value: boolean; next: \"ref\" };\n    [cycleKey]: { value: number; next: \"ref\" };\n}>();\ndeclare const buildNullableRoot: <M>() => Resolve<M, keyof M> | null;\nexport const nullableRoot = buildNullableRoot<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildOptionalRoot: <M>() => Resolve<M, keyof M> | undefined;\nexport const optionalRoot = buildOptionalRoot<{ Node: { value: string; next: \"ref\" } }>();\ntype ResolveNullable<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? ResolveNullable<M, K> | null : M[K][P];\n}>;\ndeclare const buildNullableLinks: <M>() => { [K in keyof M]: ResolveNullable<M, K> | null };\nexport const nullableLinks = buildNullableLinks<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildOptionalNullableLinks: <M>() => { [K in keyof M]?: ResolveNullable<M, K> | null };\nexport const optionalNullableLinks = buildOptionalNullableLinks<{ Node: { value: number; next: \"ref\" } }>();\ntype ResolveOptional<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? ResolveOptional<M, K> | undefined : M[K][P];\n}>;\ndeclare const buildNullableOptionalLinks: <M>() => { [K in keyof M]: ResolveOptional<M, K> | null };\nexport const nullableOptionalLinks = buildNullableOptionalLinks<{ Node: { value: number; next: \"ref\" } }>();\ntype ResolveNullish<M, K extends keyof M> = Show<{\n    [P in keyof M[K]]: M[K][P] extends \"ref\" ? ResolveNullish<M, K> | null | undefined : M[K][P];\n}>;\ndeclare const buildNullishLinks: <M>() => { [K in keyof M]?: ResolveNullish<M, K> | null };\nexport const nullishLinks = buildNullishLinks<{ Node: { value: number; next: \"ref\" } }>();\ndeclare const buildMixed: <M>() => { [K in keyof M]?: Resolve<M, K> | false | null };\nexport const mixedUnionCycle = buildMixed<{ Node: { value: number; next: \"ref\" } }>();\nexport const _recursive = 1;\nexport const factory = () => function self() { return self; };\nexport function captured<T>(value: T) {\n    const node = { value, next: () => node, consume: (other: T) => node };\n    return node;\n}\nexport function nestedCaptured<T>(outer: T) {\n    return <U>(inner: U) => {\n        const node = {\n            outer, inner, next: () => node,\n            shadow: <T>(value: T) => ({ outer, inner, value, next: node }),\n        };\n        return node;\n    };\n}\nexport function constrained<T extends { value: number }, K extends keyof T>(key: K) {\n    const node = { value: null! as T[K], next: () => node };\n    return node;\n}\nexport function optionalCaptured<T>(value: T) {\n    type Node = { value: T; next: Node };\n    return null! as { node?: Node | false | null };\n}\nexport function annotatedCaptured<T>(value: T) {\n    const node: { value: typeof value; next: typeof node } = { value, next: null! };\n    return node;\n}\nexport function recursiveTuple<T>(value: T) {\n    type Tuple = readonly [T, Tuple];\n    return null! as Tuple;\n}\nexport function inferredCaptured<T>() {\n    type Node<V> = { value: V; next: Node<V> };\n    return null! as (T extends () => infer U ? Node<U> : never);\n}\nexport function mappedCaptured<T>() {\n    type Node = { [K in keyof T]: { value: T[K]; next: Node } };\n    return null! as Node;\n}\nexport function freshGeneric<T>(unused: T) {\n    const recur = <U>(value: U) => recur;\n    return recur;\n}\nexport function mutualCaptured<T, U>(left: T, right: U) {\n    type Left = { left: T; next: Right };\n    type Right = { right: U; self: Right; next: Left };\n    return { left: null! as Left, right: null! as Right };\n}\nexport class CapturedClass<T> {\n    constructor(public value: T) {}\n    make<U extends T>(inner: U) {\n        const node = { outer: this.value, inner, next: () => node };\n        return node;\n    }\n}\nexport function covariantClass() {\n    return class Node<out T> {\n        value!: T;\n        next(): Node<T> { return this; }\n    };\n}\nexport function contravariantClass() {\n    return class Node<in T> {\n        consume!: (value: T) => void;\n        next(): Node<T> { return this; }\n    };\n}\nexport namespace Nested {\n    export function captured<T>(value: T) {\n        const node = { value, next: () => node };\n        return node;\n    }\n}\ntype NonNullable<T> = \"shadowed\";\n// comment-only edit\n",
        "signature": "850dc9bfa8257128f209cdd8c49501cd-type _recursive_1 = {\n    value: number;\n    next: _recursive_1;\n};\ntype _recursive_2 = {\n    value: string;\n    next: _recursive_2;\n};\ntype _recursive_3 = {\n    value: number;\n    next: _recursive_3;\n};\ntype _recursive_4 = {\n    value: number;\n    next: _recursive_4;\n};\ntype _recursive_5 = {\n    value: string;\n    next: _recursive_5;\n};\ntype _recursive_6 = {\n    value: boolean;\n    next: _recursive_6;\n};\ntype _recursive_7 = {\n    value: number;\n    next: _recursive_7;\n};\ntype _recursive_8 = {\n    value: number;\n    next: _recursive_8;\n};\ntype _recursive_9 = {\n    value: string;\n    next: _recursive_9;\n};\ntype _recursive_10 = {\n    value: number;\n    next: _recursive_10 | null;\n};\ntype _recursive_11 = {\n    value: number;\n    next: _recursive_11 | undefined;\n};\ntype _recursive_12 = {\n    value: number;\n    next: _recursive_12 | null | undefined;\n};\ntype _recursive_13 = {\n    value: number;\n    next: _recursive_13;\n};\ntype _recursive_14 = () => _recursive_14;\ntype _recursive_15<T> = {\n    value: T;\n    next: () => _recursive_15<T>;\n    consume: (other: T) => _recursive_15<T>;\n};\ntype _recursive_16<T, U> = {\n    outer: T;\n    inner: U;\n    next: () => _recursive_16<T, U>;\n    shadow: <T_1>(value: T_1) => {\n        outer: T;\n        inner: U;\n        value: T_1;\n        next: _recursive_16<T, U>;\n    };\n};\ntype _recursive_17<T extends {\n    value: number;\n}, K extends keyof T> = {\n    value: T[K];\n    next: () => _recursive_17<T, K>;\n};\ntype _recursive_18<T> = {\n    value: T;\n    next: _recursive_18<T>;\n};\ntype _recursive_19<T> = {\n    value: T;\n    next: _recursive_19<T>;\n};\ntype _recursive_20<T> = readonly [T, _recursive_20<T>];\ntype _recursive_21<U> = {\n    value: U;\n    next: _recursive_21<U>;\n};\ntype _recursive_22<T> = { [K in keyof T]: {\n    value: T[K];\n    next: _recursive_22<T>;\n}; };\ntype _recursive_23 = <U>(value: U) => _recursive_23;\ntype _recursive_24<T, U> = {\n    right: U;\n    self: _recursive_24<T, U>;\n    next: _recursive_25<T, U>;\n};\ntype _recursive_25<T, U> = {\n    left: T;\n    next: _recursive_24<T, U>;\n};\ntype _recursive_26<T, U extends T> = {\n    outer: T;\n    inner: U;\n    next: () => _recursive_26<T, U>;\n};\ntype _recursive_27<out T> = {\n    value: T;\n    next(): _recursive_27<T>;\n};\ntype _recursive_28<in T> = {\n    consume: (value: T) => void;\n    next(): _recursive_28<T>;\n};\nexport declare const arrow: () => typeof arrow;\nexport declare const expression: () => typeof expression;\nexport declare const first: () => typeof second;\nexport declare const second: () => typeof first;\nexport declare const generic: <T>(value: T) => typeof generic;\nexport declare const objectReturn: () => {\n    call: typeof objectReturn;\n};\nexport declare const tupleReturn: () => readonly [typeof tupleReturn];\nexport declare const shadowed: (shadowed: number) => typeof import(\".\").shadowed;\nexport declare const object: {\n    value: number;\n    next: () => typeof object;\n};\nexport declare const method: {\n    value: number;\n    next(): typeof method;\n};\nexport declare const accessor: {\n    value: number;\n    readonly next: typeof accessor;\n};\nexport declare const tuple: readonly [() => typeof tuple];\nexport declare const array: (() => typeof array)[];\nexport declare const nested: {\n    inner: {\n        next(): {\n            next(): (typeof nested)[\"inner\"];\n        };\n    };\n};\nexport declare const memberTuple: readonly [() => () => (typeof memberTuple)[0]];\nexport declare const memberArray: (() => (typeof memberArray)[0])[];\nexport declare const quoted: {\n    \"a-b\": () => () => (typeof quoted)[\"a-b\"];\n};\nexport declare const numeric: {\n    0: () => () => (typeof numeric)[0];\n};\nexport declare const key: unique symbol;\nexport declare const computed: {\n    [key]: () => (typeof computed)[typeof key];\n};\nexport declare const union: {\n    next: () => typeof union;\n} | undefined;\nexport declare const specialized: {\n    value: string;\n    next: () => typeof specialized;\n};\nexport declare const indexed: {\n    [key: string]: typeof indexed;\n};\nexport declare const mapped: {\n    next: typeof mapped;\n};\nexport declare const viaAnnotation: {\n    value: string;\n    next: () => typeof viaAnnotation;\n};\nexport type Link<T> = {\n    value: T;\n    next: Link<T>;\n};\nexport type Callable<T> = {\n    (value: T): Callable<T>;\n    link: Link<T>;\n};\nexport declare const link: Link<string>;\nexport declare const callable: Callable<number>;\nexport declare const nextLink: Link<string>;\nexport declare const nextCallable: Callable<number>;\nexport declare const hiddenAlias: {\n    value: string;\n    next: typeof hiddenAlias;\n};\nexport declare const siblingHiddenAliases: {\n    first: {\n        value: string;\n        next: (typeof siblingHiddenAliases)[\"first\"];\n    };\n    second: {\n        value: string;\n        next: (typeof siblingHiddenAliases)[\"second\"];\n    };\n};\nexport declare const parenthesized: () => typeof parenthesized;\nexport declare const asserted: () => typeof asserted;\nexport declare class Methods {\n    static recur(): (typeof Methods)[\"recur\"];\n    static \"a-b\"(): (typeof Methods)[\"a-b\"];\n    static [key](): (typeof Methods)[typeof key];\n    recur(): Methods[\"recur\"];\n}\nexport declare function overloaded(value: string): typeof overloaded;\nexport declare function overloaded(value: number): typeof overloaded;\nexport declare const nestedOwner: {\n    make<T>(outer: T): {\n        nested<U>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        constrained<U extends T = T>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        copied<U>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        rest<U>(values_0: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n    };\n};\nexport declare const nestedNumber: {\n    nested<U>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n    constrained<U extends number = number>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n    copied<U>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: typeof nestedOwner;\n    };\n    rest<U>(values_0: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n};\nexport declare const mappedCycle: {\n    Node: {\n        value: number;\n        next: (typeof mappedCycle)[\"Node\"];\n    };\n};\nexport declare const mappedCycleCopy: {\n    Node: {\n        value: number;\n        next: (typeof mappedCycleCopy)[\"Node\"];\n    };\n};\nexport declare const nestedCycle: {\n    wrapped: {\n        Node: {\n            value: string;\n            next: (typeof nestedCycle)[\"wrapped\"][\"Node\"];\n        };\n    };\n};\nexport declare const cycleKey: unique symbol;\nexport declare const keyedCycles: {\n    \"a-b\": {\n        value: string;\n        next: (typeof keyedCycles)[\"a-b\"];\n    };\n    0: {\n        value: boolean;\n        next: (typeof keyedCycles)[0];\n    };\n    [cycleKey]: {\n        value: number;\n        next: (typeof keyedCycles)[typeof cycleKey];\n    };\n};\nexport declare const sharedCycles: {\n    first: {\n        Node: {\n            value: number;\n            next: (typeof sharedCycles)[\"first\"][\"Node\"];\n        };\n    };\n    second: {\n        Node: {\n            value: number;\n            next: (typeof sharedCycles)[\"second\"][\"Node\"];\n        };\n    };\n};\nexport declare const mutualCycle: {\n    First: {\n        value: number;\n        next: {\n            value: string;\n            next: (typeof mutualCycle)[\"First\"];\n        };\n    };\n    Second: {\n        value: string;\n        next: {\n            value: number;\n            next: (typeof mutualCycle)[\"Second\"];\n        };\n    };\n};\nexport declare const shadowedCycle: {\n    Node: {\n        value: number;\n        next: <T>(shadowedCycle: T) => typeof import(\".\").shadowedCycle[\"Node\"];\n    };\n};\nexport declare const optionalCycle: {\n    Node?: _recursive_1;\n};\nexport declare const nullableCycle: {\n    Node: _recursive_2 | null;\n};\nexport declare const mixedCycles: {\n    required: {\n        Node?: _recursive_3;\n    };\n    optional?: {\n        Node?: _recursive_3;\n    } | null;\n};\nexport declare const sharedOptionalCycles: {\n    first: {\n        Node?: _recursive_4;\n    };\n    second: {\n        Node?: _recursive_4;\n    };\n};\nexport declare const nullableKeys: {\n    \"a-b\": _recursive_5 | null;\n    0: _recursive_6 | null;\n    [cycleKey]: _recursive_7 | null;\n};\nexport declare const nullableRoot: _recursive_8 | null;\nexport declare const optionalRoot: _recursive_9 | undefined;\nexport declare const nullableLinks: {\n    Node: {\n        value: number;\n        next: (typeof nullableLinks)[\"Node\"];\n    } | null;\n};\nexport declare const optionalNullableLinks: {\n    Node?: _recursive_10 | null;\n};\nexport declare const nullableOptionalLinks: {\n    Node: _recursive_11 | null;\n};\nexport declare const nullishLinks: {\n    Node?: _recursive_12 | null;\n};\nexport declare const mixedUnionCycle: {\n    Node?: false | _recursive_13 | null;\n};\nexport declare const _recursive = 1;\nexport declare const factory: () => () => _recursive_14;\nexport declare function captured<T>(value: T): _recursive_15<T>;\nexport declare function nestedCaptured<T>(outer: T): <U>(inner: U) => _recursive_16<T, U>;\nexport declare function constrained<T extends {\n    value: number;\n}, K extends keyof T>(key: K): _recursive_17<T, K>;\nexport declare function optionalCaptured<T>(value: T): {\n    node?: _recursive_18<T> | false | null;\n};\nexport declare function annotatedCaptured<T>(value: T): _recursive_19<T>;\nexport declare function recursiveTuple<T>(value: T): _recursive_20<T>;\nexport declare function inferredCaptured<T>(): (T extends () => infer U ? _recursive_21<U> : never);\nexport declare function mappedCaptured<T>(): _recursive_22<T>;\nexport declare function freshGeneric<T>(unused: T): _recursive_23;\nexport declare function mutualCaptured<T, U>(left: T, right: U): {\n    left: _recursive_25<T, U>;\n    right: _recursive_24<T, U>;\n};\nexport declare class CapturedClass<T> {\n    value: T;\n    constructor(value: T);\n    make<U extends T>(inner: U): _recursive_26<T, U>;\n}\nexport declare function covariantClass(): {\n    new <T>(): _recursive_27<T>;\n};\nexport declare function contravariantClass(): {\n    new <T>(): _recursive_28<T>;\n};\nexport declare namespace Nested {\n    type _recursive_29<T> = {\n        value: T;\n        next: () => _recursive_29<T>;\n    };\n    export function captured<T>(value: T): _recursive_29<T>;\n    export {};\n}\nexport {};\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true,
    "exactOptionalPropertyTypes": true,
    "outDir": "./",
    "strict": true
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 24544
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/producer/index.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/producer/index.ts

consumer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/project/producer/dist/index.d.ts
*refresh*    /home/src/workspaces/project/consumer/index.ts
Signatures::


Edit [2]:: no change

tsgo --build consumer
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mconsumer/index.ts[0m:[93m158[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => ...' is not assignable to type 'number'.

[7m158[0m const invalid: number = arrow()()();
[7m   [0m [91m      ~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m159[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => ...' is not assignable to type 'number'.

[7m159[0m const invalidExpression: number = expression()()();
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m160[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => { call: ...; }' is not assignable to type 'number'.

[7m160[0m const invalidObject: number = objectReturn().call;
[7m   [0m [91m      ~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m161[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => readonly [...]' is not assignable to type 'number'.

[7m161[0m const invalidTuple: number = tupleReturn()[0];
[7m   [0m [91m      ~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m162[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '(shadowed: number) => ...' is not assignable to type 'number'.

[7m162[0m const invalidShadowed: number = shadowed(1);
[7m   [0m [91m      ~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m163[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m163[0m const invalidObjectValue: string = object.next().value;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m164[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'readonly [() => ...]' is not assignable to type 'number'.

[7m164[0m const invalidTupleValue: number = tuple[0]();
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m165[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m165[0m const invalidSpecialized: number = specialized.next().value;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m166[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '{ next: ...; }' is not assignable to type 'number'.

[7m166[0m const invalidMapped: number = mapped.next;
[7m   [0m [91m      ~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m167[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m167[0m const invalidAnnotation: number = viaAnnotation.next().value;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m168[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m168[0m const invalidLink: number = nextLink.next.value;
[7m   [0m [91m      ~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m169[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m169[0m const invalidCallable: string = nextCallable(1).link.value;
[7m   [0m [91m      ~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m170[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m170[0m const invalidHiddenValue: number = hiddenAlias.next.next.value;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m171[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => (typeof Methods)["recur"]' is not assignable to type 'number'.

[7m171[0m const invalidMethod: number = Methods.recur()();
[7m   [0m [91m      ~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m172[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => (typeof Methods)[typeof key]' is not assignable to type 'number'.

[7m172[0m const invalidComputedMethod: number = Methods[key]()();
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m173[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'boolean'.

[7m173[0m const invalidNestedOuter: boolean = nestedString.outer;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m174[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m174[0m const invalidNestedInner: string = nestedString.inner;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m175[0m:[93m26[0m - [91merror[0m[90m TS2345: [0mArgument of type 'string' is not assignable to parameter of type 'number'.

[7m175[0m nestedNumber.constrained("wrong");
[7m   [0m [91m                         ~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m176[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m176[0m const invalidMappedCycleValue: string = mappedCycle.Node.next.next.value;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m177[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m177[0m const invalidMutualCycleValue: number = mutualCycle.First.next.value;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m178[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m178[0m const invalidShadowedMappedValue: string = shadowedCycle.Node.next(1).next("text").value;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m179[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'null' is not assignable to type '_recursive_1'.

[7m179[0m const invalidNullNext: OptionalNode["next"] = null;
[7m   [0m [91m      ~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m180[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'undefined' is not assignable to type '_recursive_1'.

[7m180[0m const invalidUndefinedNext: OptionalNode["next"] = undefined;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m181[0m:[93m42[0m - [91merror[0m[90m TS2531: [0mObject is possibly 'null'.

[7m181[0m const invalidNullableLinkValue: number = nullableLinks.Node!.next.value;
[7m   [0m [91m                                         ~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m182[0m:[93m41[0m - [91merror[0m[90m TS2533: [0mObject is possibly 'null' or 'undefined'.

[7m182[0m const invalidNullishLinkValue: number = nullishLinks.Node!.next.value;
[7m   [0m [91m                                        ~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m183[0m:[93m26[0m - [91merror[0m[90m TS2345: [0mArgument of type 'number' is not assignable to parameter of type 'string'.

[7m183[0m captured("text").consume(1);
[7m   [0m [91m                         ~[0m

[96mconsumer/index.ts[0m:[93m184[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m184[0m const invalidRecursiveTupleValue: number = recursiveTuple("text")[1][0];
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m185[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m185[0m const invalidCapturedOuter: string = nestedCapturedValue.outer;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m186[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m186[0m const invalidCapturedInner: number = nestedCapturedValue.inner;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m188[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'boolean' is not assignable to type '_recursive_13'.

[7m188[0m const invalidMixedNext: WithoutFalseOrNullish<typeof mixedUnionCycle.Node>["next"] = false;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m189[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m189[0m const invalidInferredCapturedValue: number = inferredCaptured<() => string>().next.value;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m190[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m190[0m const invalidMappedCapturedValue: string = mappedCaptured<{ value: number }>().value.next.value.value;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m191[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'boolean'.

[7m191[0m const invalidMutualCapturedValue: boolean = mutualCaptured(1, "text").right.self.next.left;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m192[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m192[0m const invalidCapturedClassValue: number = capturedClassResult.outer;
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m193[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '_recursive_27<unknown>' is not assignable to type '_recursive_27<string>'.
  Type 'unknown' is not assignable to type 'string'.

[7m193[0m const invalidCovariance: typeof covariantString = covariantUnknown.next();
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m194[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '_recursive_28<string>' is not assignable to type '_recursive_28<unknown>'.
  Type 'unknown' is not assignable to type 'string'.

[7m194[0m const invalidContravariance: typeof contravariantUnknown = contravariantString.next();
[7m   [0m [91m      ~~~~~~~~~~~~~~~~~~~~~[0m


Found 36 errors in the same file, starting at: consumer/index.ts[90m:158[0m

//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo] *rewrite with same content*
//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*

consumer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/project/producer/dist/index.d.ts
*refresh*    /home/src/workspaces/project/consumer/index.ts
Signatures::
