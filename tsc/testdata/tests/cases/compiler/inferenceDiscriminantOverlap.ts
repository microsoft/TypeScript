// @strict: true
// @exactOptionalPropertyTypes: false, true
// @noEmit: true

declare const validOptionalSource: { tag: "a"; value: 1 } | { tag?: "a"; value: 2 };
declare const mixedOptionalSource: { tag: "a"; value: 1 } | { tag?: "b"; value: 2 };
declare const matchingOptionalSource: { tag: "a"; value: 1 } | { tag?: "a"; value: 2 } | { tag: "b"; value: 3 };
declare const requiredMismatchSource: { tag: "a"; value: 1 } | { tag: "b"; value: 2 };
declare const partiallyMatchingSource: { tag: "a" | "b"; value: 1 } | { tag: "b"; value: 2 };
declare const undefinedRequiredSource: { tag: "a"; value: 1 } | { tag: undefined; value: 2 };
declare const explicitUndefinedSource: { tag: "a"; value: 1 } | { tag: "b" | undefined; value: 2 };
declare const optionalNeverSource: { tag: "a"; value: 1 } | { tag?: never; value: 2 };

declare const indexedSource:
    | { tag: "a"; value: "a" }
    | { tag?: "a"; value: "a" }
    | { [key: string]: "b"; value: "b" };
declare const requiredPropertySource:
    | { tag: "a"; value: "a" }
    | { [key: string]: "b"; tag: "b"; value: "b" };
declare const optionalPropertySource:
    | { tag: "a"; value: "a" }
    | { [key: string]: "a" | "b" | undefined; tag?: "a"; value: "b" };

declare function inferOptionalSource<T>(value: { tag?: "a"; value: T }): T;
const validOptional = inferOptionalSource(validOptionalSource);
const mixedOptional = inferOptionalSource(mixedOptionalSource);
const matchingOptional = inferOptionalSource(matchingOptionalSource);
const requiredMismatch = inferOptionalSource(requiredMismatchSource);
const requiredUndefined = inferOptionalSource(undefinedRequiredSource);
const explicitUndefined = inferOptionalSource(explicitUndefinedSource);
const optionalNever = inferOptionalSource(optionalNeverSource);
const indexedOptional = inferOptionalSource(indexedSource); // error
const declaredOptional = inferOptionalSource(optionalPropertySource); // error
const declaredRequired = inferOptionalSource(requiredPropertySource); // error

declare function inferRequiredSource<T>(value: { tag: "a"; value: T }): T;
const partiallyMatching = inferRequiredSource(partiallyMatchingSource);
const indexedRequired = inferRequiredSource(indexedSource); // error

declare function makeOptional<const T>(): { tag?: "a"; value: T };
export function optionalContext(): { tag: "a"; value: 1 } | { tag?: "b"; value: 2 } {
    return makeOptional();
}

declare function inferOptionalTargets<A, B>(value: { tag: "a"; value: A } | { tag?: "b"; value: B }): [A, B];
declare const optionalInput: { tag?: "a"; value: 42 };
declare const optionalNeverInput: { tag?: never; value: 42 };
const optionalTargetInference = inferOptionalTargets(optionalInput);
const optionalNeverTargetInference = inferOptionalTargets(optionalNeverInput);

// Return type inference runs with the contextual type as the source and the declared
// return type as the target, so assignability has to hold the other way around.
declare function makeTagged<const T>(value: T): { kind: "a"; value: T };
declare function makeOptionalTagged<const T>(value: T): { kind?: "a"; value: T };
declare function makeUnionTagged<const T>(value: T): { kind: "a" | undefined; value: T };

export function broadContext(): { kind: string; value: string[] } | { kind: "a"; value: number } {
    return makeTagged([]);
}
export function partialTagContext(): { kind: "a" | "b"; value: string[] } | { kind: "a"; value: number } {
    return makeTagged([]);
}
export function unionTagContext(): { kind?: "a"; value: string[] } | { kind: "a"; value: number } {
    return makeUnionTagged([]);
}
export function indexedContext():
    | { [key: string]: string | string[]; value: string[] }
    | { kind: "a"; value: number }
    | { kind: "b"; value: boolean } {
    return makeOptionalTagged([]);
}

declare function makeEither<const A, const B>(a: A, b: B): { kind: "a"; value: A } | { kind: "b"; value: B };
export function eitherContext(): { kind: "a"; value: string[] } | { kind: "b"; value: number[] } {
    return makeEither([], []);
}
