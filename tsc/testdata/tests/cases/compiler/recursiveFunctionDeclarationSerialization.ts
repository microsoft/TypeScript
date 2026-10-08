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
