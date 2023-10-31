// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/56270

type PositiveInfinity = 1e999;
type NegativeInfinity = -1e999;

export type IsEqual<A, B> = (<G>() => G extends A ? 1 : 2) extends <
  G,
>() => G extends B ? 1 : 2
  ? true
  : false;

export type Add<A extends number, B extends number> = [
  IsEqual<A, PositiveInfinity>,
  IsEqual<A, NegativeInfinity>,
  IsEqual<B, PositiveInfinity>,
  IsEqual<B, NegativeInfinity>,
] extends infer R extends [boolean, boolean, boolean, boolean]
  ? [true, false] extends ([R[0], R[3]])
    ? PositiveInfinity
    : "failed"
  : never;

export type AddWithoutParentheses<A extends number, B extends number> = [
  IsEqual<A, PositiveInfinity>,
  IsEqual<A, NegativeInfinity>,
  IsEqual<B, PositiveInfinity>,
  IsEqual<B, NegativeInfinity>,
] extends infer R extends [boolean, boolean, boolean, boolean]
  ? [true, false] extends [R[0], R[3]]
    ? PositiveInfinity
    : "failed"
  : never;

type AddTest0 = Add<PositiveInfinity, PositiveInfinity>;
type AddTest1 = AddWithoutParentheses<PositiveInfinity, PositiveInfinity>;
