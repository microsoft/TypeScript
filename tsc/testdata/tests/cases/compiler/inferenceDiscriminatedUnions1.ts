// @strict: true
// @exactOptionalPropertyTypes: false, true
// @noEmit: true

type Ok<T> = { ok: true; value: T };
type Err<E> = { ok: false; value: E };
type ErrShape = { ok: false; value: string };
type OkShape = { ok: true; value: string[] };
enum K { A, B }
type Success<T> = { kind: "success"; value: T };
type Failure<E> = { kind: "failure"; value: E };
type Accepted<T> = { kind: 1; value: T };
type Rejected<E> = { kind: 0; value: E };
type OptionalOk<T> = { ok?: true; value: T };
type MaybeErr<E> = { ok?: false; value: E };
type ExplicitOptionalOk<T> = { ok?: true | undefined; value: T };
type UnionOk<T> = { ok: true | undefined; value: T };
type AlwaysUndefinedErr<E> = { ok: undefined; value: E };
type UndefinedOk<T> = { ok: undefined; value: T };
type Tagged<A, B> = { type: "a"; value: A } | { type: "b"; value: B };

declare const u1: { kind: "b"; value: number } | { kind: "a"; value: string };
declare const u2: { kind: string; value: number } | { kind: "a"; value: string };
declare const broadTag: { kind: number; value: number } | { kind: "a"; value: string };
declare const u3: { value: number } | { kind: "a"; value: string };
declare const u4: { kind: "a"; sub: 2; value: string } | { kind: "b"; sub: 1; value: number };
declare const u5: { kind: K.B; value: number } | { kind: K.A; value: string };
declare const u6: Err<number> | Ok<string>;
declare const taggedSource: Tagged<string, number>;
declare const reversedTaggedSource: { type: "b"; value: number } | { type: "a"; value: string };
declare const broadSourceTag: { type: string; value: number };
declare const missingTag: { value: number };
declare const optionalTag: { type?: "a"; value: string };

declare function ok<const T>(value: T): Ok<T>;
export function aliasTarget(): ErrShape | OkShape { return ok([]); }

export function f(): Ok<string[]> | Err<string> {
    return ok([]);
}

export function optionalSource(): Ok<string[]> | MaybeErr<string> {
    return ok([]);
}

declare function okInline<const T>(value: T): { ok: true; value: T };
export function inlineTarget(): ErrShape | OkShape { return okInline([]); }

export function inlineTargetReversed(): OkShape | ErrShape { return okInline([]); }

declare function on<T>(handler: (e: { kind: "a"; value: T }) => void): T;
const r1 = on((e: { kind: "a"; value: string } | { kind: "b"; value: number }) => {});
const r2 = on((e: { kind: "b"; value: number } | { kind: "a"; value: string }) => {});

declare function pick<T>(x: { kind: "a"; value: T }): T;
const r3 = pick(u1);
const r4 = pick(u2);
const broadResult = pick(broadTag);
const r5 = pick(u3);

declare function two<T>(x: { kind: "a"; sub: 1; value: T }): T;
const r6 = two(u4);

declare function twoReversed<T>(x: { sub: 1; kind: "a"; value: T }): T;
const r6Reversed = twoReversed(u4);

declare function enumTag<T>(x: { kind: K.A; value: T }): T;
const r7 = enumTag(u5);

declare function boolTag<T>(x: { ok: boolean; value: T }): T;
const r8 = boolTag(u6);

declare function wrap<const T>(value: T): { result: Ok<T> };
export function nested(): { result: ErrShape | OkShape } { return wrap([]); }

declare function success<const T>(value: T): Success<T>;
export function withStringTag(): Success<string[]> | Failure<string> {
    return success([]);
}

declare function accepted<const T>(value: T): Accepted<T>;
export function withNumberTag(): Accepted<string[]> | Rejected<string> {
    return accepted([]);
}

declare function unmatched<T>(): { kind: "other"; value: T };
export function withUnmatchedTag(): Success<string[]> | Failure<number[]> {
    return unmatched();
}

declare function optionalOk<const T>(value: T): OptionalOk<T>;
export function optionalTarget(): OptionalOk<string[]> | Err<string> {
    return optionalOk([]);
}

export function bothOptional(): OptionalOk<string[]> | MaybeErr<string> {
    return optionalOk([]);
}

export function missingSourceTag(): OptionalOk<string[]> | { value: string } {
    return optionalOk([]);
}

export function undefinedSource(): OptionalOk<string[]> | AlwaysUndefinedErr<string> {
    return optionalOk([]);
}

declare function explicitOptionalOk<const T>(value: T): ExplicitOptionalOk<T>;
export function explicitUndefined(): ExplicitOptionalOk<string[]> | Err<string> {
    return explicitOptionalOk([]);
}

export function explicitUndefinedOverlap(): ExplicitOptionalOk<string[]> | AlwaysUndefinedErr<string> {
    return explicitOptionalOk([]);
}

declare function unionOk<const T>(value: T): UnionOk<T>;
export function requiredUnionTag(): UnionOk<string[]> | Err<string> {
    return unionOk([]);
}

declare function undefinedOk<const T>(value: T): UndefinedOk<T>;
export function undefinedTarget(): UndefinedOk<string[]> | MaybeErr<string> {
    return undefinedOk([]);
}

declare function inferTwoArguments<A, B>(first: Tagged<A, B>, second: Tagged<A, B>): [A, B];
const twoArguments = inferTwoArguments({ type: "a", value: 42 }, { type: "b", value: true });

declare function inferInlineUnion<A, B>(value: { type: "a"; value: A } | { type: "b"; value: B }): [A, B];
const oneArgument = inferInlineUnion({ type: "a", value: 42 });
const unionArgument = inferInlineUnion(taggedSource);
const explicitUnionArgument = inferInlineUnion<string, number>(taggedSource);
const reversedSourceUnion = inferInlineUnion(reversedTaggedSource);
const broadTargetUnion = inferInlineUnion(broadSourceTag);
const missingTargetUnion = inferInlineUnion(missingTag);

declare function inferUnionWithFallback<T extends { type: "a" | "b" }, A, B>(value: T | Tagged<A, B>): [T, A, B];
const nakedTypeParameter = inferUnionWithFallback({ type: "a", value: 42 });

declare function inferNoInferOverloads<A, B>(first: Tagged<A, NoInfer<B>>, second: Tagged<A, B>): [A, B];
declare function inferNoInferOverloads<A, B>(first: Tagged<NoInfer<A>, B>, second: Tagged<A, B>): [A, B];
const noInferArguments = inferNoInferOverloads({ type: "a", value: 42 }, { type: "b", value: true });
const noInferReversedArguments = inferNoInferOverloads({ type: "b", value: true }, { type: "a", value: 42 });

declare function inferReversedUnion<A, B>(value: { type: "b"; value: B } | { type: "a"; value: A }): [A, B];
const reversedTargetUnion = inferReversedUnion(taggedSource);

declare function inferTwoDiscriminants<A, B>(value: { type: "a"; sub: 1; value: A } | { type: "b"; sub: 2; value: B }): [A, B];
const unmatchedTargetUnion = inferTwoDiscriminants({ type: "a", sub: 2, value: 42 });
const unmatchedTargetUnionReversedSource = inferTwoDiscriminants({ sub: 2, type: "a", value: 42 });

declare function inferTwoDiscriminantsReversed<A, B>(value: { sub: 1; type: "a"; value: A } | { sub: 2; type: "b"; value: B }): [A, B];
const unmatchedTargetUnionReversed = inferTwoDiscriminantsReversed({ type: "a", sub: 2, value: 42 });

declare function inferOptionalUnion<A, B>(value: { type?: "a"; value: A } | { type?: "b"; value: B }): [A, B];
const optionalTargetUnion = inferOptionalUnion(optionalTag);
