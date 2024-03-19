// @strict: true
// @declaration: true

export type Brand<
  Base,
  Branding,
  ReservedName extends string = "__type__"
> = Base & { [K in ReservedName]: Branding } & { __witness__: Base };

export type BoundedInteger<
  LowerBound extends number,
  UpperBound extends number
> = Brand<number, "BoundedInteger">;

export const toBoundedInteger =
  <LowerBound extends number, UpperBound extends number>(bounds: {
    lowerBound: LowerBound;
    upperBound: UpperBound;
  }) =>
  (
    n: number
  ): BoundedInteger<LowerBound, UpperBound> =>
  // Implementation doesn't matter here
    ({} as any)
