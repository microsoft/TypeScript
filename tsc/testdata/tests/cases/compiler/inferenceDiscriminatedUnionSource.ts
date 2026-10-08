// @strict: true
// @exactOptionalPropertyTypes: false, true
// @noEmit: true

type Ok<T> = { ok: true; value: T };
type Err<E> = { ok: false; value: E };
declare function ok<const T>(value: T): Ok<T>;
declare function okInline<const T>(value: T): { ok: true; value: T };

type ErrShape = { ok: false; value: string };
type OkShape = { ok: true; value: string[] };

export function aliasTarget(): ErrShape | OkShape { return ok([]); }
export function inlineTarget(): ErrShape | OkShape { return okInline([]); }
export function inlineTargetReversed(): OkShape | ErrShape { return okInline([]); }

declare function on<T>(handler: (e: { kind: "a"; value: T }) => void): T;
const r1 = on((e: { kind: "a"; value: string } | { kind: "b"; value: number }) => {});
const r2 = on((e: { kind: "b"; value: number } | { kind: "a"; value: string }) => {});

declare function pick<T>(x: { kind: "a"; value: T }): T;
declare const u1: { kind: "b"; value: number } | { kind: "a"; value: string };
const r3 = pick(u1);

declare const u2: { kind: string; value: number } | { kind: "a"; value: string };
const r4 = pick(u2);

declare const broadTag: { kind: number; value: number } | { kind: "a"; value: string };
const broadResult = pick(broadTag);

declare const u3: { value: number } | { kind: "a"; value: string };
const r5 = pick(u3);

declare function two<T>(x: { kind: "a"; sub: 1; value: T }): T;
declare const u4: { kind: "a"; sub: 2; value: string } | { kind: "b"; sub: 1; value: number };
const r6 = two(u4);
declare function twoReversed<T>(x: { sub: 1; kind: "a"; value: T }): T;
const r6Reversed = twoReversed(u4);

enum K { A, B }
declare function enumTag<T>(x: { kind: K.A; value: T }): T;
declare const u5: { kind: K.B; value: number } | { kind: K.A; value: string };
const r7 = enumTag(u5);
declare function boolTag<T>(x: { ok: boolean; value: T }): T;
declare const u6: Err<number> | Ok<string>;
const r8 = boolTag(u6);

declare function wrap<const T>(value: T): { result: Ok<T> };
export function nested(): { result: ErrShape | OkShape } { return wrap([]); }

export function f(): Ok<string[]> | Err<string> {
    return ok([]);
}

type Success<T> = { kind: "success"; value: T };
type Failure<E> = { kind: "failure"; value: E };
declare function success<const T>(value: T): Success<T>;

export function withStringTag(): Success<string[]> | Failure<string> {
    return success([]);
}

type Accepted<T> = { kind: 1; value: T };
type Rejected<E> = { kind: 0; value: E };
declare function accepted<const T>(value: T): Accepted<T>;

export function withNumberTag(): Accepted<string[]> | Rejected<string> {
    return accepted([]);
}

declare function unmatched<T>(): { kind: "other"; value: T };

export function withUnmatchedTag(): Success<string[]> | Failure<number[]> {
    return unmatched();
}

type OptionalOk<T> = { ok?: true; value: T };
type MaybeErr<E> = { ok?: false; value: E };

declare function optionalOk<const T>(value: T): OptionalOk<T>;

export function optionalTarget(): OptionalOk<string[]> | Err<string> {
    return optionalOk([]);
}

export function optionalSource(): Ok<string[]> | MaybeErr<string> {
    return ok([]);
}

export function bothOptional(): OptionalOk<string[]> | MaybeErr<string> {
    return optionalOk([]);
}

export function missingSourceTag(): OptionalOk<string[]> | { value: string } {
    return optionalOk([]);
}

type ExplicitOptionalOk<T> = { ok?: true | undefined; value: T };
type UnionOk<T> = { ok: true | undefined; value: T };
declare function explicitOptionalOk<const T>(value: T): ExplicitOptionalOk<T>;
declare function unionOk<const T>(value: T): UnionOk<T>;

export function explicitUndefined(): ExplicitOptionalOk<string[]> | Err<string> {
    return explicitOptionalOk([]);
}

export function requiredUnionTag(): UnionOk<string[]> | Err<string> {
    return unionOk([]);
}

type AlwaysUndefinedErr<E> = { ok: undefined; value: E };
type UndefinedOk<T> = { ok: undefined; value: T };
declare function undefinedOk<const T>(value: T): UndefinedOk<T>;

export function undefinedSource(): OptionalOk<string[]> | AlwaysUndefinedErr<string> {
    return optionalOk([]);
}

export function undefinedTarget(): UndefinedOk<string[]> | MaybeErr<string> {
    return undefinedOk([]);
}

export function explicitUndefinedOverlap(): ExplicitOptionalOk<string[]> | AlwaysUndefinedErr<string> {
    return explicitOptionalOk([]);
}
