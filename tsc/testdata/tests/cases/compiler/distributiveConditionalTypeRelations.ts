// @strict: true
// @noEmit: true

// The original #27932 cases are in conditionalTypeAssignabilityWhenDeferred.ts.

type Either<T, U> = T extends U ? T | { matched: true } : T | { matched: false };
type Both<T, U> = T extends U ? T & U : T;
type Constant<T> = T extends string ? { a: number } : { b: number };
type Pair<T> = T extends unknown ? { x: T; y: T } : never;
type Tuple<T> = T extends unknown ? [T, T] : never;
type Callback<T> = T extends unknown ? (value: T) => T : never;
type Repeated<T extends string> = T extends unknown ? `${T}-${T}` : never;
type Remapped<T extends string> = T extends unknown ? `key-${T}` : never;
type Upper<T extends string> = T extends unknown ? Uppercase<T> : never;

function identity<T, U>(value: T, intersection: T & U) {
    const either: Either<T, U> = value;
    const both: Both<T, U> = value;
    const intersected: Either<T, U> = intersection;
    const extracted: Extract<T, unknown> = value;
    const excluded: Exclude<T, never> = value;
}

function wrappers<T extends string>(value: `key-${T}`, upper: Uppercase<T>, repeated: `${T}-${T}`) {
    const remapped: Remapped<T> = value;
    const capitalized: Upper<T> = upper;
    const correlated: Repeated<T> = repeated; // Error: cross products do not distribute.
}

type WithOuter<T extends string, U extends string> = T extends unknown ? `${T}-${U}` : never;

function retainOuterArgument<T extends string>(value: `${T}-${T}`) {
    const result: WithOuter<T, T> = value; // Error: the uniform-instantiation proof conservatively rejects repeated occurrences.
}

type OuterSource<T extends string, U extends string> = T extends unknown ? `${T}-${U}` : never;
type OuterRepeated<T extends string> = T extends unknown ? `outer-${T}-${T}` : never;
type UpperRepeated<T extends string> = T extends unknown ? `${Uppercase<T>}-${Uppercase<T>}` : never;
type InferredRepeated<T extends string> = [T] extends [infer U extends string] ? `${U}-${U}` : never;

function retainConditionalArgument<T extends string>(value: `outer-${OuterSource<T, T>}`) {
    const correlated: OuterRepeated<T> = value; // Error: the second argument is not distributed.
}

function cachedOccurrences<T extends string>(value: `${Uppercase<T>}-${Uppercase<T>}`) {
    const correlated: UpperRepeated<T> = value; // Error: a cached inner type still occurs twice.
}

function deferredOccurrences<T extends string>(value: `outer-${InferredRepeated<T>}`) {
    const correlated: OuterRepeated<T> = value; // Error: deferred inference hides a non-distributive use.
}

type Linked<T> = T extends unknown ? T & { value: T } : never;

function retainIntersectionComponent<T>(value: T & { value: T }) {
    const correlated: Linked<T> = value; // Error: the property can come from a different constituent.
}

type ObjectValues<T extends { value: unknown }> = T extends unknown ? T["value"] : never;
type IndexedValues<T, K extends keyof T> = K extends unknown ? T[K] : never;

function indexedAccess<T extends { value: unknown }, K extends keyof T>(value: T["value"], indexed: T[K]) {
    const fromObject: ObjectValues<T> = value;
    const fromIndex: IndexedValues<T, K> = indexed;
}

function correlated<T>(pair: { x: T; y: T }, tuple: [T, T], callback: (value: T) => T) {
    const p: Pair<T> = pair; // Error
    const t: Tuple<T> = tuple; // Error
    const c: Callback<T> = callback; // Error
}

function possiblyNever<T>(value: { a: number; b: number }) {
    const unconstrained: Constant<T> = value; // Error
    const constrained: Constant<T & string> = value; // Error
    const conditional: Constant<[T] extends [never] ? object : never> = value; // Error
}

function requiredWitness<T>(value: { a: number; b: number; value: T }) {
    const result: Constant<T> = value; // Error: a getter returning never can throw.
}

requiredWitness<never>({ a: 1, b: 2, get value(): never { throw new Error(); } });

function optionalWitness<T>(value: { a: number; b: number; value?: T }) {
    const result: Constant<T> = value; // Error: the property can be absent when T is never.
}

function arrayWitness<T>(value: { a: number; b: number; values: T[] }) {
    const result: Constant<T> = value; // Error: an array of never can be empty.
}

function functionWitness<T>(value: { a: number; b: number; get: () => T }) {
    const result: Constant<T> = value; // Error: a function returning never can throw.
}

function definitelyNotNever<T>(value: { a: number; b: number }) {
    const object: Constant<{ value: T }> = value;
    const array: Constant<T[]> = value;
    const tuple: Constant<[T]> = value;
    const union: Constant<T | number> = value;
    const conditional: Constant<[T] extends [string] ? { value: T } : { other: T }> = value;
}

type Homomorphic<T> = { [K in keyof T]: T[K] };
type Spread<T extends unknown[]> = [...T];

function emptyInstantiations<T, U extends unknown[]>(value: { a: number; b: number }) {
    const mapped: Constant<Homomorphic<T>> = value; // Error: Homomorphic<never> is never.
    const variadic: Constant<Spread<U>> = value; // Error: Spread<never> is never.
}

type Inferred<T> = T extends (value: infer P) => unknown ? T | P : never;
type InferredNonDistributive<T> = [T] extends [(value: infer P) => unknown] ? T | P : never;
type InferredValue<T> = T extends { value: infer P } ? P : never;
type InferredCallback<T> = T extends { value: infer P } ? (value: P) => P : never;
type ConstrainedInfer<T> = T extends { value: infer P extends string } ? T : never;

function inference<T extends (value: any) => unknown>(value: T) {
    const distributive: Inferred<T> = value; // Error: additional overloads can change the inferred parameter.
    const nonDistributive: InferredNonDistributive<T> = value; // Error
}

function independentInference<T>(value: T) {
    const result: T extends infer P ? T | P : never = value;
}

function propertyInference<T extends { value: unknown }>(value: T) {
    const result: T extends { value: infer P } ? T | P : never = value;
}

function tupleInference<T>(value: T) {
    const result: [T] extends [infer P] ? T | P : never = value;
}

function independentParameters<T extends (value: any) => unknown>(value: T) {
    const result: T extends (value: infer P) => infer R ? T | P | R : never = value; // Error
}

type InferredReturn<T> = T extends () => infer R ? T | R : never;

function returnInference<T extends () => unknown>(value: T) {
    const result: InferredReturn<T> = value; // Error: inference can use an overload with incompatible arity.
}

function universalSignature<T extends (value: unknown) => never>(value: T) {
    const parameter: Inferred<T> = value;
    const both: T extends (value: infer P) => infer R ? T | P | R : never = value;
}

function ignoredParameter<T extends () => never>(value: T) {
    const result: Inferred<T> = value;
    const returned: InferredReturn<T> = value;
}

type InferredMethod<T> = T extends { method: (value: infer P) => unknown } ? T | P : never;
type InferredMethodReturn<T> = T extends { method: (value: any) => infer R } ? T | R : never;

function bivariantInference<T extends { method(value: unknown): never }>(value: T) {
    const result: InferredMethod<T> = value; // Error: the constraint permits narrower method parameters.
    const returned: InferredMethodReturn<T> = value; // Error: a never parameter fails the strict function pattern.
}

function dependentInference<T extends { value: string }>(value: string, callback: (value: string) => string) {
    const inferred: InferredValue<T> = value; // Error: T can contain a narrower value.
    const inferredCallback: InferredCallback<T> = callback; // Error
}

function constrainedInference<T extends { value: any }>(value: T) {
    const result: ConstrainedInfer<T> = value; // Error: any in the constraint does not imply string.
}

type SpecificParameter<T> = T extends (value: string) => infer R ? T | R : never;
type SpecificMethod<T> = T extends { method(value: string): infer R } ? T | R : never;
type OptionalProperty<T> = T extends { optional?: string; value: infer R } ? T | R : never;
type MixedInference<T> = T extends { input: (value: infer R) => void; output: infer R } ? T | R : never;
type SingleParameter<T> = T extends (value: infer R) => unknown ? T | R : never;
type OptionalParameter<T> = T extends (value?: infer R) => unknown ? T | R : never;
type IntersectionPattern<T> = T extends { value: infer R } & { method(value: string): unknown } ? T | R : never;
type PrimitiveBoundary<T> = T extends object | (infer R extends number) ? T | R : never;

function fixedParameter<T extends (value: any) => unknown>(value: T) {
    const result: SpecificParameter<T> = value; // Error: a number parameter also satisfies the constraint.
    const withoutInference: T extends (value: string) => unknown ? T : never = value; // Error
}

function bivariantParameter<T extends { method(value: unknown): unknown }>(value: T) {
    const result: SpecificMethod<T> = value; // Error
}

function optionalProperty<T extends { value: unknown }>(value: T) {
    const result: OptionalProperty<T> = value; // Error: subtypes can add an incompatible optional property.
}

function mixedInference<T extends { input: (value: any) => void; output: any }>(value: T) {
    const result: MixedInference<T> = value; // Error: input and output can require incompatible inferences.
}

interface InvariantInferencePattern<T> {
    input: (value: T) => void;
    output: T;
}

type InvariantInference<T> = T extends InvariantInferencePattern<infer R> ? T | R : never;

function invariantInference<T extends InvariantInferencePattern<any>>(value: T) {
    const result: InvariantInference<T> = value; // Error: invariant type-argument inference must not hide mixed positions.
}

enum NumericInferencePattern {
    value
}

type NumericInference<T> = T extends (value: infer P) => NumericInferencePattern ? T | P : never;

function numericInference<T extends (value: unknown) => number>(value: T) {
    const result: NumericInference<T> = value; // Error: number-to-enum compatibility does not cover every numeric literal.
}

function unboundedArity<T extends (...args: any[]) => unknown>(value: T) {
    const result: SingleParameter<T> = value; // Error: subtypes can require multiple arguments.
}

function optionalParameter<T extends (value?: any) => unknown>(value: T) {
    const result: OptionalParameter<T> = value; // Error: subtypes can require an argument.
}

function intersectionPattern<T extends { value: any; method(value: any): unknown }>(value: T) {
    const result: IntersectionPattern<T> = value; // Error
}

function primitiveBoundary<T extends { toString(): string }>(value: T) {
    const result: PrimitiveBoundary<T> = value; // Error: structural object constraints admit primitives.
}

class Nominal<T> {
    private brand!: void;
    value!: T;
}

function nominalInference<T extends { value: unknown }>(value: T) {
    const result: T extends Nominal<infer P> ? T | P : never = value; // Error
}

type FilteredKeys<T, U> = T extends U ? never : T;
type DecoratedKeys<T extends string, U> = T extends U ? never : `key-${T}`;

function filtering<T extends string, U>(value: FilteredKeys<T, U>) {
    const excluded: Exclude<T, U> = value;
    const remapped: DecoratedKeys<FilteredKeys<T, U>, never> = `key-${value}`;
}

function filteredRemapping<T extends string, U>(value: `key-${Exclude<T, U>}`) {
    const result: DecoratedKeys<T, U> = value;
}

type FilteredMap<T extends string, U> = { [K in T as K extends U ? never : K]: unknown };
type DecoratedMap<T extends string, U> = { [K in T as K extends U ? never : `key-${K}`]: unknown };

function mappedKeys<T extends string, U>(key: Exclude<T, U>, decorated: `key-${Exclude<T, U>}`) {
    const filtered: keyof FilteredMap<T, U> = key;
    const remapped: keyof DecoratedMap<T, U> = decorated;
}

type Recursive<T> = T extends object ? T | { next: Recursive<T> } : T;

function recursion<T>(value: T) {
    const result: Recursive<T> = value;
}

function subtypeIsNotConstituent<T>(value: T & string) {
    const result: Extract<T, string> = value; // Error: Extract<unknown, string> is never.
}

// Concrete instantiations witnessing the rejected assignments.
const mixedPair: Pair<"a" | "b"> = { x: "a", y: "b" }; // Error
const mixedTuple: Tuple<"a" | "b"> = ["a", "b"]; // Error
const mixedString: Repeated<"a" | "b"> = "a-b"; // Error
const emptyConstant: Constant<never> = { a: 1, b: 2 }; // Error
const narrowInference: InferredValue<{ value: "a" }> = "b"; // Error
const rejectedConstrainedInfer: ConstrainedInfer<{ value: number }> = { value: 1 }; // Error
const rejectedFixedParameter: SpecificParameter<(value: number) => boolean> = (value: number) => true; // Error
const rejectedMethod: SpecificMethod<{ method(value: number): boolean }> = { method: (value: number) => true }; // Error
const rejectedOptionalProperty: OptionalProperty<{ optional: number; value: boolean }> = { optional: 1, value: true }; // Error
const rejectedMixedInference: MixedInference<{ input(value: number): void; output: string }> = { input: (value: number) => {}, output: "" }; // Error
const rejectedInvariantInference: InvariantInference<{ input: (value: number) => void; output: string }> = { input: (value: number) => {}, output: "" }; // Error
const rejectedNumericInference: NumericInference<(value: unknown) => 123> = (value: unknown) => 123; // Error
const rejectedArity: SingleParameter<(left: number, right: number) => void> = (left: number, right: number) => {}; // Error
const rejectedOptionalParameter: OptionalParameter<(value: string) => void> = (value: string) => {}; // Error
const rejectedIntersection: IntersectionPattern<{ value: boolean; method(value: number): unknown }> = { value: true, method: (value: number) => {} }; // Error
const rejectedPrimitive: PrimitiveBoundary<string> = ""; // Error

declare const overloadedParameter: {
    (value: string): void;
    (left: number, right: number): void;
};
const parameterConstraint: (value: any) => unknown = overloadedParameter;
const rejectedOverloadedParameter: Inferred<typeof overloadedParameter> = overloadedParameter; // Error
const rejectedOverloadedNonDistributive: InferredNonDistributive<typeof overloadedParameter> = overloadedParameter; // Error

declare const overloadedReturn: {
    (): string;
    (value: number): number;
};
const returnConstraint: () => unknown = overloadedReturn;
const rejectedOverloadedReturn: InferredReturn<typeof overloadedReturn> = overloadedReturn; // Error

declare const overloadedMethod: {
    method(value: string): never;
    method(left: number, right: number): void;
};
const methodConstraint: { method(value: unknown): never } = overloadedMethod;
const rejectedOverloadedMethod: InferredMethod<typeof overloadedMethod> = overloadedMethod; // Error

declare const neverParameterMethod: { method(value: never): never };
const neverMethodConstraint: { method(value: unknown): never } = neverParameterMethod;
const rejectedMethodReturn: InferredMethodReturn<typeof neverParameterMethod> = neverParameterMethod; // Error
